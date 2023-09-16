// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// functions and modules
import { calculateTotalUnitPointCost } from "../../../sharedFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  blackStripe: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
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
