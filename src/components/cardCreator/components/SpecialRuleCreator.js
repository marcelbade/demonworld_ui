// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { CREATOR } from "../../../constants/textsAndMessages";

const SpecialRuleCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  /**
   * Function changes the special rule for ALL unitcards belonging to
   * the created unit. Is called by the onChange event.
   * @param {object} event
   */
  const changeSpecialRule = (event) => {
    let tempArray = [...CCC.unitCards];

    for (let i = 0; i < tempArray.length; i++) {
      tempArray[i].specialRules = event.target.value;
    }

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid
      container //
      sx={{
        alignItems: "center", //
        justifyContent: "flex-start",
        ...theme.palette.cardCreator.box,
      }}
    >
      <CreatorTextInput
        id={"specialRule"} //
        value={CCC.unitCards[0].specialRules}
        onChange={changeSpecialRule}
        label={CREATOR.SPECIALRULE}
        width={"100%"}
        maxRows={5}
      />
    </Grid>
  );
};

export default SpecialRuleCreator;
