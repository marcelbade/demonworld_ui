// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography, Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { isObjectEmtpy } from "../../shared/sharedFunctions";
import { uuidGenerator } from "../../shared/sharedFunctions";
import { NAME_MAPPING } from "../../../constants/itemShopConstants";
import {
  forBanner,
  forFactionAndGenericItems,
  forBows,
  whenUnitHasNoLeader,
  forUnitAndItemType,
  forMusicians,
  forCrossBows,
  whenUnitIsGiant,
} from "./itemShopFilterLogic";
import { hasItemBeenPicked, hasItemBeenPickedByOtherUnit, ownsMaxNumberMagicItems, hasItemTypeBeenPicked } from "./itemShopSelectionLogic";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
  },
  buttons: {
    fontFamily: "notMaryKate",
    fontWeight: "bold",
    border: "none",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
  unitName: {
    fontFamily: "notMaryKate",
    fontWeight: "bold",
    borderBottom: "solid 4px black",
  },
  itemName: {
    fontFamily: "notMaryKate",
  },
  itemText: {
    fontFamily: "Beryliumbold",
  },
  errorNoItems: {
    paddingTop: "3em",
    fontFamily: "notMaryKate",
    fontWeight: "bold",
    color: "red",
  },
});

const ItemShop = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  //state
  const [ItemTypes, setItemTypes] = useState([]);
  const [displayThisItemType, setDisplayThisItemType] = useState(ItemTypes[0]);

  // When the selected unit changes, set the correct items in the shop
  useEffect(() => {
    setItemTypes(findDistinctItemTypes());
  }, [contextArmy.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  // Wehn the selected unit changes, take all items it has been equipped with and add them to the "allItems" state variable. This serves as a central regeistry of all items allready taken.
  useEffect(() => {
    let unit = contextArmy.unitSelectedForShop;

    if ("equipment" in unit && unit.equipment.length > 0) {
      const selectedItemNames = unit.equipment.filter((e) => !contextArmy.allItems.includes(e.name)).map((e) => e.name);
      contextArmy.setAllItems([...contextArmy.allItems, ...selectedItemNames]);
    }
  }, [contextArmy.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * function filters all items in the game down to the ones the selected unit can be equipped with. if no unit has been selected,
   * it returns an empty array by default.
   * @returns an array of item objects. array can be emtpy.
   */
  const filterFetchedItemsForUnit = () => {
    const unit = contextArmy.unitSelectedForShop;
    const isUnitSelected = !isObjectEmtpy(contextArmy.unitSelectedForShop);

    if (isUnitSelected) {
      let items = contextArmy.fetchedItems;

      return items
        .filter((item) => forFactionAndGenericItems(item, unit))
        .filter((item) => forUnitAndItemType(item, unit))
        .filter((item) => forBanner(item, unit))
        .filter((item) => forMusicians(item, unit))
        .filter((item) => forBows(item, unit))
        .filter((item) => forCrossBows(item, unit))
        .filter((item) => whenUnitHasNoLeader(item, unit))
        .filter((item) => whenUnitIsGiant(item, unit));
    } else {
      return [];
    }
  };

  /**
   * Function finds the distinct item types of the filtered item list and returns it.
   * @returns [String] an array of item type names.
   */
  const findDistinctItemTypes = () => {
    let distinctTypes = [];

    filterFetchedItemsForUnit().forEach((item) => {
      if (!distinctTypes.includes(item.type)) return distinctTypes.push(item.type);
    });

    return distinctTypes;
  };

  // shows all items of the type whose button was pressed.
  const showTab = (type) => {
    setDisplayThisItemType(type);
  };

  /**
   * Function enforces the item selection rules by toggling the item's corresponding button on/off.
   * Any unit,hero,... can only gain 1 magical item (+ 1 for every special element
   * if it is a unit). In addition it may gain additional "non-magical" generic items like potions.
   * @param {itemCard Object} item
   * @returns a boolean that toggles the button on or off.
   */
  const disableButton = (item) => {
    let unit = contextArmy.unitSelectedForShop;
    let allItems = contextArmy.allItems;

    const itemPickedByOtherUnit = hasItemBeenPickedByOtherUnit(allItems, item);
    const itemPicked = hasItemBeenPicked(unit, item);
    const maxNumber = ownsMaxNumberMagicItems(unit, item);
    const itemTypePicked = hasItemTypeBeenPicked(unit, item);

    return itemPicked || itemPickedByOtherUnit || maxNumber || itemTypePicked;
  };

  /**
   * Add the item card object to the selected unit.
   * @param {itemCard object} item
   */
  const addItemToUnit = (item) => {
    let changedUnit = contextArmy.unitSelectedForShop;

    changedUnit.equipment.push({
      name: item.itemName,
      type: item.type,
      rule: item.specialRules,
      points: item.points,
    });

    contextArmy.setUnitSelectedForShop({
      ...changedUnit,
    });
  };

  return (
    <Grid container direction="column" className={classes.overlay}>
      <Grid item container direction="row">
        {/*UNIT NAME */}
        <Grid item xs={9}>
          <Typography variant="h5" align="center" className={classes.unitName}>
            {contextArmy.unitSelectedForShop ? contextArmy.unitSelectedForShop.unitName : null}
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
                  {NAME_MAPPING[type]}
                </Button>
              );
            })}
          </ButtonGroup>
        </Grid>
        <Grid item xs={8}>
          {/* ITEMLIST */}
          <ButtonGroup orientation="vertical">
            {filterFetchedItemsForUnit()
              .filter((item) => item.type === displayThisItemType)
              .map((item) => {
                return (
                  <Accordion key={uuidGenerator()}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Button
                        className={classes.buttons}
                        disabled={disableButton(item)}
                        onClick={() => {
                          addItemToUnit(item);
                        }}
                        key={uuidGenerator()}
                      >
                        <Typography className={classes.itemName} variant="body1">
                          {item.itemName}
                        </Typography>
                      </Button>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className={classes.itemText} variant="body1">
                        {item.specialRules}
                      </Typography>
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
