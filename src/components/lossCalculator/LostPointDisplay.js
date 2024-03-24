// React
import React, { Fragment } from "react";
//Material UI
import { Typography } from "@mui/material";
import { LOSS_CALCULATOR } from "../../constants/textsAndMessages";

const LostPointDisplay = (props) => {
  const POINTS_TOTAL = {
    marginLeft: "2em",
  };

  return (
    <Fragment>
      <Typography variant="h6" sx={POINTS_TOTAL}>
        {LOSS_CALCULATOR.LOST_POINTS}
      </Typography>
      <Typography variant="h6" sx={POINTS_TOTAL}>
        {props.totalPointsLost.toFixed(2)}
      </Typography>
    </Fragment>
  );
};

export default LostPointDisplay;
