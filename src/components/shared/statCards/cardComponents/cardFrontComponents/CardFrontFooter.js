// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
// components & functions
import { generateHitPoints } from "../../../../../components/compendiums/factionTable/depencies/factionTableFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  Icon: {
    height: "1em",
    width: "1em",
  },
});

const CardFrontFooter = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return (
    <Grid container justify="center" direction="row">
      <Typography variant="h6">{generateHitPoints(SC.unit.hitpoints)}</Typography>
    </Grid>
  );
};

export default CardFrontFooter;
