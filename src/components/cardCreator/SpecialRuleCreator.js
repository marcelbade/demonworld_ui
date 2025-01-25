// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";

const SpecialRuleCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteSpecialRule = () => {
    CCC.setUnit({ ...CCC.unit, specialRules: "" });
  };

  const changeSpecialRule = (event) => {
    CCC.setUnit({ ...CCC.unit, specialRules: event.target.value });
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="flex-start"
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
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
