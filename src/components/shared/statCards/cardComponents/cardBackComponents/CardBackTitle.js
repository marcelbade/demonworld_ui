// React
import React from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const CardBackTitle = (props) => {
  const theme = useTheme();

  return (
    <Grid
      sx={theme.palette.statCards.backGround} //
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="center" sx={theme.palette.statCards.cardTitle}>
        {props.unit.faction}
      </Typography>
    </Grid>
  );
};

export default CardBackTitle;
