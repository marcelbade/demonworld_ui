// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
// constants
import { RANGED_WEAPON_STATS } from "../../../../../../constants/stats";

const RangedWeapon = (props) => {
  const rangedWeaponProperties = setUnitStat(props.unit, RANGED_WEAPON_STATS);

  const RANGED_WEAPON_STAT = `${rangedWeaponProperties.name} ${rangedWeaponProperties.value}`;

  return (
    <Grid //
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="right">
        {RANGED_WEAPON_STAT}
      </Typography>
    </Grid>
  );
};

export default RangedWeapon;
