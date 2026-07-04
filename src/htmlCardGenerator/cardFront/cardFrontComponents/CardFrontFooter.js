// React
import React from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../util/utilityFunctions";

const CardFrontFooter = (props) => {
  const theme = useTheme();

  const hitpoints = renderDynamicIcons("[ ]", props.unit.hitpoints);

  return (
    <Grid
      container //
      sx={{
        justifyContent: "center",
        direction: "row",
        height: "2.5em",
        ...theme.palette.statCards.backGround,
      }}
    >
      <Typography variant="h6">{hitpoints}</Typography>
    </Grid>
  );
};

export default CardFrontFooter;
