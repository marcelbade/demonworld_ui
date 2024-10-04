// React
import React from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../../../util/utilityFunctions";

const CardFrontFooter = (props) => {
  const theme = useTheme();

  const hitpoints = renderDynamicIcons({
    iconString: "[ ]",
    iconNumber: props.unit.hitpoints,
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
