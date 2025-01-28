// react
import React, { Fragment, useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// components and functions
import FormationsAndHordeCreator from "./FormationsAndHordeCreator";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";
import { AUTOMATON, GIANT, HERO, MAGE, SUMMONED, UNIT } from "../../constants/unitTypes";

const UnitMovementCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const changeMovement = (event) => {
    CCC.setUnit({ ...CCC.unit, move: parseInt(event.target.value) });
  };

  const changeSkirmish = (event) => {
    CCC.setUnit({ ...CCC.unit, skirmish: parseInt(event.target.value) });
  };

  const changeCharge = (event) => {
    CCC.setUnit({ ...CCC.unit, charge: parseInt(event.target.value) });
  };

  const changeManeuver = (event) => {
    CCC.setUnit({ ...CCC.unit, hold_maneuvers: parseInt(event.target.value) });
  };

  const changeHasMaxFieldsMove = () => {
    CCC.setUnit({ ...CCC.unit, maxFieldsMove: !CCC.unit.maxFieldsMove });
  };

  const renderSummonsMovLabelText = () => {
    return CCC.unit.maxFieldsMove ? CREATOR.MAX_MOVE_POINTS : CREATOR.MOVMENT_POINTS;
  };

  const inputElements = [
    {
      id: "move", //
      label: "",
      value: CCC.unit.move,
      onChange: changeMovement,
      statName: CREATOR.MOVE,
      display: CCC.unit.unitType === UNIT || CCC.unit.unitType === GIANT || CCC.unit.unitType === AUTOMATON,
    },
    {
      id: "skirmish", //
      label: "",
      value: CCC.unit.skirmish,
      onChange: changeSkirmish,
      statName: CREATOR.SKIRMISH,
      display: CCC.unit.unitType === UNIT || CCC.unit.unitType === GIANT || CCC.unit.unitType === AUTOMATON,
    },
    {
      id: "charge", //
      label: "",
      value: CCC.unit.charge,
      onChange: changeCharge,
      statName: CREATOR.CHARGE,
      display: CCC.unit.unitType === UNIT || CCC.unit.unitType === GIANT || CCC.unit.unitType === AUTOMATON,
    },
    {
      id: "maneuver", //
      label: "",
      value: CCC.unit.maneuver,
      onChange: changeManeuver,
      statName: CREATOR.MANEUVER,
      display: CCC.unit.unitType === UNIT,
    },
    {
      id: "movementPoints", //
      label: "",
      value: CCC.unit.move,

      onChange: changeMovement,
      statName: CREATOR.MOVMENT_POINTS,
      display: CCC.unit.unitType === HERO || CCC.unit.unitType === MAGE,
    },
    {
      id: "hold", //
      label: "",
      value: CCC.maneuver,

      onChange: changeManeuver,
      statName: CREATOR.HOLD,
      display: CCC.unit.unitType === GIANT || CCC.unit.unitType === AUTOMATON,
    },
    {
      id: "maxMovementPoints", //
      label: "",
      value: CCC.unit.move,

      onChange: changeMovement,
      statName: renderSummonsMovLabelText(),
      display: CCC.unit.unitType === SUMMONED,
    },
  ];

  const renderSeparator = (iterator) => {
    const MAX_STAT_NUMBER = 3;

    if (CCC.unit.unitType === HERO || CCC.unit.unitType === MAGE || CCC.unit.unitType === SUMMONED) {
      return false;
    }

    return iterator < MAX_STAT_NUMBER;
  };

  return (
    <Grid
      container //
      alignItems="center" //
      justifyContent="center"
      direction="column"
      sx={theme.palette.cardCreator.box}
    >
      {CCC.unit.unitType === UNIT ? <FormationsAndHordeCreator /> : null}
      <Grid
        container //
        item
        direction="row"
        alignItems="center" //
        justifyContent="center"
      >
        {inputElements
          .filter((input) => input.display)
          .map((input, i) => (
            <Fragment key={input.id}>
              <CreatorTextInput
                id={input.id}
                value={input.value}
                onClick={input.onClick}
                onChange={input.onChange}
                label={input.statName}
                width="7em"
              />
              {/*  dont't add a "/" after the last element */}
              {renderSeparator(i) ? (
                <Typography
                  variant="h3" //
                  sx={{
                    color: "white",
                    marginLeft: "1em",
                    marginRight: "0.5em",
                  }}
                  key={i}
                >
                  /
                </Typography>
              ) : null}
            </Fragment>
          ))}
      </Grid>
      {CCC.unit.unitType === SUMMONED ? (
        <FormControlLabel
          control={
            <Checkbox
              checked={CCC.unit.hasMaxFieldsMove} //
              onChange={changeHasMaxFieldsMove}
            />
          }
          label={CREATOR.MAX_MOVE_POINTS}
          labelPlacement="start"
        />
      ) : null}
    </Grid>
  );
};

export default UnitMovementCreator;
