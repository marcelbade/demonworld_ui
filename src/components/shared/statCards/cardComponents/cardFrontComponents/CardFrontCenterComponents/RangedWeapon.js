// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { setRangedWeaponStats } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";

const RangedWeapon = () => {
  const SC = useContext(StateCardContext);

  const rangedWeaponProperties = setRangedWeaponStats(SC.unit);

  const RANGED_WEAPON = `${rangedWeaponProperties.name} ${rangedWeaponProperties.value}`;

  return (
    <Grid
      item //
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="right">
        {RANGED_WEAPON}
      </Typography>
    </Grid>
  );
};

export default RangedWeapon;
