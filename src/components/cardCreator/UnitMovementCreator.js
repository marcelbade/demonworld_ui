// react
import React, { Fragment, useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
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
  ];

  return (
    <Grid
      container //
      alignItems="center" //
      justifyContent="center"
      sx={{
        width: "max-content",
      }}
    >
      {inputElements.map((input, i) => (
        <Fragment>
          <CreatorTextInput
            key={i} //
            id={input.id}
            value={input.value}
            onClick={input.onClick}
            onChange={input.onChange}
            adornment={input.statName}
            width={"7em"}
            backgroundColor={"black"}
          />
          <Typography variant="h3">/</Typography>
        </Fragment>
      ))}
    </Grid>
  );
};

export default UnitMovementCreator;
