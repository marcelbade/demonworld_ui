// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const NameCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteName = () => {
    CCC.setUnitName("");
  };

  const changeName = (event) => {
    CCC.setUnitName(event.target.value);
  };

  return (
    <Grid
      container
      alignItems="center" //
      justifyContent="center"
      sx={{
        width: "max-content",
      }}
    >
      <CreatorTextInput
        id={"name"} //
        value={CCC.unitName}
        onClick={deleteName}
        onChange={changeName}
        adornment={"Name:"}
        valueColor="red"
      />
    </Grid>
  );
};

export default NameCreator;
