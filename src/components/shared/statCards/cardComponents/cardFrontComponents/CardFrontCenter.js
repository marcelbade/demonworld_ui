// React
import React, { Fragment, useContext } from "react";
// Material UI
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { StateCardContext } from "../../../../../contexts/statCardContext";
import RangedWeapon from "./CardFrontCenterComponents/RangedWeapon";
import MeleeWeapons from "./CardFrontCenterComponents/MeleeWeapons";
import Initiative from "./CardFrontCenterComponents/Initiative";
import SizeArmorSkills from "./CardFrontCenterComponents/SizeArmorSkills";
import ChargeBonus from "./CardFrontCenterComponents/ChargeBonus";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const CardFrontCenter = () => {
  const theme = useTheme();
  const SC = useContext(StateCardContext);

  return (
    <Fragment>
      <Grid
        item //
        container
        justifyContent="center"
        sx={theme.palette.statCards.backGround}
      >
        {SC.unit.rangedWeapon !== NO_RANGE_WEAPON ? ( //
          <RangedWeapon />
        ) : null}
      </Grid>
      <Grid item container direction="column" sx={theme.palette.statCards.backGround}>
        <MeleeWeapons />
      </Grid>
      <Initiative />
      <ChargeBonus/>
      <SizeArmorSkills />
    </Fragment>
  );
};

export default CardFrontCenter;
