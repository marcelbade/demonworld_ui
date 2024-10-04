// React
import React, { Fragment } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// functions and components
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

const CardFrontUpperBlackStripe = (props) => {
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
      {isHeroMageOrSingleSummon(props.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderMovementpoints(props.unit)}
          </Typography>
          {props.unit.controlZone > 0 ? (
            <Typography variant="h6" align="center">
              {renderControlzone(props.unit)}
            </Typography>
          ) : null}
        </Fragment>
      ) : null}
      {isGiantOrAutomaton(props.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderMovementLargeElements(props.unit)}
          </Typography>
          {props.unit.overRun > 0 ? (
            <Typography variant="h6" align="center">
              {renderOverrunValue(props.unit)}
            </Typography>
          ) : null}
        </Fragment>
      ) : null}
      {isUnitOrSummonedUnit(props.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderUnitMovement(props.unit)}
          </Typography>
          <Typography variant="h6" align="center">
            {renderManeuvers(props.unit)}
          </Typography>
          {props.unit.wedgeFormation ? (
            <CustomIcon
              icon={wedgeFormationIcon} //
              altText={CARD_TEXT.WEDGE_FORMATION}
              height={HEIGHT_WIDTH_ICON}
              width={HEIGHT_WIDTH_ICON}
              darkBackGround={true}
            />
          ) : null}
          {props.unit.skirmishFormation ? (
            <CustomIcon
              icon={skirmishFormationIcon} //
              altText={CARD_TEXT.SKIRMISH_FORMATION}
              height={HEIGHT_WIDTH_SKIRMISH_ICON}
              width={HEIGHT_WIDTH_SKIRMISH_ICON}
              darkBackGround={true}
            />
          ) : null}
          {props.unit.squareFormation ? (
            <CustomIcon
              icon={squareFormationIcon} //
              altText={CARD_TEXT.SQUARE_FORMATION}
              height={HEIGHT_WIDTH_SQUARE_ICON}
              width={HEIGHT_WIDTH_SQUARE_ICON}
              darkBackGround={true}
            />
          ) : null}
          <Typography variant="h6" align="center">
            {renderHorde(props.unit.horde)}
          </Typography>
        </Fragment>
      ) : null}
      {isSummonsWithMaxFields(props.unit) ? (
        <Fragment>
          <Typography variant="h6" align="center">
            {renderMaxFields(props.unit)}
          </Typography>
        </Fragment>
      ) : null}
    </Grid>
  );
};

export default CardFrontUpperBlackStripe;
