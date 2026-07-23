// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import CreatorTextInput from "./CreatorTextInput";
import { Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";

const NameCreator = () => {
  const CCC = useContext(CardCreationContext);

  const theme = useTheme();

  const deleteName = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].faction = "";

    CCC.setUnitCards(tempArray);
  };

  /**
   * Function changes the unitName for ALL unitcards belonging to
   * the created unit. Is called by the onChange event.
   * @param {object} event
   */
  const changeName = (event) => {
    let tempArray = [...CCC.unitCards];

    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i].unitName = event.target.value;
    }

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid
      container
      sx={{
        alignItems: "center", //
        justifyContent: "center",
        ...theme.palette.cardCreator.box,
      }}
    >
      <CreatorTextInput
        id={"name"} //
        value={CCC.unitCards[0].unitName}
        onClick={deleteName}
        onChange={changeName}
        label={CREATOR.UNIT_NAME}
      />
    </Grid>
  );
};

export default NameCreator;
