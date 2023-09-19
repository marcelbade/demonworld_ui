// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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

const CardBackUpperBlackStripe = () => {
  const classes = useStyles();
  const SC = useContext(StateCardContext);

  const displayUnitElements = () => {
    let specialElements = 0;
    if (SC.unit.leader) {
      ++specialElements;
    }
    if (SC.unit.standardBearer) {
      ++specialElements;
    }
    if (SC.unit.musician) {
      ++specialElements;
    }

    return SC.unit.numberOfElements - specialElements;
  };

  return (
    <Grid container direction="row" className={classes.blackStripe} justify="space-around">
      <Grid item>
        <Typography variant="h6">
          {SC.unit.leader ? "Anführer" : null}
          {SC.unit.standardBearer ? " / Standarte" : null}
          {SC.unit.musician ? " / Musiker" : null}
        </Typography>
      </Grid> 
      <Grid item>
        <Typography variant="h6">
          {displayUnitElements()} {SC.unit.numberOfElements === 1 ? " Element" : " Elemente"}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
