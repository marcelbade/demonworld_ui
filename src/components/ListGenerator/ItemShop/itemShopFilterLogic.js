// constants for component
import {
  USABLE_BY_ALL,
  ITEM_TYPE_BOWS,
  ITEM_TYPE_CROSSBOWS,
  NO_RANGE_WEAPON,
  BOW_TYPES,
  CROSSBOW_TYPES,
  GIANT,
  UNIT,
  SPEAR_TYPES,
  LANCE_TYPES,
} from "../../../constants/itemShopConstants";

// Only show items of the faction or generic ones.
export const filterForFactionAndGenericItems = (item, unit) => {
  return item.faction === unit.faction || item.faction === USABLE_BY_ALL;
};

// Only show items that can be equipped by the selected type of unit.
export const filterForUnitType = (item, unit) => {
  return item.unitType.includes(unit.unitType) || item.unitType === USABLE_BY_ALL;
};

//Only show items that are for this specific unit
export const filterForUnit = (item, unit) => {
  return item.limitedToUnit === unit.unitName || item.limitedToUnit === USABLE_BY_ALL;
};

// Only show banners if the unit has a standard bearer special element.
export const filterForStandardBearer = (item, unit) => {
  if (!unit.standardBearer && item.requiresBanner) {
    return false;
  }
  return true;
};

// Only show instruments if the unit has a musician special element.
export const filterForMusicians = (item, unit) => {
  if (!unit.musician && item.requiresMusician) {
    return false;
  }
  return true;
};

// Filter Items for magicUser
export const filterForMagicUsers = (item, unit) => {
  if (unit.magic === 0 && item.magicUsersOnly === true) {
    return false;
  }
  return true;
};

// only units with shields can use shields
export const filterForShields = (item, unit) => {
  if (unit.hasShield === false && item.hasShield === true) {
    return false;
  }
  return true;
};

// Filter items for those only meant for cavalery
export const filterForCavalryItems = (item, unit) => {
  if (unit.isMounted === false && item.mustBeMounted === true) {
    return false;
  }
  return true;
};

// Filter items for those only meant for units that are not mounted
export const filterForItemsUsableNotByCavalry = (item, unit) => {
  if (unit.isMounted === true && item.usableByCav === false) {
    return false;
  }
  return true;
};

// Magic spears can only be used by units with spears
export const filterForSpears = (item, unit) => {
  if (item.requiresWeaponType === "spears" && !(SPEAR_TYPES.includes(unit.weapon1Name) || SPEAR_TYPES.includes(unit.weapon2Name))) {
    return false;
  }
  return true;
};

// Magic lances can only be used by units with lances
export const filterForLances = (item, unit) => {
  if (item.requiresWeaponType === "lances" && !(LANCE_TYPES.includes(unit.weapon1Name) || LANCE_TYPES.includes(unit.weapon2Name))) {
    return false;
  }
  return true;
};

// Crossbows can only be used by units with bows
export const filterForCrossBows = (item, unit) => {
  if ((unit.rangedWeapon === NO_RANGE_WEAPON || !CROSSBOW_TYPES.includes(unit.rangedWeapon)) && item.itemType === ITEM_TYPE_CROSSBOWS) {
    return false;
  }
  return true;
};

// Bows can only be used by units with bows
export const filterForBows = (item, unit) => {
  if ((unit.rangedWeapon === NO_RANGE_WEAPON || !BOW_TYPES.includes(unit.rangedWeapon)) && item.itemType === ITEM_TYPE_BOWS) {
    return false;
  }
  return true;
};

// If the unit card is a unit (not a hero or mage) without leader, only show items that can be equipped by standard bearers, musicians and the whole unit.
export const whenUnitHasNoLeader = (item, unit) => {
  if (unit.unitType === UNIT && unit.leader === false && item.everyElement === false) {
    return false;
  }
  return true;
};

// Giants with a crew sporting bows or crossbows can be equipped with the fitting artifacts. Everything else is not rated for giants at the moment.
export const whenUnitIsGiant = (item, unit) => {
  if (
    unit.unitType === GIANT &&
    (item.itemType === ITEM_TYPE_CROSSBOWS || item.itemType === ITEM_TYPE_BOWS) &&
    (!BOW_TYPES.includes(unit.rangedWeapon) || !CROSSBOW_TYPES.includes(unit.rangedWeapon))
  ) {
    return false;
  }
  return true;
};
