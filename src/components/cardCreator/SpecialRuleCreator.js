// react
import React, { useContext } from "react";
// material ui
import { Grid,  } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const SpecialRuleCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteSpecialRule = () => {
    CCC.setSpecialRule("");
  };

  const changeSpecialRule = (event) => {
    CCC.setSpecialRule(event.target.value);
  };

  return (
    <Grid
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
        value={CCC.specialRule}
        onClick={deleteSpecialRule}
        onChange={changeSpecialRule}
        adornment={"Sonderregel"}
        width={"20em"}
        maxRows={5}
      />
    </Grid>
  );
};

export default SpecialRuleCreator;
