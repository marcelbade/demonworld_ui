// react
import { useContext } from "react";
// components and functions
import { ItemContext } from "../contexts/itemContext";
// constants
import { ITEM_TYPE_FORTIFICATIONS } from "../constants/itemShopConstants";
import { ITEM_LIMIT_MESSAGE } from "../constants/textsAndMessages";

const useUnitEquipmentLimits = () => {
  const IC = useContext(ItemContext);

  /**
   * While useItemFilters makes sure that items that a unit can not equip are not shown or disabled,
   * this logic implements item selection selection rules by toggling the item's
   * corresponding add button on/off.
   * The Rules are as follows:
   *  - Only generic items can be given to multiple units.
   *  - A hero, magicican or unit leader can only get ONE magical item.
   *  - A unit may get one banner, if it has a banner bearer.
   *  - A unit may get one instrument, if it has a musician.
   *  - A unit may get one item that every element equips (shields...).
   *  - A unit may get 1 fortification, as long as no more than 10% of the army's points are spent on them.
   * @param {itemCard Object} item
   * @returns true, if the flag corresponding to the item's itemType is true.
   * In that case, the button will be disabled.
   */
  const disableItem = (unit, item) => {
    // TODO: do this like the filterIndividualItems
    // TODO: you need to return a Boolean and a message

    let disable = {
      disableButton: false,
      errorMessage: "",
    };

    if (item.everyElement && unit.equipmentTypes.unit) {
      disable = {
        disableButton: true,
        errorMessage: ITEM_LIMIT_MESSAGE.ONLY_ONE_ITEM_FOR_ALL_ELEMENTS,
      };
    }
    if (item.requiresBanner && unit.equipmentTypes.banner) {
      disable = {
        disableButton: true,
        errorMessage: ITEM_LIMIT_MESSAGE.ONLY_ONE_BANNER,
      };
    }
    if (item.requiresMusician && unit.equipmentTypes.instrument) {
      disable = {
        disableButton: true,
        errorMessage: ITEM_LIMIT_MESSAGE.ONLY_ONE_INSTRUMENT,
      };
    }
    if (item.itemType === ITEM_TYPE_FORTIFICATIONS && unit.equipmentTypes.fortifications) {
      disable = {
        disableButton: true,
        errorMessage: ITEM_LIMIT_MESSAGE.ONLY_ONE_FORTIFICATION,
      };
    }
    if (isMagicItem(item) && unit.equipmentTypes.magicItem) {
      disable = {
        disableButton: true,
        errorMessage: ITEM_LIMIT_MESSAGE.ONLY_ONE_MAGICAL_ITEM,
      };
    }

    return disable;
  };

  /**
   * Function tests if the item is a magical item, i.e.,
   * that it does not belong to one of the special categories
   * (banner, fortificatio, instrument, items that are given to every element of a unit)
   * @param {itemCard Object} item
   * @returns
   */
  const isMagicItem = (item) => {
    return (
      !item.everyElement && //
      !item.requiresBanner &&
      !item.requiresMusician &&
      item.itemType !== ITEM_TYPE_FORTIFICATIONS
    );
  };

  /**
   * Function sets the itemType flags of a unitCard to correctly toggle the item buttons
   * in the item shop on and off.
   * @param {*} item
   * @param {*} newFlagValue booleam flag. True, if the item is added, false if the item is removed.
   */
  const toggleUnitsItemTypeFlags = (item, newFlagValue) => {
    let tempObj = { ...IC.unitSelectedForShop };

    if (item.everyElement) {
      tempObj.equipmentTypes.unit = newFlagValue;
    }
    if (item.requiresBanner) {
      tempObj.equipmentTypes.banner = newFlagValue;
    }
    if (item.requiresMusician) {
      tempObj.equipmentTypes.instrument = newFlagValue;
    }
    if (item.itemType === ITEM_TYPE_FORTIFICATIONS) {
      tempObj.equipmentTypes.fortifications = newFlagValue;
    }
    if (isMagicItem(item)) {
      tempObj.equipmentTypes.magicItem = newFlagValue;
    }

    IC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  return {
    disableItem: disableItem,
    toggleUnitsItemTypeFlags: toggleUnitsItemTypeFlags,
  };
};

export default useUnitEquipmentLimits;
