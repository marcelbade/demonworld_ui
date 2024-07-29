// react
import React, { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const FearAndMoralCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteFear = () => {
    CCC.setFear("");
  };

  const changeFear = (event) => {
    CCC.setFear(event.target.value);
  };

  const deleteMoral1 = () => {
    CCC.setMoral1("");
  };

  const changeMoral1 = (event) => {
    CCC.setMoral1(event.target.value);
  };

  const deleteMoral2 = () => {
    CCC.setMoral2("");
  };

  const changeMoral2 = (event) => {
    CCC.setMoral2(event.target.value);
  };

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        marginTop: "1em", //
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      <CreatorTextInput
        id={"Fear"} //
        value={CCC.fear}
        onClick={deleteFear}
        onChange={changeFear}
        adornment={"Furchtfaktor"}
        width={"7em"}
      />
      <Grid
        item
        container
        direction="row"
        sx={{
          width: "max-content",
        }}
      >
        <CreatorTextInput
          id={"moral1"} //
          value={CCC.moral1}
          onClick={deleteMoral1}
          onChange={changeMoral1}
          adornment={"1. Moralwert"}
          width={"9em"}
        />
        <Typography variant="h3" sx={{ width: "1em" }}>
          /
        </Typography>
        <CreatorTextInput
          id={"moral2"} //
          value={CCC.moral2}
          onClick={deleteMoral2}
          onChange={changeMoral2}
          adornment={"2. Moralwert"}
          width={"9em"}
        />
      </Grid>
    </Grid>
  );
};

export default FearAndMoralCreator;
