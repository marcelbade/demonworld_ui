// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";

const SpecialRuleCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const deleteSpecialRule = () => {
    CCC.setUnit({ ...CCC.unit, specialRules: "" });
  };

  const changeSpecialRule = (event) => {
    CCC.setUnit({ ...CCC.unit, specialRules: event.target.value });
  };

  return (
    <Grid container alignItems="center" justifyContent="flex-start" sx={theme.palette.cardCreator.box}>
      <CreatorTextInput
        id={"specialRule"} //
        value={CCC.unit.specialRules}
        onClick={deleteSpecialRule}
        onChange={changeSpecialRule}
        label={CREATOR.SPECIALRULE}
        width={"max-content"}
        maxRows={5}
      />
    </Grid>
  );
};

export default SpecialRuleCreator;
