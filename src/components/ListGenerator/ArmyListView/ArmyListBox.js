// React
import React, { useContext, Fragment } from "react";
// Material UI
// components and functions
import ArmyListBoxHeader from "./ArmyList/ArmyListHeader/ArmyListBoxHeader";
import { ArmyContext } from "../../../contexts/armyContext";
import ArmyListBoxCenter from "./ArmyList/ArmyListCenter/ArmyListBoxCenter";
import ArmyListBoxFooter from "./ArmyList/ArmyListFooter/ArmyListBoxFooter";

const ArmyListBox = () => {
  const AC = useContext(ArmyContext);


   // This creates the centre of the UI: the actual army list consisting of the selected units and the display of the maximum army points.
  return AC ? (
    <Fragment>
      <ArmyListBoxHeader />
      <ArmyListBoxCenter />
      <ArmyListBoxFooter />
    </Fragment>
  ) : null;
};

export default ArmyListBox;
