// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
// components & functions
import { StateCardContext } from "../../../../../../contexts/statCardContext";
// constants
import { NO_RANGE_WEAPON } from "../../../../../../constants/textsAndMessages";
 

const RangedWeapon = () => {
  

  const SC = useContext(StateCardContext);

  return (
    <Grid item container justify="center">
      {/* 3rd Row - RANGED WEAPONS  */}
      {SC.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
        <Typography variant="h6" align="right">
          {SC.unit.rangedWeapon} {SC.unit.rangedAttackStats}
        </Typography>
      ) : null}
    </Grid>
  );
};

export default RangedWeapon;
