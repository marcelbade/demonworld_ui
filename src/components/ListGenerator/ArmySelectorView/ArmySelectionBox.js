// react
import React, { Fragment } from "react";
// components and functions
import ArmySelectorDropdown from "./ArmySelectorDropdown";
import AlternativeArmyLists from "./AlternativeArmyListSelection/AlternativeArmyLists";
import FactionTreeView from "./SelectorTreeView/FactionTreeView";

const ArmySelectionBox = () => {
  return (
    <Fragment>
      <ArmySelectorDropdown />
      <AlternativeArmyLists />
      <FactionTreeView />
    </Fragment>
  );
};

export default ArmySelectionBox;
