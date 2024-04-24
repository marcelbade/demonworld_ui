import { useContext } from "react";
// contexts
import { ItemContext } from "../contexts/itemContext";
import { SelectionContext } from "../contexts/selectionContext";
// functions and components
import { do2ArraysHaveCommonElements } from "../util/utilityFunctions";
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
} from "../constants/itemShopConstants";
import { ITEM_LIMIT_MESSAGE } from "../constants/textsAndMessages";
import { UNIT } from "../constants/unitTypes";

const useItemFilters = () => {
  const IC = useContext(ItemContext);
  const SC = useContext(SelectionContext);

  /**
   * Function is a wrapper for the filter logic and calls the filtering functions.
   * First, the correct item list for the selected faction is returned, then item groups are removed.
   * @param {unitCard} selectedUnit
   * @param {[itemGroup]} listOfItemGroups
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

    // filter out fortifications if -> (A) it's not a unit (B) mounted (C) the limit for fortification has been reache.
    if (selectedUnit.unitType !== UNIT || selectedUnit.isMounted) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_FORTIFICATIONS);
    }
    // filter out banners if there is no standard bearer
    if (!selectedUnit.standardBearer) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_BANNER);
    }
    // filter out instruments if there is no musician
    if (!selectedUnit.musician) {
      itemTypeGroup = itemTypeGroup.filter((group) => group.typeName !== ITEM_TYPE_INSTRUMENT);
    }
    // filter out almost everything, if the unit has no leader
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
    //filter out imps if the unit is a non-casters or a mounted magic users
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
    const unitWeapons = [unit.weapon1Name, unit.weapon2Name, unit.weapon3Name];
    const SPEARS = "spears";
    const LANCES = "lances";

    const itemFilters = {
      // unique items can only be selected once.
      uniqueItems: (data) => {
        return {
          isInvalidItem:
            !data.item.isGeneric && //
            IC.allEquippedItems.includes(item.itemName),
          errorMessage: ITEM_LIMIT_MESSAGE.UNIQUE_ITEMS,
        };
      },

      // no shield items for heroes & leaders w/o shields.
      shieldItems: (data) => {
        return {
          isInvalidItem:
            !data.unit.hasShield && //
            data.item.requiresShield,
          errorMessage: ITEM_LIMIT_MESSAGE.SHIELD_ITEMS,
        };
      },

      // no cavalery items for heroes & leaders w/o mounts.
      cavItems: (data) => {
        return {
          isInvalidItem:
            !data.unit.isMounted && //
            data.item.mustBeMounted,
          errorMessage: ITEM_LIMIT_MESSAGE.MOUNTED_ITEMS,
        };
      },

      // no spellcaster items for heroes & leaders w/o magic.
      spellCasterItems: (data) => {
        return {
          isInvalidItem:
            data.unit.magic === 0 && //
            data.item.magicUsersOnly,
          errorMessage: ITEM_LIMIT_MESSAGE.MAGIC_ITEMS,
        };
      },

      // no lance items for heroes & leaders w/o a lance.
      lanceItem: (data) => {
        return {
          isInvalidItem:
            !do2ArraysHaveCommonElements(LANCE_TYPES, unitWeapons) && //
            data.item.requiresWeaponType === LANCES,
          errorMessage: ITEM_LIMIT_MESSAGE.LANCE_ITEMS,
        };
      },
      // no spear items for heroes & leaders w/o a spear.
      spearItems: (data) => {
        return {
          isInvalidItem:
            !do2ArraysHaveCommonElements(SPEAR_TYPES, unitWeapons) && //
            data.item.requiresWeaponType === SPEARS,
          errorMessage: ITEM_LIMIT_MESSAGE.SPEAR_ITEMS,
        };
      },

      // no crossbow items for heroes & leaders w/o a crossbow.
      crossBowItems: (data) => {
        return {
          isInvalidItem:
            !CROSSBOW_TYPES.includes(data.unit.rangedWeapon) && //
            data.item.itemType === ITEM_TYPE_CROSSBOWS,
          errorMessage: ITEM_LIMIT_MESSAGE.CROSSBOWS_ITEMS,
        };
      },

      // no bow items for heroes & leaders w/o a bow.
      bowItems: (data) => {
        return {
          isInvalidItem:
            !BOW_TYPES.includes(data.unit.rangedWeapon) && //
            data.item.itemType === ITEM_TYPE_BOWS,
          errorMessage: ITEM_LIMIT_MESSAGE.BOWS_ITEMS,
        };
      },

      // check if the item requires a specific type of unit
      unitTypeItems: (data) => {
        return {
          isInvalidItem:
            !data.item.unitType.includes(data.unit.unitType) && //
            !data.item.unitType === ALL,
          errorMessage: ITEM_LIMIT_MESSAGE.UNIT_TYPE_ITEMS(data.item.unitType),
        };
      },

      // check if the item is limited ot a specific unit
      unitItems: (data) => {
        return {
          isInvalidItem:
            data.item.limitedToUnit !== data.unit.unitName && //
            !data.item.limitedToUnit === ALL,
          errorMessage: ITEM_LIMIT_MESSAGE.UNIT_NAME_ITEMS(data.item.unitName),
        };
      },

      // filter for unit size
      sizeItem: (data) => {
        return {
          isInvalidItem:
            data.unit.size > data.item.maxSize && //
            data.item.maxSize > -1,
          errorMessage: ITEM_LIMIT_MESSAGE.UNIT_SIZE_ITEMS(data.item.maxSize),
        };
      },

      // filter for range armor
      rangeArmorItem: (data) => {
        return {
          isInvalidItem:
            data.unit.armourRange > data.item.maxRangeArmor && //
            data.item.maxRangeArmor > -1,
          errorMessage: ITEM_LIMIT_MESSAGE.RANGE_ARMOR_ITEMS(data.item.maxRangeArmor),
        };
      },
      // filter items not meant for single element units
      rankAndFileItem: (data) => {
        return {
          isInvalidItem:
            data.unit.numberOfElements < 2 && //
            data.item.everyElement,
          errorMessage: ITEM_LIMIT_MESSAGE.MULTIPLE_ELEMENTS_ITEMS,
        };
      },
      fortifications: (data) => {
        return {
          isInvalidItem: !isTheListBelowFortificationsLimit(data.item),
          errorMessage: ITEM_LIMIT_MESSAGE.FORTIFICATIONS_ITEMS,
        };
      },
    };

    let result = {
      isInvalidItem: false,
      errorMessage: "",
    };

    for (const value of Object.values(itemFilters)) {
      if (value({ unit: unit, item: item }).isInvalidItem) {
        result = {
          isInvalidItem: value({ unit: unit, item: item }).isInvalidItem,
          errorMessage: value({ unit: unit, item: item }).errorMessage,
        };
        break;
      }
    }

    return result;
  };

  /**
   * Function checks the maximum points allowance for fortifications.
   * No more than 10% can be spent on fortifications.
   * @returns true, if the points spent on Fortifications is lower than or equal to 10%.
   */
  const isTheListBelowFortificationsLimit = (item) => {
    const MAX_PERCENTAGE = 0.1;

    let pointSum = 0;

    IC.allEquippedItems
      .filter((i) => i.itemType === ITEM_TYPE_FORTIFICATIONS) //
      .forEach((i) => {
        pointSum += i.points;
      });

    return pointSum + item.points <= SC.maxPointsAllowance * MAX_PERCENTAGE;
  };

  return {
    filterItemTypesForUnit: filterItemTypesForUnit,
    filterIndividualItems: filterIndividualItems,
  };
};
export default useItemFilters;
