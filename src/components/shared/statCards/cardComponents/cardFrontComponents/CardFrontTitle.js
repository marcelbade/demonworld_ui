// React
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";

/**
 * creates the card title. The name displayed is, by default, the unit's name.
 * However if the unit has multiple stat cards (isMultiStateUnit flag), the multiCardName
 *  is protrayed, i.e., the name of one of the stat cards that belong to the unit.
 *  E.g.: "Riesenyeti"
 * @returns html element
 */
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
        {SC.unit.isMultiStateUnit ? SC.unit.multiCardName : SC.unit.unitName}
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
