// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  blackStripe: {
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
    <Grid container direction="row" className={classes.blackStripe} justifyContent="space-around">
      {SC.unit.numberOfElements !== 1 ? (
        <Typography variant="h6">
          {SC.unit.leader ? "Anführer" : null}
          {SC.unit.standardBearer ? " / Standarte" : null}
          {SC.unit.musician ? " / Musiker" : null}
        </Typography>
      ) : null}
      {SC.unit.numberOfElements !== 1 ? (
        <Typography variant="h6">{displayUnitElements()} Elemente</Typography>
      ) : (
        <Typography variant="h6">1 Element</Typography>
      )}
    </Grid>
  );
};

export default CardBackUpperBlackStripe;
