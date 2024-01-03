// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// functions and modules
import { calculateTotalUnitPointCost } from "../../../../../util/utilityFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  blackStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
});

const CardBackLowerBlackStripe = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return (
    <Grid>
      <Typography variant="h6" align="center" className={classes.blackStripe}>
        {calculateTotalUnitPointCost(SC.unit)} Punkte
      </Typography>
    </Grid>
  );
};

export default CardBackLowerBlackStripe;
