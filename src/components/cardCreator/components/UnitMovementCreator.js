// react
import React, { Fragment, useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";
import { AUTOMATON, GIANT, HERO, MAGE, SUMMONED, UNIT } from "../../../constants/unitTypes";

const UnitMovementCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const changeMovement = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].move = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeSkirmish = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].skirmish = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeCharge = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].charge = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeManeuver = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].hold_maneuvers = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeHasMaxFieldsMove = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].maxFieldsMove = !CCC.unitCards[CCC.displayedElement].maxFieldsMove;

    CCC.setUnitCards(tempArray);
  };

  const renderSummonsMovLabelText = () => {
    return CCC.unitCards[CCC.displayedElement].maxFieldsMove ? CREATOR.MAX_MOVE_POINTS : CREATOR.MOVMENT_POINTS;
  };

  const inputElements = [
    {
      id: "move", //
      label: "",
      value: CCC.unitCards[CCC.displayedElement].move,
      onChange: changeMovement,
      statName: CREATOR.MOVE,
      display:
        CCC.unitCards[CCC.displayedElement].unitType === UNIT ||
        CCC.unitCards[CCC.displayedElement].unitType === GIANT ||
        CCC.unitCards[CCC.displayedElement].unitType === AUTOMATON,
    },
    {
      id: "skirmish", //
      label: "",
      value: CCC.unitCards[CCC.displayedElement].skirmish,
      onChange: changeSkirmish,
      statName: CREATOR.SKIRMISH,
      display:
        CCC.unitCards[CCC.displayedElement].unitType === UNIT ||
        CCC.unitCards[CCC.displayedElement].unitType === GIANT ||
        CCC.unitCards[CCC.displayedElement].unitType === AUTOMATON,
    },
    {
      id: "charge", //
      label: "",
      value: CCC.unitCards[CCC.displayedElement].charge,
      onChange: changeCharge,
      statName: CREATOR.CHARGE,
      display:
        CCC.unitCards[CCC.displayedElement].unitType === UNIT ||
        CCC.unitCards[CCC.displayedElement].unitType === GIANT ||
        CCC.unitCards[CCC.displayedElement].unitType === AUTOMATON,
    },
    {
      id: "maneuver", //
      label: "",
      value: CCC.unitCards[CCC.displayedElement].maneuver,
      onChange: changeManeuver,
      statName: CREATOR.MANEUVER,
      display: CCC.unitCards[CCC.displayedElement].unitType === UNIT,
    },
    {
      id: "movementPoints", //
      label: "",
      value: CCC.unitCards[CCC.displayedElement].move,

      onChange: changeMovement,
      statName: CREATOR.MOVMENT_POINTS,
      display: CCC.unitCards[CCC.displayedElement].unitType === HERO || CCC.unitCards[CCC.displayedElement].unitType === MAGE,
    },
    {
      id: "hold", //
      label: "",
      value: CCC.maneuver,

      onChange: changeManeuver,
      statName: CREATOR.HOLD,
      display: CCC.unitCards[CCC.displayedElement].unitType === GIANT || CCC.unitCards[CCC.displayedElement].unitType === AUTOMATON,
    },
    {
      id: "maxMovementPoints", //
      label: "",
      value: CCC.unitCards[CCC.displayedElement].move,

      onChange: changeMovement,
      statName: renderSummonsMovLabelText(),
      display: CCC.unitCards[CCC.displayedElement].unitType === SUMMONED,
    },
  ];

  const renderSeparator = (iterator) => {
    const MAX_STAT_NUMBER = 3;

    if (
      CCC.unitCards[CCC.displayedElement].unitType === HERO || //
      CCC.unitCards[CCC.displayedElement].unitType === MAGE ||
      CCC.unitCards[CCC.displayedElement].unitType === SUMMONED
    ) {
      return false;
    }

    return iterator < MAX_STAT_NUMBER;
  };

  return (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        alignItems: "center", //
        justifyContent: "center",
        ...theme.palette.cardCreator.box,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      {/* CURRENT BUG! - add fade in and out! */}

      <Grid
        container //
        direction={{ xs: "row" }}
        sx={{
          alignItems: "center", //
          justifyContent: "center",
        }}
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
      {CCC.unitCards[CCC.displayedElement].unitType === SUMMONED ? (
        <FormControlLabel
          control={
            <Checkbox
              checked={CCC.unitCards[CCC.displayedElement].hasMaxFieldsMove} //
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
