// react
import React, { useContext } from "react";
// material ui
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
    <CreatorTextInput
      id={"specialRule"} //
      value={CCC.specialRule}
      onClick={deleteSpecialRule}
      onChange={changeSpecialRule}
      adornment={"Sonderregel"}
      width={"20em"}
      maxRows={5}
    />
  );
};

export default SpecialRuleCreator;
