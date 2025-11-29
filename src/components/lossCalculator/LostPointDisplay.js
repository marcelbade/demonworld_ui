// React
import React from "react";
//Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
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
        variant="h5"
        sx={{ marginRight: "1em" }} //
      >
        {`${LOSS_CALCULATOR.LOST_POINTS} ${props.totalPointsLost.toFixed(2)}`}
      </Typography>
      <ContextHelpButton
        isVisible={true}
        message={LOSS_CALCULATOR.LOSS_BUTTON_HELP} //
        type={PUSH_MESSAGE_TYPES.INFO}
      />
    </Grid>
  );
};

export default LostPointDisplay;
