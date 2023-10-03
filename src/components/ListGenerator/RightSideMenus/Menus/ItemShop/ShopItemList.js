import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, ButtonGroup } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// constants
import {
  MAGICAL_ITEMS,
  ITEM_TYPE_BANNER,
  ITEM_TYPE_FORTIFICATIONS,
  ITEM_TYPE_INSTRUMENT,
} from "../../../../../constants/itemShopConstants";

const useStyles = makeStyles({
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  itemName: {
    width: "20em",
    display: "flex",
    alignItems: "center",
  },
  blockedItemName: {
    width: "20em",
    display: "flex",
    alignItems: "center",
    color: "lightgrey",
  },
});

const ShopItemList = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

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
    let unit = AC.unitSelectedForShop;
    let allItems = AC.allItems;

    const itemPickedByOtherUnit = hasItemBeenPickedByOtherUnit(allItems, item);
    const hasMagicalItem = unitHasMagicalItem(unit, item);
    const hasBanner = unitHasBanner(unit, item);
    const hasInstrument = unitHasInstrument(unit, item);
    const hasItemForEntireUnit = unitHasItemForEveryElement(unit, item);
    const hasFortifications = unitHasFortifications(unit, item);

    const blockItemWhen =
      itemPickedByOtherUnit || hasMagicalItem || hasBanner || hasBanner || hasInstrument || hasItemForEntireUnit || hasFortifications;

    return blockItemWhen;
  };

  /*
   * The following functions check the unit's item flags and return the Boolean value.
   */

  const hasItemBeenPickedByOtherUnit = (allItems, item) => {
    if (!item.isGeneric) {
      return allItems.includes(item.itemName);
    } else return false;
  };

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

  /**
   * Function sets the itemType flags of a unitCard to correctly toggle the item buttons
   * in the item shop on and off.
   * @param {*} item
   * @param {*} newFlagValue booleam flag. True, if the item is added, false if the item is removed.
   */
  const toggleUnitsItemTypeFlags = (item, newFlagValue) => {
    let tempObj = { ...AC.unitSelectedForShop };

    if (item.everyElement) {
      tempObj.equipmentTypes.unit = newFlagValue;
    } else if (MAGICAL_ITEMS.includes(item.itemType)) {
      tempObj.equipmentTypes.magicItem = newFlagValue;
    } else {
      tempObj.equipmentTypes[item.itemType] = newFlagValue;
    }

    AC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  /**
   * Function causes the list of all selected units to change (w/o actually changing it). This is necessary to correctly calculate the list's point cost whenever an item is added. Without this, the point cost of the item is only added whenever a unit is added or removed from the list, not when the item is added ore removed.
   */
  const triggerArymListReCalculation = () => {
    let tempArray = [...AC.selectedUnits];
    AC.setSelectedUnits([...tempArray]);
  };

  /**
   * Add the item card object to the selected unit. In addition a flag to track whether the item was lost for the lossCalculator component is added.
   * @param {itemCard object} item
   */
  const addItemToUnit = (item) => {
    let tempObj = { ...AC.unitSelectedForShop };

    tempObj.equipment.push({
      ...item,
      itemLost: false,
    });

    AC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  return (
    <ButtonGroup orientation="vertical">
      {props.items
        .filter((item) => item.itemType === props.displayThisItemType)
        .map((i) => {
          return (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} //
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <IconButton
                  className={classes.buttons}
                  disabled={toggleItemButton(i)}
                  onClick={() => {
                    addItemToUnit(i);
                    toggleUnitsItemTypeFlags(i, true);
                    triggerArymListReCalculation();
                  }}
                  key={i}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography variant="body1" className={toggleItemButton(i) ? classes.blockedItemName : classes.itemName}>
                  {i.itemName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{i.specialRules}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </ButtonGroup>
  );
};
export default ShopItemList;
