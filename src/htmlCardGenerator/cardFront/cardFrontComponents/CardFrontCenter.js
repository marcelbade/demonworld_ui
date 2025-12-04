// React
import { Fragment } from "react";
// Material UI
import { Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import RangedWeapon from "./RangedWeapon";
import MeleeWeapons from "./MeleeWeapons";
import Initiative from "./Initiative";
import SizeArmorSkills from "./SizeArmorSkills";
import ChargeBonus from "./ChargeBonus";

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
      <Grid
        container
        direction="column"
        sx={{
          ...theme.palette.statCards.statPadding,
          ...theme.palette.statCards.backGround,
        }}
      >
        <MeleeWeapons unit={props.unit} />
      </Grid>
      <Initiative unit={props.unit} />
      <ChargeBonus unit={props.unit} />
      <SizeArmorSkills unit={props.unit} />
    </Fragment>
  );
};

export default CardFrontCenter;
