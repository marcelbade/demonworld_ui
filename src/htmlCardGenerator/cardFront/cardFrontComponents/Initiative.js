// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import { initiativeSetter } from "../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const Initiative = (props) => {
  const theme = useTheme();

  const intiative = initiativeSetter(props.unit);

  return (
    <Grid
      container //
      direction="column"
      alignItems="center"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{intiative}</Typography>
    </Grid>
  );
};

export default Initiative;
