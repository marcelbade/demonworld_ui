// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
// components & functions
import { generateHitPoints } from "../../../../../components/compendiums/factionTable/depencies/factionTableFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardFrontFooter = () => {
  const SC = useContext(StateCardContext);

  return (
    <Grid container justify="center" direction="row">
      <Typography variant="h6">{generateHitPoints(SC.unit.hitpoints)}</Typography>
    </Grid>
  );
};

export default CardFrontFooter;