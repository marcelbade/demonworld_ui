// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { chargeBonusSetter } from "../../../gameLogic/unitStatSetters";

const ChargeBonus = (props) => {
  const theme = useTheme();

  return props.unit.chargeBonus > 0 ? (
    <Grid
      container //
      direction="column"
      alignItems="center"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{chargeBonusSetter(props.unit)}</Typography>
    </Grid>
  ) : null;
};

export default ChargeBonus;
