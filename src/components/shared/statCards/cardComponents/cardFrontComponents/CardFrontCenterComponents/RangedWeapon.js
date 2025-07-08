// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
// constants
import { RANGED_WEAPON_STATS } from "../../../../../../constants/stats";
import { NO_RANGE_WEAPON } from "../../../../../../constants/textsAndMessages";

const RangedWeapon = (props) => {
  const rangedWeaponProperties = setUnitStat(props.unit, RANGED_WEAPON_STATS);

  const RANGED_WEAPON_STAT = `${rangedWeaponProperties.name} ${rangedWeaponProperties.value}`;

  return props.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
    <Grid //
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="right">
        {RANGED_WEAPON_STAT}
      </Typography>
    </Grid>
  ) : null;
};

export default RangedWeapon;
