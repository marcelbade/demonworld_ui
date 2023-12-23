const useUnitEqipmentLimits = () => {
  /**
   * Function enforces the item selection rules by toggling the item's corresponding button on/off.
   * Rules are:
   *  - Only generic items can be given to multiple units.
   *  - A hero, magicican or unit leader can only get ONE magical item.
   *  - A unit may get one banner (if it has a banner bearer).
   *  - A unit may get one instrument (if it has a musician).
   *  - A unit may get one item that every element equips (shields...).
   *  - A unit may get 1 fortification, as long as no more than 10% of the army's points are spent on them.
   * @param {itemCard Object} item
   * @returns true, if the flag corresponding to the item's itemType is true.
   * In that case, the button will be disabled.
   */
  const toggleItemButton = (item) => {
    if (!isObjectEmtpy(IC.unitSelectedForShop)) {
      let unit = IC.unitSelectedForShop;

      const hasMagicalItem = unitHasMagicalItem(unit, item);
      const hasBanner = unitHasBanner(unit, item);
      const hasInstrument = unitHasInstrument(unit, item);
      const hasItemForEntireUnit = unitHasItemForEveryElement(unit, item);
      const hasFortifications = unitHasFortifications(unit, item);

      const blockItemWhen = hasMagicalItem || hasBanner || hasBanner || hasInstrument || hasItemForEntireUnit || hasFortifications;

      return blockItemWhen;
    }
    return false;
  };
  /*
   * The following functions check the unit's item flags and return the Boolean value.
   */

  const unitHasMagicalItem = (unit, item) => {
    if (MAGICAL_ITEMS.includes(item.itemType) && !item.everyElement) {
      return unit.equipmentTypes.magicItem;
    } else return false;
  };

  const unitHasBanner = (unit, item) => {
    if (item.itemType === ITEM_TYPE_BANNER) {
      return unit.equipmentTypes.banner;
    } else return false;
  };

  const unitHasInstrument = (unit, item) => {
    if (item.itemType === ITEM_TYPE_INSTRUMENT) {
      return unit.equipmentTypes.instrument;
    } else return false;
  };

  const unitHasItemForEveryElement = (unit, item) => {
    if (item.everyElement) {
      return unit.equipmentTypes.unit;
    } else return false;
  };

  const unitHasFortifications = (unit, item) => {
    if (item.itemType === ITEM_TYPE_FORTIFICATIONS) {
      return unit.equipmentTypes.fortifications;
    } else return false;
  };
};


// TODO
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
    } else if (MAGICAL_ITEMS.includes(item.itemType)) {
      tempObj.equipmentTypes.magicItem = newFlagValue;
    } else {
      tempObj.equipmentTypes[item.itemType] = newFlagValue;
    }

    IC.setUnitSelectedForShop({
      ...tempObj,
    });
  };


export default useUnitEqipmentLimits;
