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
  const filterItemsForUnit = (selectedUnit, listOfItemGroups) => {
    const itemGroupsForUnit = getItemGroupsForSelectedUnit(selectedUnit, listOfItemGroups);

    const validItemTypeGroups = filterItemTypes(selectedUnit, itemGroupsForUnit);

    // validItemTypeGroups.forEach((group) => {
    //   group.items = filterIndividualItems(selectedUnit, group.items);
    // });

    return validItemTypeGroups;
  };

  /**
   * Function takes the DTO fromthe BE and filters by faction.
   * @returns an array of dto filtered by faction.
   */
  const getItemGroupsForSelectedUnit = (selectedUnit, ListOfItemGroups) => {
    return ListOfItemGroups.filter((obj) => obj.factionName === selectedUnit.faction)[0].groupsOfFactionItemsByType;
  };

  /**
   * Function filters out entire items groups that the selected unit cannot equipped.
   * I.e., a hero cannot carry fortifications or banners.
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
   * Function filters out individual items from itemGroups based on
   * the selected unit and previous choices.
   * @param {unitCard} unit
   * @param {[unitCartd]} itemList
   * @returns a filtered item list.
   */
  const filterIndividualItems = (unit, item) => {
    // unique items can only be selected once.

    let isValidItem = true;

    if (!item.isGeneric && IC.allEquippedItems.includes(item.itemName)) {
      isValidItem = false;
    }

    // no shield items for heroes & leaders w/o shields.
    if (!unit.hasShield && item.requiresShield) {
      isValidItem = false;
    }

    // no cavalery items for heroes & leaders w/o mounts.
    if (!unit.isMounted && item.mustBeMounted) {
      isValidItem = false;
    }

    // no spellcaster items for heroes & leaders w/o magic.
    if (unit.magic === 0 && item.magicUsersOnly) {
      isValidItem = false;
    }

    const unitWeapons = [unit.weapon1Name, unit.weapon2Name, unit.weapon3Name];
    const SPEARS = "spears";
    const LANCES = "lances";

    // no lance items for heroes & leaders w/o a lance.
    if (
      !do2ArraysHaveCommonElements(LANCE_TYPES, unitWeapons) && //
      item.requiresWeaponType === LANCES
    ) {
      isValidItem = false;
    }
    console.log(5);
    console.log(isValidItem);

    // no spear items for heroes & leaders w/o a spear.
    if (
      !do2ArraysHaveCommonElements(SPEAR_TYPES, unitWeapons) && //
      item.requiresWeaponType === SPEARS
    ) {
      isValidItem = false;
    }

    // no crossbow items for heroes & leaders w/o a crossbow.
    if (
      !CROSSBOW_TYPES.includes(unit.rangedWeapon) && //
      item.itemType === ITEM_TYPE_CROSSBOWS
    ) {
      isValidItem = false;
    }

    // no bow items for heroes & leaders w/o a bow.
    if (
      !BOW_TYPES.includes(unit.rangedWeapon) && //
      item.itemType === ITEM_TYPE_BOWS
    ) {
      isValidItem = false;
    }

    // check if the item requires a specific type of unit
    if (!item.unitType.includes(unit.unitType) && !item.unitType === ALL) {
      isValidItem = false;
    }

    // check if the item is limited ot a specific unit
    if (item.limitedToUnit !== unit.unitName && !item.limitedToUnit === ALL) {
      isValidItem = false;
    }

    // filter for unit size
    if (unit.size > item.maxSize && item.maxSize > -1) {
      isValidItem = false;
    }

    // filter for range armor
    if (unit.armourRange > item.maxRangeArmor && item.maxRangeArmor > -1) {
      isValidItem = false;
    }

    return isValidItem;
  };

  /**
   * Function checks the maximum points allowance for fortifications.
   * No more than 10% can be spent.
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
    filterItemsForUnit: filterItemsForUnit,
    filterIndividualItems: filterIndividualItems,
  };
};
export default useItemFilters;
