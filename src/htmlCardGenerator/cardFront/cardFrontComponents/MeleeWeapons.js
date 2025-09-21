// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import { meleeWeaponSetter } from "../../../gameLogic/unitStatSetters";

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
            justifyContent="center"
            key={i}
          >
            <Typography variant="h6">{w.weaponString}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MeleeWeapons;
