import { useContext } from "react";
// contexts
import { ItemContext } from "../contexts/itemContext";
import { SelectionContext } from "../contexts/selectionContext";
//constants
import { ALL, ITEM_TYPE_BANNER, ITEM_TYPE_FORTIFICATIONS, ITEM_TYPE_INSTRUMENT, LANCE_TYPES, UNIT } from "../constants/itemShopConstants";
import { do2ArraysHaveCommonElements } from "../util/utilityFunctions";

const useItemFilters = () => {
  const IC = useContext(ItemContext);
  const SC = useContext(SelectionContext);

  /**
   * Function filters out entire groups of items that the selected unit cannot equipped.
   * I.e., a hero cannot carry fortifications or banners.
   * @param {unitCard} unit
   * @param {[obj]} itemGroupList an array of objects, each containing an itemType (String)
   * and an array of itemCards containing items of that type.
   * @returns a filtered down itemGroupList array.
   */
  const filterItemGroups = (unit, itemGroupList) => {
    if (unit.prohibitedItemType === ALL) {
      itemGroupList = [];
    }

    itemGroupList = itemGroupList.filter((group) => group.typeName !== unit.prohibitedItemType);

    if (unit.unitType !== UNIT) {
      itemGroupList = itemGroupList.filter(
        (group) =>
          group.typeName !== ITEM_TYPE_FORTIFICATIONS || //
          group.typeName !== ITEM_TYPE_BANNER ||
          group.typeName !== ITEM_TYPE_INSTRUMENT
      );
    }

    if (unit.leader === false && unit.unitType === UNIT) {
      itemGroupList = itemGroupList.filter(
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
    if (unit.magic === 0 || unit.isMounted) {
      itemGroupList = itemGroupList.filter((group) => group.typeName !== ITEM_TYPE_IMP);
    }

    // there is a hard limit for fortifications
    if (!isTheListBelowFortificationsLimit()) {
      itemGroupList = itemGroupList.filter((group) => group.typeName !== ITEM_TYPE_FORTIFICATIONS);
    }

    return itemGroupList;
  };

  /**
   * Function checks if a uniqe item has already been equipped.
   * @param {itemCard Object} item
   * @returns true, if item has already been equipped.
   */
  const uniqueItemIsAlreadyEquipped = (item) => {
    if (!item.isGeneric) {
      return IC.allEquippedItems.includes(item.itemName);
    }
    return false;
  };

  /**
   * Function filters out individual items from itemGroups based on
   * the selected unit and previous choices.
   * @param {unitCard} unit
   * @param {[unitCartd]} itemList
   * @returns a filtered item list.
   */
  const filterIndividualItems = (unit, itemList) => {
    if (!unit.hasShield) {
      itemList = itemList.filter((item) => item.requiresShield === false);
    }
    if (!unit.isMounted) {
      itemList = itemList.filter((item) => item.mustBeMounted === false);
    }

    const unitWeapons = [unit.weapon1Name, unit.weapon2Name, unit.weapon3Name];

    if (!do2ArraysHaveCommonElements(LANCE_TYPES, unitWeapons)) {
      itemList = itemList.filter((item) => item.requiresWeaponType !== "lances");
    }

    if (!do2ArraysHaveCommonElements(SPEAR_TYPES, unitWeapons)) {
      itemList = itemList.filter((item) => item.requiresWeaponType !== "spears");
    }

    if (!CROSSBOW_TYPES.includes(unit.rangedWeapon)) {
      itemList = itemList.filter((item) => item.itemType !== ITEM_TYPE_CROSSBOWS);
    }

    if (!BOW_TYPES.includes(unit.rangedWeapon)) {
      itemList = itemList.filter((item) => item.itemType !== ITEM_TYPE_BOWS);
    }

    // filter for unit type - only same type or generic
    itemList = itemList.filter((item) => item.unitType.includes(unit.unitType) || item.unitType === ALL);

    // filter for unit name
    itemList = itemList.filter((item) => item.limitedToUnit === unit.unitName || item.limitedToUnit === ALL);

    itemList = itemList.filter((item) => {
      if (unit.size > item.maxSize && item.maxSize > -1) {
        return false;
      }
      return true;
    });

    itemList = itemList.filter((item) => {
      if (unit.armourRange > item.maxRangeArmor && item.maxRangeArmor > -1) {
        return false;
      }
      return true;
    });

    return itemList;
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
    filterItemGroups: filterItemGroups, //
    filterIndividualItems: filterIndividualItems,
    uniqueItemAlreadyEquipped: uniqueItemIsAlreadyEquipped,
  };
};
export default useItemFilters;
