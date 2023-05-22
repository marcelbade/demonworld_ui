// React
import React from "react";
//Material UI
import { Typography, Grid, ListItem, ListItemIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// components and functions
import { uuidGenerator } from "../shared/sharedFunctions";

// clsx
import clsx from "clsx";
// icons

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { ListItemButton } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  entry: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
        // justifyContent: "space-between",
      },
    },
  },
  typographyFont: {
    fontFamily: "NotMaryKate",
    textAlign: "left",
    marginTop: "0.5em",
  },
  strikeTroughText: {
    fontFamily: "NotMaryKate",
    textAlign: "left",
    marginTop: "0.5em",
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  },
  line: {
    marginTop: "0.5em",
    marginBottom: "0.5em",
    borderBottom: "solid black 0.1em",
    display: "block",
  },
}));

const EquipmentListEntry = (props) => {
  const classes = useStyles();

  /**
   * Function adds the point cost of all items marked lost
   * @param {int} points
   */
  const addItemToLosses = (points) => {
    let temp = props.itemsLost;
    temp += points;

    props.setItemsLost(temp);
  };

  /**
   * Function subtracts the point cost of all items not marked lost.
   * @param {int} points
   */
  const subtractItemFromLosses = (points) => {
    let temp = props.itemsLost;
    temp -= points;

    props.setItemsLost(temp);
  };

  /**
   * An array of boolean flags is used to keep track of which items are marked lost. The index in the boolean array corresponds to the same index in the item list. A boolean flag set to true means the item was lost. The boolean flag then toggles the item's button between "add item to losses" / "remove item from losses".
   * @param {int} index
   */
  const markItemLost = (index) => {
    let tempArray = [...props.itemClicked];
    tempArray[index] = true;
    props.setItemClicked(tempArray);
  };

  // see comment for the "markItemLost" function.
  const removeLostMarker = (index) => {
    let tempArray = [...props.itemClicked];
    tempArray[index] = false;
    props.setItemClicked(tempArray);
  };

  return (
    <ListItem className={classes.entry} key={uuidGenerator()}>
      {props.itemClicked[props.index] ? (
        <ListItemButton
          className={clsx(classes.deleteBttn, classes.textMargin)}
          onClick={() => {
            subtractItemFromLosses(props.element.points);
            removeLostMarker(props.index);
          }}
        >
          <ListItemIcon>
            <RemoveCircleOutlineIcon />
          </ListItemIcon>
        </ListItemButton>
      ) : (
        <ListItemButton
          className={clsx(classes.deleteBttn, classes.textMargin)}
          onClick={() => {
            addItemToLosses(props.element.points);
            markItemLost(props.index);
          }}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
        </ListItemButton>
      )}
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="button" className={props.itemClicked[props.index] ? classes.strikeTroughText : classes.typographyFont}>
            {props.element.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="button" className={props.itemClicked[props.index] ? classes.strikeTroughText : classes.typographyFont}>
            {props.element.points}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default EquipmentListEntry;
