// react
import React, { Fragment, useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// components and functions
import FormationsAndHordeCreator from "./FormationsAndHordeCreator";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const UnitMovementCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteMovement = () => {
    CCC.setMove("");
  };

  const changeMovement = (event) => {
    CCC.setMove(event.target.value);
  };

  const deleteSkirmish = () => {
    CCC.setMove("");
  };

  const changeSkirmish = (event) => {
    CCC.setSkirmish(event.target.value);
  };

  const deleteCharge = () => {
    CCC.setMove("");
  };

  const changeCharge = (event) => {
    CCC.setCharge(event.target.value);
  };

  const deleteManeuver = () => {
    CCC.setManeuver("");
  };

  const changeManeuver = (event) => {
    CCC.setManeuver(event.target.value);
  };

  const inputElements = [
    {
      id: "move", //
      label: "",
      value: CCC.move,
      onClick: deleteMovement,
      onChange: changeMovement,
      statName: "Bewegung:",
    },
    {
      id: "skirmish", //
      label: "",
      value: CCC.skirmish,
      onClick: deleteSkirmish,
      onChange: changeSkirmish,
      statName: "Plänklen:",
    },
    {
      id: "charge", //
      label: "",
      value: CCC.charge,
      onClick: deleteCharge,
      onChange: changeCharge,
      statName: "Angriff:",
    },
    {
      id: "maneuver", //
      label: "",
      value: CCC.maneuver,
      onClick: deleteManeuver,
      onChange: changeManeuver,
      statName: "Manöver:",
    },
  ];

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
      <FormationsAndHordeCreator />

      <Grid
        container //
        item
        direction="row"
        alignItems="center" //
        justifyContent="center"
      >
        {inputElements.map((input, i) => (
          <Fragment key={input.id}>
            <CreatorTextInput
              id={input.id}
              value={input.value}
              onClick={input.onClick}
              onChange={input.onChange}
              label={input.statName}
              width={"7em"}
            />

            {i < 3 ? (
              <Typography
                variant="h3" //
                sx={{
                  color: "white", //
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
    </Grid>
  );
};

export default UnitMovementCreator;