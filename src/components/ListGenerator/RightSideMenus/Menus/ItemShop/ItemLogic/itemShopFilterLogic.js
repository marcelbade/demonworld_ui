// constants
import {
  USABLE_BY_ALL,
  ITEM_TYPE_BOWS,
  ITEM_TYPE_CROSSBOWS,
  BOW_TYPES,
  CROSSBOW_TYPES,
  GIANT,
  UNIT,
  SPEAR_TYPES,
  LANCE_TYPES,
} from "../../../../../../constants/itemShopConstants";
import { NO_RANGE_WEAPON } from "../../../../../../constants/textsAndMessages";

export const itemFilter = {
  // Only show items of the faction or generic ones.
  filterForFactionAndGenericItems: (item, unit) => {
    return item.faction === unit.faction || item.faction === USABLE_BY_ALL;
  },

  // Only show items that can be equipped by the selected type of unit.
  filterForUnitType: (item, unit) => {
    return item.unitType.includes(unit.unitType) || item.unitType === USABLE_BY_ALL;
  },

  //Only show items that are for this specific unit
  filterForUnit: (item, unit) => {
    return item.limitedToUnit === unit.unitName || item.limitedToUnit === USABLE_BY_ALL;
  },

  // Only show banners if the unit has a standard bearer special element.
  filterForStandardBearer: (item, unit) => {
    if (!unit.standardBearer && item.requiresBanner) {
      return false;
    }
    return true;
  },

  // Only show instruments if the unit has a musician special element.
  filterForMusician: (item, unit) => {
    if (!unit.musician && item.requiresMusician) {
      return false;
    }
    return true;
  },

  // Filter Items for magicUser
  filterForMagicUsers: (item, unit) => {
    if (unit.magic === 0 && item.magicUsersOnly === true) {
      return false;
    }
    return true;
  },

  // only units with shields can use shields
  filterForShields: (item, unit) => {
    if (unit.hasShield === false && item.requiresShield === true) {
      return false;
    }
    return true;
  },

  // Some Items a restricted to units with a max range armor.
  filterForItemsWithMaxArmor: (item, unit) => {
    if (unit.armourRange > item.maxRangeArmor && item.maxRangeArmor > -1) {
      return false;
    }
    return true;
  },

  // Some Items a restricted to units with a max range armor.
  filterForItemsWithMaxSize: (item, unit) => {
    if (unit.size > item.maxSize && item.maxSize > -1) {
      return false;
    }
    return true;
  },

  // Filter items for those only meant for cavalry
  filterForCavalryItems: (item, unit) => {
    if (unit.isMounted === false && item.mustBeMounted === true) {
      return false;
    }
    return true;
  },

  // Filter items for those only meant for units that are not mounted
  filterForItemsNotUsableByCavalry: (item, unit) => {
    if (unit.isMounted === true && item.usableByCav === false) {
      return false;
    }
    return true;
  },

  // Magic spears can only be used by units with spears
  filterForSpears: (item, unit) => {
    if (item.requiresWeaponType === "spears" && !(SPEAR_TYPES.includes(unit.weapon1Name) || SPEAR_TYPES.includes(unit.weapon2Name))) {
      return false;
    }
    return true;
  },

  // Magic lances can only be used by units with lances
  filterForLances: (item, unit) => {
    if (item.requiresWeaponType === "lances" && !(LANCE_TYPES.includes(unit.weapon1Name) || LANCE_TYPES.includes(unit.weapon2Name))) {
      return false;
    }
    return true;
  },

  // Crossbows can only be used by units with bows
  filterForCrossBows: (item, unit) => {
    if ((unit.rangedWeapon === NO_RANGE_WEAPON || !CROSSBOW_TYPES.includes(unit.rangedWeapon)) && item.itemType === ITEM_TYPE_CROSSBOWS) {
      return false;
    }
    return true;
  },

  // Bows can only be used by units with bows
  filterForBows: (item, unit) => {
    if ((unit.rangedWeapon === NO_RANGE_WEAPON || !BOW_TYPES.includes(unit.rangedWeapon)) && item.itemType === ITEM_TYPE_BOWS) {
      return false;
    }
    return true;
  },

  // If the unit card is a unit (not a hero or mage) without leader, only show items that can be equipped by standard bearers, musicians and the whole unit.
  whenUnitHasNoLeader: (item, unit) => {
    if (unit.unitType === UNIT && unit.leader === false && item.everyElement === false) {
      return false;
    }
    return true;
  },

  // Giants with a crew sporting bows or crossbows can be equipped with the fitting artifacts. Everything else is not rated for giants at the moment.
  whenUnitIsGiant: (item, unit) => {
    if (
      unit.unitType === GIANT &&
      (item.itemType === ITEM_TYPE_CROSSBOWS || item.itemType === ITEM_TYPE_BOWS) &&
      (!BOW_TYPES.includes(unit.rangedWeapon) || !CROSSBOW_TYPES.includes(unit.rangedWeapon))
    ) {
      return false;
    }
    return true;
  },
};
