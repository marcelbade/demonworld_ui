// React
import React, { useContext, Fragment } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and components
import { StateCardContext } from "../../../../../contexts/statCardContext";
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";
import {
  isGiantOrAutomaton,
  isHeroMageOrSingleSummon,
  isSummonsWithMaxFields,
  isUnitOrSummonedUnit,
} from "../../../unitMovementConditions";
// icons
import CustomIcon from "../../CustomIcon";
import wedgeFormationIcon from "../../../../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../../../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../../../../assets/icons/squareFormationWhite.png";
// constants
import {
  renderManeuvers,
  renderHorde,
  renderMaxFields,
  renderOverrunValue,
  renderMovementLargeElements,
  renderMovementpoints,
  renderControlzone,
  renderUnitMovement,
} from "../../../cardMovementRenderFunctions";

const CardFrontUpperBlackStripe = () => {
  const SC = useContext(StateCardContext);
  const theme = useTheme();

  // icon sizes
  const HEIGHT_WIDTH_ICON = "30px";
  const HEIGHT_WIDTH_SQUARE_ICON = "45px";
  const HEIGHT_WIDTH_SKIRMISH_ICON = "20px";

  return (
    <Grid
      item //
      container
      justifyContent="space-around"
      sx={theme.palette.statCards.blackStripe}
    >
      {isHeroMageOrSingleSummon(SC.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderMovementpoints(SC.unit, { isDynamic: true })}
          </Typography>
          {SC.unit.controlZone > 0 ? (
            <Typography variant="h6" align="center">
              {renderControlzone(SC.unit)}
            </Typography>
          ) : null}
        </Fragment>
      ) : null}
      {isGiantOrAutomaton(SC.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderMovementLargeElements(SC.unit, { isDynamic: true })}
          </Typography>
          {SC.unit.overRun > 0 ? (
            <Typography variant="h6" align="center">
              {renderOverrunValue(SC.unit, { isDynamic: true })}
            </Typography>
          ) : null}
        </Fragment>
      ) : null}
      {isUnitOrSummonedUnit(SC.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderUnitMovement(SC.unit, { isDynamic: true })}
          </Typography>
          <Typography variant="h6" align="center">
            {renderManeuvers(SC.unit)}
          </Typography>
          {SC.unit.wedgeFormation ? (
            <CustomIcon
              icon={wedgeFormationIcon} //
              altText={CARD_TEXT.WEDGE_FORMATION}
              height={HEIGHT_WIDTH_ICON}
              width={HEIGHT_WIDTH_ICON}
              darkBackGround={true}
            />
          ) : null}
          {SC.unit.skirmishFormation ? (
            <CustomIcon
              icon={skirmishFormationIcon} //
              altText={CARD_TEXT.SKIRMISH_FORMATION}
              height={HEIGHT_WIDTH_SKIRMISH_ICON}
              width={HEIGHT_WIDTH_SKIRMISH_ICON}
              darkBackGround={true}
            />
          ) : null}
          {SC.unit.squareFormation ? (
            <CustomIcon
              icon={squareFormationIcon} //
              altText={CARD_TEXT.SQUARE_FORMATION}
              height={HEIGHT_WIDTH_SQUARE_ICON}
              width={HEIGHT_WIDTH_SQUARE_ICON}
              darkBackGround={true}
            />
          ) : null}
          <Typography variant="h6" align="center">
            {renderHorde(SC.unit.horde)}
          </Typography>
        </Fragment>
      ) : null}
      {isSummonsWithMaxFields(SC.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderMaxFields(SC.unit)}
          </Typography>
        </Fragment>
      ) : null}
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
