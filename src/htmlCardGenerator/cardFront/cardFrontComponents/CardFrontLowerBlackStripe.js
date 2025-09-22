// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { isSingleElementCard } from "../../../util/utilityFunctions";
import { fearSetter, moralSetter } from "../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const CardFrontLowerBlackStripe = (props) => {
  const theme = useTheme();

  return isSingleElementCard(props.unit) ? (
    <Grid>
      <Typography
        variant="h6" //
        align="center"
        sx={theme.palette.statCards.blackStripe}
      >
        {fearSetter(props.unit)}
      </Typography>
    </Grid>
  ) : (
    <Grid
      container //
      direction="row"
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      <Typography variant="h6"> {fearSetter(props.unit)}</Typography>
      <Typography variant="h6">{moralSetter(props.unit)}</Typography>
    </Grid>
  );
};

export default CardFrontLowerBlackStripe;
