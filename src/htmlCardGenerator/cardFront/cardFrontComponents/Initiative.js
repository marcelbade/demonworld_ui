// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import { initiativeSetter } from "../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const Initiative = (props) => {
  const theme = useTheme();

  const intiative = initiativeSetter(props.unit);

  return (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        alignContent: "center",
        ...theme.palette.statCards.statPadding,
        ...theme.palette.statCards.backGround,
      }}
    >
      <Typography variant="h6">{intiative}</Typography>
    </Grid>
  );
};

export default Initiative;
