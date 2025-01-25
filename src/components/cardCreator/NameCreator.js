// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";

const NameCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteName = () => {
    CCC.setUnit({...CCC.unit, unitName: ""});
  };

  const changeName = (event) => {
    CCC.setUnit({...CCC.unit, unitName: event.target.value});
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
        label={CREATOR.UNIT_NAME}
      />
    </Grid>
  );
};

export default NameCreator;
