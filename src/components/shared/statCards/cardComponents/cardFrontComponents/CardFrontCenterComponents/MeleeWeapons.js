// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
// constants

const MeleeWeapons = () => {
  const SC = useContext(StateCardContext);

  return (
    <Grid item container direction="column">
      <Grid item container justify="center">
        <Typography variant="h6">{SC.unit.weapon1 === 0 ? null : SC.unit.weapon1Name + ": " + SC.unit.weapon1}</Typography>
      </Grid>
      <Grid item container justify="center">
        <Typography variant="h6">{SC.unit.weapon2 === 0 ? null : SC.unit.weapon2Name + ": " + SC.unit.weapon2}</Typography>
      </Grid>
      <Grid item container justify="center">
        <Typography variant="h6">{SC.unit.weapon3 === 0 ? null : SC.unit.weapon3Name + ": " + SC.unit.weapon3}</Typography>
      </Grid>
    </Grid>
  );
};

export default MeleeWeapons;
