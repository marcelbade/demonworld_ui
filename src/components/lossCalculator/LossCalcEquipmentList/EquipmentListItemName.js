// React
import React from "react";
//Material UI
import { Grid, ListItemText } from "@mui/material";
import {makeStyles} from "@material-ui/core";
// component and functions
import ContextHelpButton from "../../shared/ContextHelpButton";
// constants
import { LOSS_CALCULATOR, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";

const useStyles = makeStyles((theme) => ({
  entry: {
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("lg")]: {
      flexDirection: "row",

      "@media (orientation:landscape)": {
        flexDirection: "row",
      },
    },
  },
  strikeTroughText: {
    textAlign: "left",
    marginTop: "0.5em",
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
    <Grid container direction="row" justifyContent="flex-start">
      <Grid item xs={4}>
        <ListItemText
          primary={<span>{props.itemName}</span>} //
          secondary={<span> {props.pointCost}</span>}
        />
      </Grid>
      <ContextHelpButton
        message={LOSS_CALCULATOR.NOT_SINGLE_ELEMENT_ITEM_MESSAGE} //
        type={PUSH_MESSAGE_TYPES.INFO}
      />
    </Grid>
  ) : (
    <ListItemText
      primary={<span className={switchCssClass()}>{props.itemName}</span>} //
      secondary={<span> {props.pointCost}</span>}
    />
  );
};

export default EquipmentListItemName;
