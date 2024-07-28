// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";


const HitpointCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteHitpoints = () => {
    CCC.setHitpoints("");
  };

  const changeHitpoints = (event) => {
    CCC.setHitpoints(event.target.value);
  };

  return (
    <CreatorTextInput
      id={"Hitpoints"} //
      value={CCC.hitpoints}
      onClick={deleteHitpoints}
      onChange={changeHitpoints}
      adornment={"Trefferpunkte"}
    />
  );
};

export default HitpointCreator;
