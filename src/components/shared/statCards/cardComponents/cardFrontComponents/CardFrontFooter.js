// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { generateHitPoints } from "../../../../../components/compendiums/factionTable/depencies/factionTableFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardFrontFooter = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const hitpoints = generateHitPoints(SC.unit.hitpoints);

  return (
    <Grid
      container //
      justifyContent="center"
      direction="row"
      sx={theme.palette.statCards.backGround}
    >
      <Typography variant="h6">{hitpoints}</Typography>
    </Grid>
  );
};

export default CardFrontFooter;
