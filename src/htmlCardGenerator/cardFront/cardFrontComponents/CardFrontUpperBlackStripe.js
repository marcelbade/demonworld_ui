// React
import { Fragment } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// constants
import { CARD_TEXT } from "../../../constants/textsAndMessages";
import {
  isGiantOrAutomaton,
  isHeroMageOrSingleSummon,
  isSummonsWithMaxFields,
  isUnitOrSummonedUnit,
} from "../../../gameLogic/unitStatChangeLogic/unitMovementConditions";
// icons
import CustomIcon from "../../../components/shared/CustomIcon";
import wedgeFormationIcon from "../../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../../assets/icons/squareFormation.png";
import shieldWallIcon from "../../../assets/icons/icons8-shield-white.png";
// functions and components
import {
  renderManeuvers,
  renderHorde,
  renderMaxFields,
  renderOverrunValue,
  renderMovementLargeElements,
  renderMovementpoints,
  renderControlzone,
  renderUnitMovement,
} from "../../../gameLogic/cardStatRenderFunctions/movementStatSetters";

const CardFrontUpperBlackStripe = (props) => {
  const theme = useTheme();

  // icon sizes
  const SIZE_ICON = "30px";
  const SIZE_SKIRMISH_ICON = "20px";
  const SIZE_SHIELD_ICON = "23px";

  return (
    <Grid //
      container
      justifyContent="space-around"
      alignItems="center"
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
              height={SIZE_ICON}
              width={SIZE_ICON}
              darkBackGround={true}
            />
          ) : null}
          {props.unit.skirmishFormation ? (
            <CustomIcon
              icon={skirmishFormationIcon} //
              altText={CARD_TEXT.SKIRMISH_FORMATION}
              height={SIZE_SKIRMISH_ICON}
              width={SIZE_SKIRMISH_ICON}
              darkBackGround={true}
            />
          ) : null}
          {props.unit.squareFormation ? (
            <CustomIcon
              icon={squareFormationIcon} //
              altText={CARD_TEXT.SQUARE_FORMATION}
              height={"45px"}
              width={"40px"}
              darkBackGround={true}
            />
          ) : null}
          {props.unit.shieldWallFormation ? (
            <CustomIcon
              icon={shieldWallIcon} // ###
              altText={CARD_TEXT.SHIELD_WALL_FORMATION}
              height={SIZE_SHIELD_ICON}
              width={SIZE_SHIELD_ICON}
              darkBackGround={false}
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
