// React
import React from "react";
//Material UI
import { Grid, ListItemText } from "@mui/material";
// component and functions
import ContextHelpButton from "../../shared/ContextHelpButton";
// constants
import { LOSS_CALCULATOR, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";

const EquipmentListItemName = (props) => {
  const STRIKETROUGHTEXT = {
    textAlign: "left",
    marginTop: "0.5em",
    color: "red",
    textDecorationLine: "line-through",
    textDecorationThickness: "0.2em",
  };

  /**
   * Function returns the correct css conditionally.x
   * @returns an object containing css.
   */
  const switchCssClass = () => {
    return props.isItemLost ? STRIKETROUGHTEXT : null;
  };

  return props.notSingleElementItem ? (
    <Grid container direction="row" justifyContent="flex-start">
      <ListItemText
        primary={<span>{props.itemName}</span>} //
        secondary={<span> {props.pointCost}</span>}
      />
      <ContextHelpButton
        message={LOSS_CALCULATOR.NOT_SINGLE_ELEMENT_ITEM_MESSAGE} //
        type={PUSH_MESSAGE_TYPES.INFO}
      />
    </Grid>
  ) : (
    <ListItemText
      primary={<span sx={switchCssClass()}>{props.itemName}</span>} //
      secondary={<span> {props.pointCost}</span>}
    />
  );
};

export default EquipmentListItemName;
