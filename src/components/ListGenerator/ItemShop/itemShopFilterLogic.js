// constants for component
import {
  BOW_TYPES,
  CROSSBOW_TYPES,
  NON_MAGIC_ITEMS,
  UNIT_TO_ITEM_UNITTYPE_MAPPING,
  FACTIONLESS_ITEM,
  ITEM_TYPE_BANNER,
  ITEM_TYPE_BOWS,
  ITEM_TYPE_CROSSBOWS,
  CAVALRY,
  INFANTRY,
  GIANT,
  NO_RANGE_WEAPON,
} from "../../../constants/itemShopConstants";

// Only show items of the factio or generic ones.
export const forFactionAndGenericItems = (item, unit) => {
  return item.faction === unit.faction || item.faction === FACTIONLESS_ITEM;
};

// Only show items that can be equipped by the slected type of unit.
export const forUnitAndItemType = (item, unit) => {
  return UNIT_TO_ITEM_UNITTYPE_MAPPING[unit.unitType].includes(item.unitType);
};

// Only show banners if the unit has a standard bearer special element.
export const forBanner = (item, unit) => {
  if (!unit.standardBearer) {
    return item.type !== ITEM_TYPE_BANNER;
  }
  return true;
};

// If the unit card is a unit (not a hero or mage) without leader, only show items that can be equipped by standard bearers, musicians and the whole unit.
export const whenUnitHasNoLeader = (item, unit) => {
  if (unit.unitType === CAVALRY || unit.unitType === INFANTRY || unit.unitType === GIANT) {
    if (!unit.leader && (!item.banner || !item.musician || !NON_MAGIC_ITEMS.includes(item.type))) {
      return false;
    }
  }
  return true;
};

// Giant elements are different: they CAN be heroes but are otherwise units with no leader or other special elements. They cannot have magical weapons or armor (none exosts that could be taken by giants). if they have some crew with a missile weapon, that crew can use magical missile weaopons
export const whenUnitIsGiantElement = (item, unit) => {
  return true;
};

// Only show magical bolts and crossbows or magical bows and arrows respectively whhen the unit can actually use them.
export const forBowsOrCrossBows = (item, unit) => {
  if (unit.rangedWeapon === NO_RANGE_WEAPON || !BOW_TYPES.includes(unit.rangedWeapon) || !CROSSBOW_TYPES.includes(unit.rangedWeapon)) {
    return item.type !== ITEM_TYPE_CROSSBOWS || item.type !== ITEM_TYPE_BOWS;
  }
  return true;
};
