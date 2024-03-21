// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import {makeStyles} from "@material-ui/core";
// functions and modules
import { StateCardContext } from "../../../../../contexts/statCardContext";
import usePointCostCalculator from "../../../../../customHooks/UsePointCostCalculator";

const useStyles = makeStyles({
  blackStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
});

const CardBackLowerBlackStripe = () => {
  const classes = useStyles();
  const calculator = usePointCostCalculator();

  const SC = useContext(StateCardContext);

  return (
    <Grid>
      <Typography variant="h6" align="center" className={classes.blackStripe}>
        {calculator.calculateTotalUnitCost(SC.unit)} Punkte
      </Typography>
    </Grid>
  );
};

export default CardBackLowerBlackStripe;
