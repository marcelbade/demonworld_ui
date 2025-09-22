// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import { rangedWeaponSetter } from "../../../gameLogic/cardStatRenderFunctions/unitStatSetters"; // constants
import { NO_RANGE_WEAPON } from "../../../constants/textsAndMessages";

const RangedWeapon = (props) => {
  return props.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
    <Grid //
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="right">
        {rangedWeaponSetter(props.unit)}
      </Typography>
    </Grid>
  ) : null;
};

export default RangedWeapon;
