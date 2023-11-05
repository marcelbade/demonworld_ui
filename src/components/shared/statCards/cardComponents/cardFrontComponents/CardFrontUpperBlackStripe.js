// React
import React, { useContext } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Grid, Typography } from "@mui/material";
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

  return SC.isSingleElement ? (
    <Grid item container justifyContent="space-around" className={classes.unitCardStripe}>
      <Typography variant="h6">{SC.unit.move} Bewegungspunkte</Typography>
      {SC.unit.controlZone > 1 ? <Typography variant="h6">Kontrollbereich: {SC.unit.controlZone}</Typography> : null}
    </Grid>
  ) : (
    <Grid item container direction="row" justifyContent="space-around" className={classes.unitCardStripe}>
      <Typography variant="h6" align="center">
        B: {SC.unit.move} / A: {SC.unit.charge} / P:{SC.unit.skirmish}
      </Typography>
      <Typography variant="h6" align="center">
        {SC.unit.hold_maneuvers} Manöver
      </Typography>
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
