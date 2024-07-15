// React
import React, { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and components
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";
import { setUnitStat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";
// constants
import { CHARGE, MOVE, SKIRMISH } from "../../../../../constants/stats";
import CustomIcon from "../../CustomIcon";
import wedgeFormationIcon from "../../../../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../../../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../../../../assets/icons/squareFormationWhite.png";

const CardFrontUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  // content
  const movementPoints = `${setUnitStat(SC.unit, MOVE)} ${CARD_TEXT.MOVEMENT_POINTS}`;

  const controlZone = `${CARD_TEXT.CONTROL_AREA}: ${SC.unit.controlZone}`;

  const moveSkirmishCharge =
    `${CARD_TEXT.MOVE}: ${setUnitStat(SC.unit, MOVE)} ` +
    `/ ${CARD_TEXT.CHARGE}: ${setUnitStat(SC.unit, CHARGE)} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${setUnitStat(SC.unit, SKIRMISH)}`;

  const maneuvers = `${SC.unit.hold_maneuvers} ${CARD_TEXT.MANEUVER}`;

  const horde = `${SC.unit.horde ? CARD_TEXT.HORDE : ""}`;

  const HEIGHT_WIDTH = "30px";
  const HEIGHT_WIDTH_SQUARE = "45px";
  const HEIGHT_WIDTH_SKIRMISH = "20px";

  return SC.isSingleElement && SC.isHeroOrMage ? (
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
      alignItems="center"
      sx={theme.palette.statCards.blackStripe}
    >
      <Typography variant="h6" align="center">
        {moveSkirmishCharge}
      </Typography>
      <Typography variant="h6" align="center">
        {maneuvers}
      </Typography>
      {SC.unit.wedgeFormation ? (
        <CustomIcon
          icon={wedgeFormationIcon} //
          altText={CARD_TEXT.WEDGE_FORMATION}
          height={HEIGHT_WIDTH}
          width={HEIGHT_WIDTH}
        />
      ) : null}
      {SC.unit.skirmishFormation ? (
        <CustomIcon
          icon={skirmishFormationIcon} //
          altText={CARD_TEXT.SKIRMISH_FORMATION}
          height={HEIGHT_WIDTH_SKIRMISH}
          width={HEIGHT_WIDTH_SKIRMISH}
        />
      ) : null}
      {SC.unit.squareFormation ? (
        <CustomIcon
          icon={squareFormationIcon} //
          altText={CARD_TEXT.SQUARE_FORMATION}
          height={HEIGHT_WIDTH_SQUARE}
          width={HEIGHT_WIDTH_SQUARE}
        />
      ) : null}
      <Typography variant="h6" align="center">
        {horde}
      </Typography>
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
