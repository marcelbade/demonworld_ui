// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const ManeuverCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteManeuver = () => {
    CCC.setManeuver("");
  };

  const changeManeuver = (event) => {
    CCC.setManeuver(event.target.value);
  };

  return (
    <CreatorTextInput
      id={"maneuver"} //
      value={CCC.maneuver}
      onClick={deleteManeuver}
      onChange={changeManeuver}
      adornment={"Manöver:"}
      width={"6em"}
      paddingLeft={"1em"}
    />
  );
};

export default ManeuverCreator;
