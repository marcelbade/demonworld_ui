import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, ButtonGroup } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import {
  doesUnitAlreadyHaveInstrument,
  doesUnitAlreadyHaveBanner,
  doesUnitalreadyHaveItem,
  hasItemBeenPickedByOtherUnit,
  ownsMaxNumberMagicItems,
} from "./ItemLogic/itemShopSelectionLogic";
// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// constants
import { ITEM_TYPE_BANNER, ITEM_TYPE_MUSICIAN } from "../../../../../constants/itemShopConstants";

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
   *  - A hero, magicican or unit leader can only get ONE magical item.
   *  - In addition, they may gain additional "non-magical" generic items like potions.
   *  - If a standard bearer or musician is present, a standard or
   *    Intrument can be selected in addition to these two.
   *  - In addition if it is a unit, items can be choosen that are carried by every element in the unit.
   * @param {itemCard Object} item
   * @returns a boolean that toggles the button on or off.
   */
  const disableButton = (item) => {
    let unit = AC.unitSelectedForShop;
    let allItems = AC.allItems;

    const itemPickedByOtherUnit = hasItemBeenPickedByOtherUnit(allItems, item);
    const itemAlreadyPicked = doesUnitalreadyHaveItem(unit, item);
    const hasMaxNumber = ownsMaxNumberMagicItems(unit, item);
    const hasBanner = doesUnitAlreadyHaveBanner(unit, item);
    const hasInstrument = doesUnitAlreadyHaveInstrument(unit, item);

    const blockItemWhen = itemAlreadyPicked || itemPickedByOtherUnit || hasMaxNumber || hasBanner || hasInstrument;

    return blockItemWhen;
  };

  /**
   * Function recalculates itemType flags of a unitCard to correctly toggle the item buttons
   * in the item shop on and off.
   * @param {itemCard object} item
   */
  const recalculateUnitsItemTypeFlags = (item, ITEM_ADDED) => {
    if (ITEM_ADDED) {
      let tempObj = { ...AC.unitSelectedForShop };

      tempObj.equipmentTypes.banner = item.itemType === ITEM_TYPE_BANNER ? true : false;
      tempObj.equipmentTypes.musician = item.itemType === ITEM_TYPE_MUSICIAN ? true : false;
      tempObj.equipmentTypes.magicItem = !item.isAdditionalItem;

      AC.setUnitSelectedForShop({
        ...tempObj,
      });
      //item removed
    } else {
      let tempObj = { ...AC.unitSelectedForShop };

      tempObj.equipmentTypes.banner = item.itemType === ITEM_TYPE_BANNER ? false : true;
      tempObj.equipmentTypes.musician = item.itemType === ITEM_TYPE_MUSICIAN ? false : true;
      tempObj.equipmentTypes.magicItem = item.isAdditionalItem;

      AC.setUnitSelectedForShop({
        ...tempObj,
      });
    }
  };

  /**
   * Function causes the list of all selected units to change (w/o actually changing it). This is necessary to correctly calculate the list's point cost whenever an item is added. Without this, the point cost of the item is only added whenever a unit is added or removed from the list, not when the item is added ore removed.
   */
  const triggerArymListReCalculation = () => {
    let tempArray = [...AC.selectedUnits];
    AC.setSelectedUnits([...tempArray]);
  };

  /**
   * Add the item card object to the selected unit. In addiition a flag to track whether the item was lost for the lossCalculator component is added.
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
                  disabled={disableButton(i)}
                  onClick={() => {
                    addItemToUnit(i);
                    recalculateUnitsItemTypeFlags(i, true);
                    triggerArymListReCalculation();
                  }}
                  key={i}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography variant="body1" className={disableButton(i) ? classes.blockedItemName : classes.itemName}>
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
