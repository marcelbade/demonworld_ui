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
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      <CreatorTextInput
        id={"name"} //
        value={CCC.unitName}
        onClick={deleteName}
        onChange={changeName}
        adornment={"Name:"}
      />
    </Grid>
  );
};

export default NameCreator;
