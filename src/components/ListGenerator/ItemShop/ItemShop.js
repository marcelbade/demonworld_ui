// React
import React, { useState, useContext, useEffect } from "react";
//Material UI
import { Button, Grid, ButtonGroup, Typography, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { isObjectEmtpy } from "../../shared/sharedFunctions";
import { uuidGenerator } from "../../shared/sharedFunctions";

// Returns complet tabs panel with three tabs.

const useStyles = makeStyles({
 
  overlay: {
    height: "100vh",
    width: "30vw",
  },
  closeButton: {},
  itemPanel: {},

  panelButtons: {
    fontFamily: "notMaryKate",
    fontWeight: "bold",
    border: 0,
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
  itemList: {
    fontFamily: "notMaryKate",
    fontWeight: "bold",
    width: "50%",
    marginLeft: "10em",
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
  ItemText: {
    marginLeft: "5em",
  },
});

const NAME_MAPPING = {
  armor: "Rüstung",
  banner: "Banner",
  instrument: "Trommeln & Hörner",
  weapon: "Waffen",
  potion: "Tränke",
  ringsAndAmulets: "Ringe und Amulette",
  item: "Gegenstände",
  poison: "Gift",
  warpaint: "Kriegsbemalung",
};

// map item card types to unit types. I.e., mounted units can receive all items for mounted units, infantery units and items for all units.
const UNIT_TO_ITEM_UNITTYPE_MAPPING = {
  C: ["C", "U", "A"],
  I: ["U", "A"],
  M: ["M", "A"],
  H: ["H", "A"],
  A: ["C", "U", "M", "H", "A"],
};

// All item types that are excempt from the 1-item-per-element rule. These items can be rquipped in addition to a magic item
const NON_MAGIC_ITEMS = ["potion", "crystal", "warpaint", "poison"];

const ItemShop = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  //state
  const [ItemTypes, setItemTypes] = useState([]);
  const [displayThisItemType, setDisplayThisItemType] = useState(ItemTypes[0]);

  useEffect(() => {
    setItemTypes(findDistinctItemTypes());
  }, [contextArmy.unitSelectedForShop]); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (!isObjectEmtpy(contextArmy.unitSelectedForShop)) {
      return contextArmy.fetchedItems
        .filter(
          (item) =>
            item.faction.toLowerCase() === contextArmy.unitSelectedForShop.faction.toLowerCase() || item.faction.toLowerCase() === "all"
        )
        .filter((item) => UNIT_TO_ITEM_UNITTYPE_MAPPING[contextArmy.unitSelectedForShop.unitType].includes(item.unitType));
    } else {
      return [];
    }
  };

  // creates a set of item types, i.e., a list w. no duplicates
  const findDistinctItemTypes = () => {
    let temp = [];

    filterFetchedItemsForUnit().forEach((item) => {
      if (!temp.includes(item.type)) return temp.push(item.type);
    });

    return temp;
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

    //item has already been picked by different unit
    const itemPickedByOtherUnit = hasItemBeenPickedByOtherUnit(item);

    // item has already been picked (same name)
    const itemPicked = hasItemBeenPicked(unit, item);

    // maximum number of magic items reached
    const maxNumber = ownsMaxNumberMagicItems(unit, item);

    // item type has already been picked (type of non-magical item has already been picked)
    const itemTypePicked = hasItemTypeBeenPicked(unit, item);

    return itemPicked || itemPickedByOtherUnit || maxNumber || itemTypePicked;
  };

  const hasItemBeenPickedByOtherUnit = (item) => {
    if (contextArmy.allItems.includes(item.itemName)) {
      return true;
    }
    return false;
  };

  const hasItemBeenPicked = (unit, item) => {
    if (unit.equipment.filter((e) => e.name === item.itemName).length > 0) {
      //  updateEquipmentFlags(unit, item);
      return true;
    }
    return false;
  };

  const hasItemTypeBeenPicked = (unit, item) => {
    if (NON_MAGIC_ITEMS.includes(item.type)) {
      const isGenericType = unit.equipmentTypes[item.type];
      const typeAlreadyPicked = unit.equipment.filter((e) => e.type === item.type).length > 0;

      if (!isGenericType && typeAlreadyPicked) {
        unit.equipmentTypes[item.type] = true;
      }

      if (isGenericType && typeAlreadyPicked) {
        unit.equipmentTypes[item.type] = false;
      }

      return isGenericType;
    }

    return false;
  };

  const ownsMaxNumberMagicItems = (unit, item) => {
    let magicItemNumber = 0;
    let isMagicItem = false;

    if ("equipment" in unit && unit.equipment.length > 0) {
    }
    magicItemNumber = unit.equipment.filter((e) => !NON_MAGIC_ITEMS.includes(e.type)).length;
    isMagicItem = !NON_MAGIC_ITEMS.includes(item.type);

    if (isMagicItem && magicItemNumber === unit.equipmentTypes.maxMagic) {
      return true;
    }

    return false;
  };

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
        {/* CLOSING BUTTON */}
        <Grid item xs={3} className={classes.closeButton}>
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              contextArmy.closeItemShop();
            }}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </Grid>
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
          <ButtonGroup fullWidth={true} variant="contained" size="large" orientation="vertical" disableElevation>
            {ItemTypes.map((type) => {
              return (
                <Button
                  className={classes.panelButtons}
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
        <Grid item xs={9} className={classes.itemPanel}>
          {/* ITEMLIST */}
          <ButtonGroup variant="text" orientation="vertical" fullWidth={true} disableElevation>
            {filterFetchedItemsForUnit()
              .filter((item) => item.type === displayThisItemType)
              .map((item) => {
                return (
                  <Grid key={uuidGenerator()} item container direction="row" alignItems="center">
                    <Grid item xs={7}>
                      <Button
                        disabled={disableButton(item)}
                        onClick={() => {
                          addItemToUnit(item);
                        }}
                        key={uuidGenerator()}
                        className={classes.itemList}
                      >
                        {item.itemName}
                      </Button>
                    </Grid>
                    <Grid item xs={2} className={classes.ItemText}>
                      <Tooltip title={item.specialRules} placement="right-start" TransitionComponent={Zoom}>
                        <HelpIcon />
                      </Tooltip>
                    </Grid>
                  </Grid>
                );
              })}
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemShop;
