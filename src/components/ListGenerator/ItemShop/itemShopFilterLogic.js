// constants for component
import {
  UNIT_TO_ITEM_UNITTYPE_MAPPING,
  FACTIONLESS_ITEM,
  ITEM_TYPE_BANNER,
  ITEM_TYPE_MUSICIAN,
  ITEM_TYPE_BOWS,
  ITEM_TYPE_CROSSBOWS,
  NO_RANGE_WEAPON,
  BOW_TYPES,
  CROSSBOW_TYPES,
  GIANT,
} from "../../../constants/itemShopConstants";

// Only show items of the factio or generic ones.
export const forFactionAndGenericItems = (item, unit) => {
  return item.faction === unit.faction || item.faction === FACTIONLESS_ITEM;
};

// Only show items that can be equipped by the selected type of unit.
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

// Only show instruments if the unit has a musician special element.
export const forMusicians = (item, unit) => {
  if (!unit.musician) {
    return item.type !== ITEM_TYPE_MUSICIAN;
  }
  return true;
};

// Filter out all bows
export const forCrossBows = (item, unit) => {
  if (unit.rangedWeapon === NO_RANGE_WEAPON || !BOW_TYPES.includes(unit.rangedWeapon)) {
    return item.type !== ITEM_TYPE_BOWS;
  }
  return true;
};

// Only show instruments if the unit has a musician special element.
export const forBows = (item, unit) => {
  if (unit.rangedWeapon === NO_RANGE_WEAPON || !CROSSBOW_TYPES.includes(unit.rangedWeapon)) {
    return item.type !== ITEM_TYPE_CROSSBOWS;
  }
  return true;
};

// If the unit card is a unit (not a hero or mage) without leader, only show items that can be equipped by standard bearers, musicians and the whole unit.
export const whenUnitHasNoLeader = (item, unit) => {
  if (!unit.leader && unit.unitType !== GIANT) {
    return item.forUnit;
  }
  return true;
};

// Giants with a crew sporting bows or crossbows can be equipeed with the fitting artifacts. Everything else is not rated for giants at the moment.
export const whenUnitIsGiant = (item, unit) => {
  if (unit.unitType === GIANT) {
    return item.type === ITEM_TYPE_CROSSBOWS || item.type === ITEM_TYPE_BOWS;
  }
  return true;
};
