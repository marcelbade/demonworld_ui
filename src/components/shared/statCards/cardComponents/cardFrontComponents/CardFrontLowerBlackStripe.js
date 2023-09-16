// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
// components & functions
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
});

const CardFrontLowerBlackStripe = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return SC.isSingleElement ? (
    <Grid item>
      <Typography variant="h6" align="center" className={classes.unitCardStripe}>
        Furchtfaktor: {SC.unit.fear}
      </Typography>
    </Grid>
  ) : (
    <Grid container direction="row" justify="space-around" className={classes.unitCardStripe}>
      <Typography variant="h6" className={classes.font}>
        Furchtfaktor: {SC.unit.fear}
      </Typography>
      <Typography variant="h6" className={classes.font}>
        Moral: {SC.unit.moral1 ? SC.unit.moral1 : "-"} / {SC.unit.moral2 ? SC.unit.moral2 : "-"}
      </Typography>
    </Grid>
  );
};

export default CardFrontLowerBlackStripe;
