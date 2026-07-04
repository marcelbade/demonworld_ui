// Material UI
import { Grid, Typography } from "@mui/material";
// components & functions
import { meleeWeaponSetter } from "../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const MeleeWeapons = (props) => {
  const weapons = meleeWeaponSetter(props.unit);

  return (
    <Grid //
      container
      direction="column"
    >
      {weapons.map((w, i) => {
        return (
          <Grid //
            container
            key={i}
            sx={{ justifyContent: "center" }}
          >
            <Typography variant="h6">{w.weaponString}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MeleeWeapons;
