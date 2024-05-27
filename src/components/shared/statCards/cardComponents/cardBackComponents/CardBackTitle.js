// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { useTheme } from "@emotion/react";

const CardBackTitle = () => {
  const theme = useTheme();

  const SC = useContext(StateCardContext);

  return (
    <Grid
      sx={theme.palette.statCards.backGround} //
      item
      container
      justifyContent="center"
    >
      <Typography variant="h6" align="center" sx={theme.palette.statCards.cardTitle}>
        {SC.unit.faction}
      </Typography>
    </Grid>
  );
};

export default CardBackTitle;
