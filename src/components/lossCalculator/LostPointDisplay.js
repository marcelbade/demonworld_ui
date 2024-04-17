// React
import React from "react";
//Material UI
import { Grid, Typography } from "@mui/material";
// functions and components
import ContextHelpButton from "../shared/ContextHelpButton";
// constants
import { LOSS_CALCULATOR, PUSH_MESSAGE_TYPES } from "../../constants/textsAndMessages";

const LostPointDisplay = (props) => {
  return (
    <Grid
      container
      direction="row" //
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        sx={{ marginRight: "1em" }} //
        variant="h6"
      >
        {LOSS_CALCULATOR.LOST_POINTS}
      </Typography>
      <Typography
        sx={{ marginRight: "2em" }} //
        variant="h6"
      >
        {props.totalPointsLost.toFixed(2)}
      </Typography>
      <ContextHelpButton
        message={LOSS_CALCULATOR.LOSS_BUTTON_HELP} //
        type={PUSH_MESSAGE_TYPES.INFO}
      />
    </Grid>
  );
};

export default LostPointDisplay;
