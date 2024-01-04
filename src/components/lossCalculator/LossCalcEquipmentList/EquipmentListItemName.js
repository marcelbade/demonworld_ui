// React
import React from "react";
//Material UI
import { Grid, ListItemText } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// component and functions
import ContextHelpButton from "../../shared/ContextHelpButton";
// constants
import { LOSS_CALCULATOR } from "../../../constants/textsAndMessages";

const useStyles = makeStyles((theme) => ({
  strikeTroughText: {
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  },
}));

const EquipmentListItemName = (props) => {
  const classes = useStyles();

  /**
   * Function returns the correct css conditionally.x
   * @returns an object containing css.
   */
  const switchCssClass = () => {
    return props.isItemLost ? classes.strikeTroughText : null;
  };

  return props.notSingleElementItem ? (
    <Grid container direction="row">
      <ListItemText secondary={<span> {props.itemName}</span>} />
      <ContextHelpButton message={LOSS_CALCULATOR.NOT_SINGLE_ELEMENT_ITEM_MESSAGE} />
    </Grid>
  ) : (
    <ListItemText
      primary={<span className={switchCssClass()}>{props.itemName}</span>}
      secondary={<span className={classes.typographyFont}> {props.pointCost}</span>}
    />
  );
};

export default EquipmentListItemName;
