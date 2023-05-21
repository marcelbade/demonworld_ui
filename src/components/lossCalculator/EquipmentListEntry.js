// React
import React from "react";
//Material UI
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// components and functions
import { uuidGenerator } from "../shared/sharedFunctions";

// clsx
import clsx from "clsx";
// icons

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles((theme) => ({
  typographyFont: {
    fontFamily: "NotMaryKate",
    textAlign: "center",
    marginTop: "0.5em",
  },
  strikeTroughText: {
    fontFamily: "NotMaryKate",
    textAlign: "center",
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
    <Grid item xs={12} container direction="row" className={classes.equipment} key={uuidGenerator()}>
      <Grid item xs={3}>
        {props.itemClicked[props.index] ? (
          <Button
            className={clsx(classes.deleteBttn, classes.textMargin)}
            onClick={() => {
              subtractItemFromLosses(props.element.points);
              removeLostMarker(props.index);
            }}
          >
            <RemoveCircleOutlineIcon />
          </Button>
        ) : (
          <Button
            className={clsx(classes.deleteBttn, classes.textMargin)}
            onClick={() => {
              addItemToLosses(props.element.points);
              markItemLost(props.index);
            }}
          >
            <AddCircleOutlineIcon />
          </Button>
        )}
      </Grid>
      <Grid item xs={8}>
        <Typography variant="button" className={props.itemClicked[props.index] ? classes.strikeTroughText : classes.typographyFont}>
          {props.element.name}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="button" className={props.itemClicked[props.index] ? classes.strikeTroughText : classes.typographyFont}>
          {props.element.points}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default EquipmentListEntry;
