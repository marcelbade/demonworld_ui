// React
import React from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and modules
import usePointCostCalculator from "../../../../../customHooks/UsePointCostCalculator";
// constants
import { STATS } from "../../../../../constants/textsAndMessages";

const CardBackLowerBlackStripe = (props) => {
  const calculator = usePointCostCalculator();
  const theme = useTheme();

  const totalPoints = `${calculator.calculateTotalUnitCost(props.unit)} ${STATS.POINTS}`;

  return (
    <Grid>
      <Typography variant="h6" align="center" sx={theme.palette.statCards.blackStripe}>
        {totalPoints}
      </Typography>
    </Grid>
  );
};

export default CardBackLowerBlackStripe;
