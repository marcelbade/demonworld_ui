import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, IconButton } from "@mui/material";
// icons
// import HelpIcon from "@mui/icons-material/Help";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// components and functions
import { ItemContext } from "../../../../../contexts/itemContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// constants
import { MAGICAL_ITEMS } from "../../../../../constants/itemShopConstants";

const useStyles = makeStyles({
  itemName: {
    fontFamily: "jaapokkiRegular",
  },

  points: {
    fontFamily: "jaapokkiRegular",
    color: "grey",
  },
});

const TreeItemNode = (props) => {
  const classes = useStyles();
  const IC = useContext(ItemContext);
  const SEC = useContext(SelectionContext);

  //TODO implement
  const toggleItemButton = () => {};

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

  //TODO implement
  const addItemToCentralList = () => {};

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

  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-around">
      <Grid item  xs={10}>
        <Typography className={classes.itemName} variant="button">
          {props.item.itemName}
        </Typography>
      </Grid>
      <Grid item container xs={1} direction="column">
        <Typography variant="button" className={classes.points}>
          {props.item.points}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          disabled={toggleItemButton(props.item)}
          onClick={() => {
            addItemToUnit(props.item);
            addItemToCentralList(props.item);
            toggleUnitsItemTypeFlags(props.item, true);
            triggerArymListRecalculation();
          }}
          size="large"
        >
          <AddCircleOutlineIcon />
          {/* TODO display rule text */}
        </IconButton>
      </Grid>
    </Grid>
  );
};
export default TreeItemNode;
