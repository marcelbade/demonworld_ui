// React
import React, { useContext, Fragment } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and components
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";
import { setUnitStat } from "../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/unitStatChangesLogic";
// icons
import CustomIcon from "../../CustomIcon";
import wedgeFormationIcon from "../../../../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../../../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../../../../assets/icons/squareFormationWhite.png";
// constants
import { CHARGE, MOVE, SKIRMISH, HOLD, OVERRUN } from "../../../../../constants/stats";
import { GIANT, HERO, MAGE, UNIT, SUMMONED, AUTOMATON } from "../../../../../constants/unitTypes";

const CardFrontUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  // icon sizes
  const HEIGHT_WIDTH_ICON = "30px";
  const HEIGHT_WIDTH_SQUARE_ICON = "45px";
  const HEIGHT_WIDTH_SKIRMISH_ICON = "20px";

  // heroes and magic user
  const MOVEMENTPOINTS = `${setUnitStat(SC.unit, MOVE)} ${CARD_TEXT.MOVEMENT_POINTS}`;
  const CONTROLZONE = `${CARD_TEXT.CONTROL_AREA}: ${SC.unit.controlZone}`;

  // infantry and cavalry
  const MOVESKIRMISHCHARGE_UNIT =
    `${CARD_TEXT.MOVE}: ${setUnitStat(SC.unit, MOVE)} ` +
    `/ ${CARD_TEXT.CHARGE}: ${setUnitStat(SC.unit, CHARGE)} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${setUnitStat(SC.unit, SKIRMISH)}`;

  const MANEUVERS = `${SC.unit.hold_maneuvers} ${CARD_TEXT.MANEUVER}`;
  const HORDE = `${SC.unit.horde ? CARD_TEXT.HORDE : ""}`;

  // large elements
  const MOVEMENT_LARGE =
    `${CARD_TEXT.MOVE}: ${setUnitStat(SC.unit, MOVE)} ` +
    `/ ${CARD_TEXT.CHARGE}: ${setUnitStat(SC.unit, CHARGE)} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${setUnitStat(SC.unit, SKIRMISH)} ` +
    `/ ${CARD_TEXT.HOLD}: ${setUnitStat(SC.unit, HOLD)}`;

  const OVERRUN_LARGE = `${CARD_TEXT.OVERRUN}: ${setUnitStat(SC.unit, OVERRUN)}`;

  return (
    <Grid
      item //
      container
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      {SC.unit.unitType === HERO || SC.unit.unitType === MAGE ? (
        <Fragment>
          <Typography variant="h6">{MOVEMENTPOINTS}</Typography>
          <Typography> {SC.unit.controlZone > 1 ? <Typography variant="h6">{CONTROLZONE}</Typography> : null}</Typography>
        </Fragment>
      ) : null}
      {SC.unit.unitType === GIANT ? (
        <Fragment>
          <Typography variant="h6">{MOVEMENT_LARGE}</Typography>
          <Typography variant="h6">{OVERRUN_LARGE}</Typography>
        </Fragment>
      ) : null}
      {SC.unit.unitType === UNIT || SC.unit.unitType === SUMMONED || SC.unit.unitType === AUTOMATON ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {MOVESKIRMISHCHARGE_UNIT}
          </Typography>
          <Typography variant="h6" align="center">
            {MANEUVERS}
          </Typography>
          {SC.unit.wedgeFormation ? (
            <CustomIcon
              icon={wedgeFormationIcon} //
              altText={CARD_TEXT.WEDGE_FORMATION}
              height={HEIGHT_WIDTH_ICON}
              width={HEIGHT_WIDTH_ICON}
            />
          ) : null}
          {SC.unit.skirmishFormation ? (
            <CustomIcon
              icon={skirmishFormationIcon} //
              altText={CARD_TEXT.SKIRMISH_FORMATION}
              height={HEIGHT_WIDTH_SKIRMISH_ICON}
              width={HEIGHT_WIDTH_SKIRMISH_ICON}
            />
          ) : null}
          {SC.unit.squareFormation ? (
            <CustomIcon
              icon={squareFormationIcon} //
              altText={CARD_TEXT.SQUARE_FORMATION}
              height={HEIGHT_WIDTH_SQUARE_ICON}
              width={HEIGHT_WIDTH_SQUARE_ICON}
            />
          ) : null}
          <Typography variant="h6" align="center">
            {HORDE}
          </Typography>
        </Fragment>
      ) : null}
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
