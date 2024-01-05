// React
import React from "react";
//Material UI
import { Grid, ListItemText } from "@mui/material";
// component and functions
import ContextHelpButton from "../../shared/ContextHelpButton";
// constants
import { LOSS_CALCULATOR, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";

const EquipmentListItemName = (props) => {
  return props.notSingleElementItem ? (
    <Grid container direction="row" justifyContent="flex-start">
      <Grid item xs={4}>
        <ListItemText
          primary={<span> {props.itemName}</span>} //
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
      primary={<span>{props.itemName}</span>} //
      secondary={<span> {props.pointCost}</span>}
    />
  );
};

export default EquipmentListItemName;
