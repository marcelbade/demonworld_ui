// react
import React, { Fragment, useContext } from "react";
// material ui
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
  const CCC = useContext(CardCreationContext);

  const changeMovement = (event) => {
    CCC.setMove(parseInt(event.target.value));
  };

  const changeSkirmish = (event) => {
    CCC.setSkirmish(parseInt(event.target.value));
  };

  const changeCharge = (event) => {
    CCC.setCharge(parseInt(event.target.value));
  };

  const changeManeuver = (event) => {
    CCC.setManeuver(parseInt(event.target.value));
  };

  const changeHasMaxFieldsMove = () => {
    CCC.setHasMaxFieldsMove((prevState) => !prevState);
  };
  const renderSummonsMovLabelText = () => {
    return CCC.hasMaxFieldsMove ? CREATOR.MAX_MOVE_POINTS : CREATOR.MOVMENT_POINTS;
  };

  const inputElements = [
    {
      id: "move", //
      label: "",
      value: CCC.move,
      onChange: changeMovement,
      statName: CREATOR.MOVE,
      display: CCC.unitType === UNIT || CCC.unitType === GIANT || CCC.unitType === AUTOMATON,
    },
    {
      id: "skirmish", //
      label: "",
      value: CCC.skirmish,
      onChange: changeSkirmish,
      statName: CREATOR.SKIRMISH,
      display: CCC.unitType === UNIT || CCC.unitType === GIANT || CCC.unitType === AUTOMATON,
    },
    {
      id: "charge", //
      label: "",
      value: CCC.charge,
      onChange: changeCharge,
      statName: CREATOR.CHARGE,
      display: CCC.unitType === UNIT || CCC.unitType === GIANT || CCC.unitType === AUTOMATON,
    },
    {
      id: "maneuver", //
      label: "",
      value: CCC.maneuver,

      onChange: changeManeuver,
      statName: CREATOR.MANEUVER,
      display: CCC.unitType === UNIT,
    },
    {
      id: "movementPoints", //
      label: "",
      value: CCC.move,

      onChange: changeMovement,
      statName: CREATOR.MOVMENT_POINTS,
      display: CCC.unitType === HERO || CCC.unitType === MAGE,
    },
    {
      id: "hold", //
      label: "",
      value: CCC.maneuver,

      onChange: changeManeuver,
      statName: CREATOR.HOLD,
      display: CCC.unitType === GIANT || CCC.unitType === AUTOMATON,
    },
    {
      id: "maxMovementPoints", //
      label: "",
      value: CCC.move,

      onChange: changeMovement,
      statName: renderSummonsMovLabelText(),
      display: CCC.unitType === SUMMONED,
    },
  ];

  const renderSeparator = (iterator) => {
    const MAX_STAT_NUMBER = 3;

    if (CCC.unitType === HERO || CCC.unitType === MAGE || CCC.unitType === SUMMONED) {
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
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      {CCC.unitType === UNIT ? <FormationsAndHordeCreator /> : null}
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
      {CCC.unitType === SUMMONED ? (
        <FormControlLabel
          control={
            <Checkbox
              checked={CCC.hasMaxFieldsMove} //
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
