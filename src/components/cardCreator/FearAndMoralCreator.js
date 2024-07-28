// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
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
      sx={{
        width: "max-content",
      }}
    >
      <CreatorTextInput
        id={"Fear"} //
        value={CCC.fear}
        onClick={deleteFear}
        onChange={changeFear}
        adornment={"Fear"}
      />
      <CreatorTextInput
        id={"moral1"} //
        value={CCC.moral1}
        onClick={deleteMoral1}
        onChange={changeMoral1}
        adornment={"1. Moralwert"}
      />
      <CreatorTextInput
        id={"moral2"} //
        value={CCC.moral2}
        onClick={deleteMoral2}
        onChange={changeMoral2}
        adornment={"2. Moralwert"}
      />
    </Grid>
  );
};

export default FearAndMoralCreator;
