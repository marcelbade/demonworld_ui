// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// functions and modules
import { StateCardContext } from "../../../../../contexts/statCardContext";
import usePointCostCalculator from "../../../../../customHooks/UsePointCostCalculator";

const CardBackLowerBlackStripe = () => {
  const calculator = usePointCostCalculator();

  const SC = useContext(StateCardContext);

  return (
    <Grid>
      <Typography variant="h6" align="center" sx={{ padding: "10px", color: "white", backgroundColor: "black" }}>
        {calculator.calculateTotalUnitCost(SC.unit)} Punkte
      </Typography>
    </Grid>
  );
};

export default CardBackLowerBlackStripe;
