// React
import React, { Fragment } from "react";
// Material UI
import { Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import RangedWeapon from "./CardFrontCenterComponents/RangedWeapon";
import MeleeWeapons from "./CardFrontCenterComponents/MeleeWeapons";
import Initiative from "./CardFrontCenterComponents/Initiative";
import SizeArmorSkills from "./CardFrontCenterComponents/SizeArmorSkills";
import ChargeBonus from "./CardFrontCenterComponents/ChargeBonus";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const CardFrontCenter = (props) => {
  const theme = useTheme();

  return (
    <Fragment>
      <Grid
        item //
        container
        justifyContent="center"
        sx={theme.palette.statCards.backGround}
      >
        {props.unit.rangedWeapon !== NO_RANGE_WEAPON ? ( //
          <RangedWeapon unit={props.unit} />
        ) : null}
      </Grid>
      <Grid item container direction="column" sx={theme.palette.statCards.backGround}>
        <MeleeWeapons unit={props.unit} />
      </Grid>
      <Initiative unit={props.unit} />
      <ChargeBonus unit={props.unit} />
      <SizeArmorSkills unit={props.unit} />
    </Fragment>
  );
};

export default CardFrontCenter;
