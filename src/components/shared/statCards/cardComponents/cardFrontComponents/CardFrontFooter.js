// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardFrontFooter = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const hitpoints = renderDynamicIcons({
    iconString: "[ ]",
    iconNumber: SC.unit.hitpoints,
    showIfNone: false,
  });

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
