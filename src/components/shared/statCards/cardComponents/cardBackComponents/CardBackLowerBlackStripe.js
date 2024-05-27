// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and modules
import { StateCardContext } from "../../../../../contexts/statCardContext";
import usePointCostCalculator from "../../../../../customHooks/UsePointCostCalculator";
// constants
import { STATS } from "../../../../../constants/textsAndMessages";

const CardBackLowerBlackStripe = () => {
  const calculator = usePointCostCalculator();
  const theme = useTheme();

  const SC = useContext(StateCardContext);
  const totalPoints = `${calculator.calculateTotalUnitCost(SC.unit)} ${STATS.POINTS}`;

  return (
    <Grid>
      <Typography variant="h6" align="center" sx={theme.palette.statCards.blackStripe}>
        {totalPoints}
      </Typography>
    </Grid>
  );
};

export default CardBackLowerBlackStripe;
