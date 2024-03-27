// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
import { rangedWeaponStats } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
// constants
import { NO_RANGE_WEAPON } from "../../../../../../constants/textsAndMessages";

const RangedWeapon = () => {
  const SC = useContext(StateCardContext);

  const rangedWeaponProperties = rangedWeaponStats(SC.unit);

  const rangeWeapon = `${rangedWeaponProperties.name} ${rangedWeaponProperties.value}`;

  return (
    <Grid
      item //
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="right">
        {SC.unit.rangedWeapon !== NO_RANGE_WEAPON ? rangeWeapon : null}
      </Typography>
    </Grid>
  );
};

export default RangedWeapon;
