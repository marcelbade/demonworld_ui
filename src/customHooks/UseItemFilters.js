import { useContext } from "react";
// contexts
import { ItemContext } from "../contexts/itemContext";
import { SelectionContext } from "../contexts/selectionContext";
//constants
import {
  ALL,
  ITEM_TYPE_ARMOR,
  ITEM_TYPE_BANNER,
  ITEM_TYPE_BOWS,
  ITEM_TYPE_CROSSBOWS,
  ITEM_TYPE_FORTIFICATIONS,
  ITEM_TYPE_INSTRUMENT,
  ITEM_TYPE_IMP,
  ITEM_TYPE_POTION,
  ITEM_TYPE_WEAPON,
  ITEM_TYPE_ITEM,
  ITEM_TYPE_RINGSANDAMULETS,
  SPEAR_TYPES,
  LANCE_TYPES,
  BOW_TYPES,
  CROSSBOW_TYPES,
  UNIT,
} from "../constants/itemShopConstants";
import { do2ArraysHaveCommonElements } from "../util/utilityFunctions";

const useItemFilters = () => {
  const IC = useContext(ItemContext);
  const SC = useContext(SelectionContext);

  /**
   * Function is a wrapper for the filter logic and calls the filtering functions.
   * First, entire groups of items are filtered, then individual items arte filtered.
   * @returns an array of items grouped by type, with all item types
   * and items filtered out that the selected unit cannot equip.
   */
  const filterItemTypesForUnit = (selectedUnit, listOfItemGroups) => {
    const itemGroupsForUnit = getItemGroupsForSelectedUnit(selectedUnit, listOfItemGroups);
    const validItemTypeGroups = filterItemTypes(selectedUnit, itemGroupsForUnit);

    return validItemTypeGroups;
  };

  /**
   * Function takes the DTO from the BE and filters by faction.
   * @returns an array of dto filtered by faction.
   */
  const getItemGroupsForSelectedUnit = (selectedUnit, ListOfItemGroups) => {
    return ListOfItemGroups.filter((obj) => obj.factionName === selectedUnit.faction)[0].groupsOfFactionItemsByType;
  };

  /**
   * Function filters out entire items groups that the selected unit cannot equipped.
   * E.g., a hero cannot carry fortifications or banners.
   * @param {unitCard} selectedUnit
   * @param {[obj]} itemTypeGroup an array of objects, each containing an itemType (String)
   * and an array of itemCards containing items of that type.
   * @returns a filtered down itemGroupList array.
   */
  const filterItemTypes = (selectedUnit, itemTypeGroup) => {
    // if a hero cannot have any items, return an empty array
    if (selectedUnit.prohibitedItemType === ALL) {
      itemTypeGroup = [];
    }

    itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== selectedUnit.prohibitedItemType);

    if (
      selectedUnit.unitType !== UNIT || //
      selectedUnit.isMounted ||
      !isTheListBelowFortificationsLimit()
    ) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_FORTIFICATIONS);
    }

    if (!selectedUnit.standardBearer) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_BANNER);
    }

    if (!selectedUnit.musician) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_INSTRUMENT);
    }

    if (!selectedUnit.leader && selectedUnit.unitType === UNIT) {
      itemTypeGroup = itemTypeGroup.filter(
        (group) =>
          group.typeName !== ITEM_TYPE_ARMOR ||
          group.typeName !== ITEM_TYPE_CROSSBOWS ||
          group.typeName !== ITEM_TYPE_IMP ||
          group.typeName !== ITEM_TYPE_ITEM ||
          group.typeName !== ITEM_TYPE_POTION ||
          group.typeName !== ITEM_TYPE_RINGSANDAMULETS ||
          group.typeName !== ITEM_TYPE_WEAPON
      );
    }

    // non-casters and mounted magic users cannot equip an imp
    if (selectedUnit.magic === 0 || selectedUnit.isMounted) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_IMP);
    }

    return itemTypeGroup;
  };

  /**
   * Function tests if the selected unit can equip an item.
   * @param {unitCard} unit
   * @param {itemCard} item
   * @returns true, if the item is a valid option for the selected unit.
   */
  const filterIndividualItems = (unit, item) => {
    let isValidItem = true;

    const unitWeapons = [unit.weapon1Name, unit.weapon2Name, unit.weapon3Name];
    const SPEARS = "spears";
    const LANCES = "lances";

    const itemFilters = {
      // unique items can only be selected once.
      uniqueItems: (unit, item) =>
        !item.isGeneric && //
        IC.allEquippedItems.includes(item.itemName),

      // no shield items for heroes & leaders w/o shields.
      shieldItems: (unit, item) =>
        !unit.hasShield && //
        item.requiresShield,

      // no cavalery items for heroes & leaders w/o mounts.
      cavItems: (unit, item) =>
        !unit.isMounted && //
        item.mustBeMounted,

      // no spellcaster items for heroes & leaders w/o magic.
      spellCasterItems: (unit, item) =>
        unit.magic === 0 && //
        item.magicUsersOnly,

      // no lance items for heroes & leaders w/o a lance.
      lanceItem: (unit, item) =>
        !do2ArraysHaveCommonElements(LANCE_TYPES, unitWeapons) && //
        item.requiresWeaponType === LANCES,

      // no spear items for heroes & leaders w/o a spear.
      spearItems: (unit, item) =>
        !do2ArraysHaveCommonElements(SPEAR_TYPES, unitWeapons) && //
        item.requiresWeaponType === SPEARS,

      // no crossbow items for heroes & leaders w/o a crossbow.
      crossBowItems: (unit, item) =>
        !CROSSBOW_TYPES.includes(unit.rangedWeapon) && //
        item.itemType === ITEM_TYPE_CROSSBOWS,

      // no bow items for heroes & leaders w/o a bow.
      bowItems: (unit, item) =>
        !BOW_TYPES.includes(unit.rangedWeapon) && //
        item.itemType === ITEM_TYPE_BOWS,

      // check if the item requires a specific type of unit
      unitTypeItems: (unit, item) =>
        !item.unitType.includes(unit.unitType) && //
        !item.unitType === ALL,

      // check if the item is limited ot a specific unit
      unitItems: (unit, item) =>
        item.limitedToUnit !== unit.unitName && //
        !item.limitedToUnit === ALL,

      // filter for unit size
      sizeItem: (unit, item) =>
        unit.size > item.maxSize && //
        item.maxSize > -1,

      // filter for range armor
      rangeArmorItem: (unit, item) =>
        unit.armourRange > item.maxRangeArmor && //
        item.maxRangeArmor > -1,

      // filter items not meant for single element units
      rankAndFileItem: (unit, item) =>
        unit.numberOfElements < 2 && //
        item.everyElement,
    };

    for (const value of Object.values(itemFilters)) {
      if (value(unit, item)) {
        isValidItem = false;
      }
    }

    return isValidItem;
  };

  /**
   * Function checks the maximum points allowance for fortifications.
   * No more than 10% can be spent on fortifications.
   * @returns true, if the points spent on Fortifications is lower than or equal to 10%.
   */
  const isTheListBelowFortificationsLimit = () => {
    const MAX_PERCENTAGE = 0.1;

    const pointSum = IC.allEquippedItems
      .filter((i) => i.itemType === ITEM_TYPE_FORTIFICATIONS) //
      .reduce((sum, { points }) => sum + points, 0);

    return pointSum <= SC.maxPointsAllowance * MAX_PERCENTAGE;
  };

  return {
    filterItemTypesForUnit: filterItemTypesForUnit,
    filterIndividualItems: filterIndividualItems,
  };
};
export default useItemFilters;
