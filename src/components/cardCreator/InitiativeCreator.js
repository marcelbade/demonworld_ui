// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const InitiativeCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteInitiative = () => {
    CCC.setInitiative("");
  };

  const changeInitiative = (event) => {
    CCC.setInitiative(event.target.value);
  };

  return (
    <CreatorTextInput
      id={"Initiative"} //
      value={CCC.initiative}
      onClick={deleteInitiative}
      onChange={changeInitiative}
      adornment={"Initiative:"}
      width={"7em"}
    />
  );
};

export default InitiativeCreator;
