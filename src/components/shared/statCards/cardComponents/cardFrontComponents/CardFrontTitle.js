// React
import React from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../../../util/utilityFunctions";
import { Grid2 as Grid, Typography } from "@mui/material";

/**
 * creates the card title. The name displayed is, by default, the unit's name.
 * However if the unit has multiple stat cards (isMultiStateUnit flag), the multiCardName
 *  is protrayed, i.e., the name of one of the stat cards that belong to the unit.
 *  E.g.: "Riesenyeti"
 * @returns html element
 */
const CardFrontTitle = (props) => {
  const theme = useTheme();

  return (
    <Grid
      sx={theme.palette.statCards.backGround} //
      container
      justifyContent="space-around"
      direction="row"
    >
      <Typography
        sx={theme.palette.statCards.cardTitle} //
        variant="h4"
        align="center"
      >
        {renderDynamicIcons({
          iconString: "*",
          iconNumber: props.unit.commandStars,
          showIfNone: false,
        })}
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{
          ...theme.palette.statCards.cardTitle,
          height: "1.5em",
        }} //
      >
        {props.unit.isMultiStateUnit ? props.unit.multiCardName : props.unit.unitName}
      </Typography>
      <Typography
        sx={theme.palette.cardTitle} //
        variant="h6"
        align="center"
      >
        {renderDynamicIcons({
          iconString: "/",
          iconNumber: props.unit.magic,
          showIfNone: false,
        })}
      </Typography>
    </Grid>
  );
};

export default CardFrontTitle;
