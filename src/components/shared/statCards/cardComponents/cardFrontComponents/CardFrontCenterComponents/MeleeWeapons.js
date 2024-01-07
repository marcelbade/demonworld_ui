// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { weapon1stats } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";

const MeleeWeapons = () => {
  const SC = useContext(StateCardContext);

  const weapon1Properties = weapon1stats(SC.unit);

  return (
    <Grid item container direction="column">
      <Grid item container justifyContent="center">
        <Typography variant="h6">
          {SC.unit.weapon1 === 0 //
            ? null
            : `${weapon1Properties.name}: ${weapon1Properties.value}`}
        </Typography>
      </Grid>
      <Grid item container justifyContent="center">
        <Typography variant="h6">
          {SC.unit.weapon2 === 0 //
            ? null
            : `${SC.unit.weapon2Name}: ${SC.unit.weapon2}`}
        </Typography>
      </Grid>
      <Grid item container justifyContent="center">
        <Typography variant="h6">
          {SC.unit.weapon3 === 0 //
            ? null
            : `${SC.unit.weapon3Name}: ${SC.unit.weapon3}`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MeleeWeapons;
