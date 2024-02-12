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


  return (
    <Grid item container justifyContent="center">
      {/* 3rd Row - RANGED WEAPONS  */}
      {SC.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
        <Typography variant="h6" align="right">
          {rangedWeaponProperties.name} {rangedWeaponProperties.value}
        </Typography>
      ) : null}
    </Grid>
  );
};

export default RangedWeapon;
