// constants
import { NON_MAGIC_ITEMS } from "../../../constants/itemShopConstants";

/**
 * Functions ckecks if item has already been picked by a different unit.
 * @param {[String]} allItems names of all items already picked.
 * @param {itemCard Obj} item
 * @returns boolean flag
 */
export const hasItemBeenPickedByOtherUnit = (allItems, item) => {
  if (allItems.includes(item.itemName)) {
    return true;
  }
  return false;
};

/**
 * Functions checks if item has already been picked by this unit.
 * @param {unitCard Obj} unit
 * @param {itemCard Obj} item
 * @returns boolean flag
 */
export const hasItemBeenPicked = (unit, item) => {
  if (unit.equipment.filter((e) => e.name === item.itemName).length > 0) {
    //  updateEquipmentFlags(unit, item);
    return true;
  }
  return false;
};

/**
 * Functions checks if the item type has already been picked (type of non-magical item has already been picked).
 * @param {unitCard Obj} unit
 * @param {itemCard Obj} item
 * @returns boolean flag
 */
export const hasItemTypeBeenPicked = (unit, item) => {
  if (NON_MAGIC_ITEMS.includes(item.type)) {
    const isGenericType = unit.equipmentTypes[item.type];
    const typeAlreadyPicked = unit.equipment.filter((e) => e.type === item.type).length > 0;

    if (!isGenericType && typeAlreadyPicked) {
      unit.equipmentTypes[item.type] = true;
    }

    if (isGenericType && typeAlreadyPicked) {
      unit.equipmentTypes[item.type] = false;
    }

    return isGenericType;
  }

  return false;
};

/**
 * Functions checks if the maximum number of magic items has been reached.
 * @param {unitCard Obj} unit
 * @param {itemCard Obj} item
 * @returns boolean flag
 */
export const ownsMaxNumberMagicItems = (unit, item) => {
  let magicItemNumber = 0;
  let isMagicItem = false;

  if ("equipment" in unit && unit.equipment.length > 0) {
  }
  magicItemNumber = unit.equipment.filter((e) => !NON_MAGIC_ITEMS.includes(e.type)).length;
  isMagicItem = !NON_MAGIC_ITEMS.includes(item.type);

  if (isMagicItem && magicItemNumber === unit.equipmentTypes.maxMagic) {
    return true;
  }

  return false;
};
