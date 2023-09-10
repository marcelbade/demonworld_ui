import { ITEM_TYPE_BANNER, ITEM_TYPE_MUSICIAN } from "../../../../../constants/itemShopConstants";

/**
 * Functions ckecks if item has already been picked by a different unit. If this is the case AND the item is not generic (i.e., it's unique) it returns true-
 * @param {[String]} allItems names of all items already picked.
 * @param {itemCard Obj} item
 * @returns boolean flag
 */
export const hasItemBeenPickedByOtherUnit = (allItems, item) => {
  return allItems.includes(item.itemName);
};

/**
 * Functions checks if an item has already been picked for this unit. If that's the case, it returns true.
 * @param {unitCard Obj} unit
 * @param {itemCard Obj} item
 * @returns boolean flag
 */
export const doesUnitalreadyHaveItem = (unit, item) => {
  return unit.equipment.filter((e) => e.name === item.itemName).length > 0;
};

/**
 * Functions checks if the maximum number of magic items has been reached.
 * @param {unitCard Obj} unit
 * @returns boolean flag
 */
export const ownsMaxNumberMagicItems = (unit, item) => {
  return unit.equipmentTypes.magicItem && !item.isAdditionalItem;
};

/**
 * Functions checks if the maximum number of banner items has been reached.
 * @param {unitCard Obj} unit
 * @returns boolean flag
 */
export const doesUnitAlreadyHaveBanner = (unit, item) => {
  if (item.itemType === ITEM_TYPE_BANNER) {
    return unit.equipmentTypes.banner;
  } else return false;
};

/**
 * Functions checks if the maximum number of banner items has been reached.
 * @param {unitCard Obj} unit
 * @returns boolean flag
 */
export const doesUnitAlreadyHaveInstrument = (unit, item) => {
  if (item.itemType === ITEM_TYPE_MUSICIAN) {
    return unit.equipmentTypes.banner;
  } else return false;
};
