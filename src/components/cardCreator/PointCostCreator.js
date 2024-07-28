// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const PointCostCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deletePointCost = () => {
    CCC.setPointCost("");
  };

  const changePointCost = (event) => {
    CCC.setPointCost(event.target.value);
  };

  return (
    <CreatorTextInput
      id={"PointCost"} //
      value={CCC.pointCost}
      onClick={deletePointCost}
      onChange={changePointCost}
      adornment={"Punkte"}
    />
  );
};

export default PointCostCreator;
