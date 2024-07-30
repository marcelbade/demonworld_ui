// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../../../util/utilityFunctions";
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
      sx={{
        ...theme.palette.statCards.backGround,
        height: "2.5em",
      }}
    >
      <Typography variant="h6">{hitpoints}</Typography>
    </Grid>
  );
};

export default CardFrontFooter;
