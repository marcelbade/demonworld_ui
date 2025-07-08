// React
import { Fragment } from "react";
// Material UI
import { Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import RangedWeapon from "./CardFrontCenterComponents/RangedWeapon";
import MeleeWeapons from "./CardFrontCenterComponents/MeleeWeapons";
import Initiative from "./CardFrontCenterComponents/Initiative";
import SizeArmorSkills from "./CardFrontCenterComponents/SizeArmorSkills";
import ChargeBonus from "./CardFrontCenterComponents/ChargeBonus";

const CardFrontCenter = (props) => {
  const theme = useTheme();

  return (
    <Fragment>
      <Grid //
        container
        justifyContent="center"
        sx={theme.palette.statCards.backGround}
      >
        <RangedWeapon unit={props.unit} />
      </Grid>
      <Grid container direction="column" sx={theme.palette.statCards.backGround}>
        <MeleeWeapons unit={props.unit} />
      </Grid>
      <Initiative unit={props.unit} />
      <ChargeBonus unit={props.unit} />
      <SizeArmorSkills unit={props.unit} />
    </Fragment>
  );
};

export default CardFrontCenter;
