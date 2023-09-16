// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
// functions and components
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  centerpadding: {},
});

const CardFrontUpperBlackStripe = () => {
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

  return SC.isSingleElement ? (
    <Grid item container justify="space-around" className={classes.unitCardStripe}>
      <Typography variant="h6">{SC.unit.move} Bewegungspunkte</Typography>
      <Grid item></Grid>
      <Typography variant="h6">Kontrollbereich: {SC.unit.controlZone_OverRun}</Typography>
    </Grid>
  ) : (
    <Grid item container direction="row" justify="center" className={classes.unitCardStripe}>
      <Typography variant="h6" align="center">
        B: {SC.unit.move} / A: {SC.unit.charge} / P:{SC.unit.skirmish}
      </Typography>
      <Typography variant="h6" align="center">
        {SC.unit.hold_maneuvers} Manöver
      </Typography>
      <Typography variant="h6" align="center">
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography variant="h6">
            {SC.unit.leader ? "Anführer / " : null}
            {SC.unit.standardBearer ? "Standarte / " : null}
            {SC.unit.musician ? "Musiker / " : null}
          </Typography>
          <Typography variant="h6">{displayUnitElements()}</Typography>
          <Typography variant="h6">{SC.unit.numberOfElements === 1 ? "Element" : "Elemente"}</Typography>
        </Grid>
      </Typography>
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
