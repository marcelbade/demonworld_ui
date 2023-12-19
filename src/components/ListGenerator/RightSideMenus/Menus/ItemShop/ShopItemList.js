import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, IconButton, Accordion, AccordionSummary, AccordionDetails, ButtonGroup } from "@mui/material";
// components and functions
import { isObjectEmtpy } from "../../../../../util/utilityFunctions";
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import useItemFilters from "../../../../../customHooks/UseItemFilters";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
  // const AC = useContext(ArmyContext);
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);

  const filter = useItemFilters();

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

  /**
   * Function causes the list of all selected units to change (w/o actually changing it). This is necessary to correctly calculate the list's point cost whenever an item is added. Without this, the point cost of the item is only added whenever a unit is added or removed from the list, not when the item is added ore removed.
   */
  const triggerArymListRecalculation = () => {
    let tempArray = [...SEC.selectedUnits];
    SEC.setSelectedUnits([...tempArray]);
  };

  /**
   * Add the item card object to the selected unit. In addition a flag to track whether the item was lost for the lossCalculator component is added.
   * @param {itemCard object} item
   */
  const addItemToUnit = (item) => {
    let tempObj = { ...IC.unitSelectedForShop };

    tempObj.equipment.push({
      ...item,
      itemLost: false,
    });

    IC.setUnitSelectedForShop({
      ...tempObj,
    });
  };

  /**
   * Function sends all items to a central list to help implement the rule that uniqe items can only be selected once.
   * @param {itemCard} item
   */
  const addItemToCentralList = (item) => {
    //TODO caused an undefined   IC.setAllEquippedItems error
    // IC.setAllEquippedItems([...AC.allEquippedItems, item.itemName]);
  };

  return props.items.length !== 0 ? (
    <ButtonGroup orientation="vertical">
      {props.items
        .filter((itemGroup) => itemGroup.typeName === props.displayThisItemType)
        .map((itemGroup) => itemGroup.items)[0]
        .filter((items) => filter.filterIndividualItems(props.unit, items))
        .map((item) => {
          return (
            <Accordion key={item}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} //
                aria-controls="panel1a-content"
                id="shopItem"
              >
                <IconButton
                  className={classes.buttons}
                  disabled={toggleItemButton(item)}
                  onClick={() => {
                    addItemToUnit(item);
                    addItemToCentralList(item);
                    toggleUnitsItemTypeFlags(item, true);
                    triggerArymListRecalculation();
                  }}
                  size="large"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <Typography variant="body1" className={toggleItemButton(item) ? classes.blockedItemName : classes.itemName}>
                  {item.itemName}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{item.specialRules}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </ButtonGroup>
  ) : null;
};
export default ShopItemList;
