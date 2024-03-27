// React
import React, { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and components
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_PREVIEW } from "../../../../../constants/textsAndMessages";
import { setUnitStat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
// constants
import { CHARGE, MOVE, SKIRMISH } from "../../../../../constants/stats";

const CardFrontUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  const movementPoints = `${setUnitStat(SC.unit, MOVE)} ${CARD_PREVIEW.MOVEMENT_POINTS}`;
  const controlZone = `${CARD_PREVIEW.CONTROL_AREA}: ${SC.unit.controlZone}`;
  const moveSkirmishCharge = `${CARD_PREVIEW.MOVE}: ${setUnitStat(SC.unit, MOVE)}
   / ${CARD_PREVIEW.CHARGE}: ${setUnitStat(SC.unit, CHARGE)} / ${CARD_PREVIEW.SKIRMISH}: ${setUnitStat(SC.unit, SKIRMISH)}`;
  const maneuvers = `${SC.unit.hold_maneuvers} ${CARD_PREVIEW.MANEUVER}`;

  return SC.isSingleElement ? (
    <Grid
      item //
      container
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      <Typography variant="h6">{movementPoints}</Typography>
      {SC.unit.controlZone > 1 ? <Typography variant="h6">{controlZone}</Typography> : null}
    </Grid>
  ) : (
    <Grid
      item //
      container
      direction="row"
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      <Typography variant="h6" align="center">
        {moveSkirmishCharge}
      </Typography>
      <Typography variant="h6" align="center">
        {maneuvers}
      </Typography>
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
