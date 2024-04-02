// React
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardFrontTitle = () => {
  const theme = useTheme();
  const SC = useContext(StateCardContext);

  return (
    <Grid
      sx={theme.palette.statCards.backGround} //
      item
      container
      justifyContent="space-around"
      direction="row"
    >
      <Typography sx={theme.palette.statCards.cardTitle} variant="h4" align="center">
        {renderDynamicIcons({
          iconString: "*",
          iconNumber: SC.unit.commandStars,
          showIfNone: false,
        })}
      </Typography>
      <Typography sx={theme.palette.statCards.cardTitle} variant="h4" align="center">
        {SC.unit.unitName}
      </Typography>
      <Typography sx={theme.palette.cardTitle} variant="h6" align="center">
        {renderDynamicIcons({
          iconString: "/",
          iconNumber: SC.unit.magic,
          showIfNone: false,
        })}
      </Typography>
    </Grid>
  );
};

export default CardFrontTitle;
