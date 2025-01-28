// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";

const NameCreator = () => {
  const CCC = useContext(CardCreationContext);

  const theme = useTheme();

  const deleteName = () => {
    CCC.setUnit({ ...CCC.unit, unitName: "" });
  };

  const changeName = (event) => {
    CCC.setUnit({ ...CCC.unit, unitName: event.target.value });
  };

  return (
    <Grid
      container
      alignItems="center" //
      justifyContent="center"
      sx={theme.palette.cardCreator.box}
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
