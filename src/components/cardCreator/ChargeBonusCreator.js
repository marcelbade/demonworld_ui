// react
import React, { useContext } from "react";
// material ui
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const ChargeBonusCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteChargeBonus = () => {
    CCC.setChargeBonus("");
  };

  const changeChargeBonus = (event) => {
    CCC.setChargeBonus(event.target.value);
  };

  return (
    <CreatorTextInput
      id={"ChargeBonus"} //
      value={CCC.chargeBonus}
      onClick={deleteChargeBonus}
      onChange={changeChargeBonus}
      adornment={"Angriffsbonus:"}
      width={"7em"}
    />
  );
};

export default ChargeBonusCreator;
