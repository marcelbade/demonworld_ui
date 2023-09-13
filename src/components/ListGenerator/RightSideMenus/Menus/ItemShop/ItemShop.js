// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// icons
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { uuidGenerator, isObjectEmtpy } from "../../../../shared/sharedFunctions";
import {
  NAME_MAPPING as ITEM_CATEGORY_NAME_MAPPING,
  ITEM_TYPE_BANNER,
  ITEM_TYPE_MUSICIAN,
} from "../../../../../constants/itemShopConstants";
import {
  filterForStandardBearer,
  filterForFactionAndGenericItems,
  filterForBows,
  whenUnitHasNoLeader,
  filterForUnitType,
  filterForMusicians,
  filterForCavalryItems,
  filterForMagicUsers,
  filterForCrossBows,
  whenUnitIsGiant,
  filterForUnit,
  filterForItemsUsableNotByCavalry,
  filterForShields,
  filterForSpears,
  filterForLances,
  filterForItemsWithMaxArmor,
  filterForItemsWithMaxSize,
} from "./itemShopFilterLogic";
import {
  doesUnitAlreadyHaveInstrument,
  doesUnitAlreadyHaveBanner,
  doesUnitalreadyHaveItem,
  hasItemBeenPickedByOtherUnit,
  ownsMaxNumberMagicItems,
} from "./itemShopSelectionLogic";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "20vw",
  },
  buttons: {
    fontWeight: "bold",
    border: "none",
  },
  unitName: {
    fontWeight: "bold",
    borderBottom: "solid 4px black",
  },
  itemText: {
    fontFamily: "Beryliumbold",
  },
  errorNoItems: {
    paddingTop: "3em",
    fontWeight: "bold",
    color: "red",
  },
});

const ItemShop = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  //state
  const [ItemTypes, setItemTypes] = useState([]);
  const [displayThisItemType, setDisplayThisItemType] = useState(ItemTypes[0]);

  // When the selected unit changes, set the correct items in the shop
  useEffect(() => {
    setItemTypes(findDistinctItemTypes());
  }, [AC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  // When the selected unit changes, take all items it has been equipped with and add them to the "allItems" state variable. This serves as a central register of all items allready taken.
  useEffect(() => {
    let unit = AC.unitSelectedForShop;

    if ("equipment" in unit && unit.equipment.length > 0) {
      const selectedItemNames = unit.equipment.filter((e) => !AC.allItems.includes(e.name)).map((e) => e.name);
      AC.setAllItems([...AC.allItems, ...selectedItemNames]);
    }
  }, [AC.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * function filters all items in the game down to the ones the selected unit can be equipped with. if no unit has been selected,
   * it returns an empty array by default.
   * @returns an array of item objects. array can be emtpy.
   */
  const filterFetchedItemsForUnit = () => {
    const unit = AC.unitSelectedForShop;
    const isUnitSelected = !isObjectEmtpy(AC.unitSelectedForShop);

    if (isUnitSelected) {
      let items = AC.fetchedItems;

      return items
        .filter((item) => filterForFactionAndGenericItems(item, unit))
        .filter((item) => filterForUnitType(item, unit))
        .filter((item) => filterForUnit(item, unit))
        .filter((item) => filterForStandardBearer(item, unit))
        .filter((item) => filterForMusicians(item, unit))
        .filter((item) => filterForMagicUsers(item, unit))
        .filter((item) => filterForItemsWithMaxArmor(item, unit))
        .filter((item) => filterForItemsWithMaxSize(item, unit))
        .filter((item) => filterForShields(item, unit))
        .filter((item) => filterForCavalryItems(item, unit))
        .filter((item) => filterForItemsUsableNotByCavalry(item, unit))
        .filter((item) => filterForSpears(item, unit))
        .filter((item) => filterForLances(item, unit))
        .filter((item) => filterForBows(item, unit))
        .filter((item) => filterForCrossBows(item, unit))
        .filter((item) => whenUnitHasNoLeader(item, unit))
        .filter((item) => whenUnitIsGiant(item, unit));
    } else {
      return [];
    }
  };

  /**
   * Function finds the distinct item types of the filtered item list and returns it. These are used as shop categories.
   * @returns [String] an array of item type names.
   */
  const findDistinctItemTypes = () => {
    let distinctTypes = [];

    filterFetchedItemsForUnit().forEach((item) => {
      if (!distinctTypes.includes(item.itemType)) return distinctTypes.push(item.itemType);
    });

    return distinctTypes;
  };

  // shows all items of the type whose button was pressed.
  const showTab = (type) => {
    setDisplayThisItemType(type);
  };

  /**
   * Function enforces the item selection rules by toggling the item's corresponding button on/off.
   * A hero, magicican or unit leader can only get 1 magical item. In addition, they may gain additional "non-magical" generic items like potions. If a standard bearer or musician is present, a standard or intrument can be selected in addition to these two. In addition if it is a unit, items can be choosen that are carried by every element in the unit.
   * @param {itemCard Object} item
   * @returns a boolean that toggles the button on or off.
   */
  const disableButton = (item) => {
    let unit = AC.unitSelectedForShop;
    let allItems = AC.allItems;

    const itemPickedByOtherUnit = hasItemBeenPickedByOtherUnit(allItems, item);
    const itemPicked = doesUnitalreadyHaveItem(unit, item);
    const maxNumber = ownsMaxNumberMagicItems(unit, item);
    const banner = doesUnitAlreadyHaveBanner(unit, item);
    const instrument = doesUnitAlreadyHaveInstrument(unit, item);

    return itemPicked || itemPickedByOtherUnit || maxNumber || banner || instrument;
  };

  /**
   * Add the item card object to the selected unit. Only a subSet is added as well as a flag to track whether the item was lost for the lossCalculator component.
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

  /**
   * Function recalculates itemType flags of a unitCard to correctly toggle the item buttons
   * in thej item shop on and off.
   * @param {itemCard object} item
   */
  const recalculateItemTypeFlags = (item, ITEM_ADDED) => {
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

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid>
        <IconButton
          onClick={() => {
            AC.setItemShopState({ ...AC.itemShopState, show: false });
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item container direction="row">
        {/*UNIT NAME */}
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {AC.unitSelectedForShop.unitName}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="row" className={classes.dynamicPart}>
        <Grid item xs={3} className={classes.panelButtonsBackground}>
          {/* PANEL BUTTONS */}
          <ButtonGroup size="large" orientation="vertical">
            {ItemTypes.map((type) => {
              return (
                <Button
                  className={classes.buttons}
                  variant="text"
                  key={uuidGenerator()}
                  onClick={() => {
                    showTab(type);
                  }}
                >
                  {ITEM_CATEGORY_NAME_MAPPING[type]}
                </Button>
              );
            })}
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}>
          {/* ITEMLIST */}
          <ButtonGroup orientation="vertical">
            {filterFetchedItemsForUnit()
              .filter((item) => item.itemType === displayThisItemType)
              .map((item) => {
                return (
                  <Accordion key={uuidGenerator()}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Button
                        className={classes.buttons}
                        disabled={disableButton(item)}
                        onClick={() => {
                          addItemToUnit(item);
                          recalculateItemTypeFlags(item, true);
                          triggerArymListReCalculation();
                        }}
                        key={uuidGenerator()}
                      >
                        <Typography variant="body1">{item.itemName}</Typography>
                      </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">{item.specialRules}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemShop;
