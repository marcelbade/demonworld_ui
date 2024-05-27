// react
import React, { Fragment } from "react";
// components and functions
import ArmySelectorDropdown from "./ArmySelectorDropdown";
import AlternativeArmyListSelector from "./AlternativeArmyListSelection/AlternativeArmyListSelector";
import FactionTreeView from "./SelectorTreeView/FactionTreeView";

const ArmySelectionBox = () => {
  return (
    <Fragment>
      <ArmySelectorDropdown />
      <AlternativeArmyListSelector />
      <FactionTreeView />
    </Fragment>
  );
};

export default ArmySelectionBox;
