// react
import React from "react";
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelection/AlternativeArmyListSelector";
import FactionTreeView from "./SelectorTreeView/FactionTreeView";
import { Box } from "@mui/material";
import ArmySelectorDropdown from "./ArmySelectorDropdown";

const ArmySelectionBox = () => {
  return (
    <Box>
      <AlternativeArmyListSelector />
      <FactionTreeView />
    </Box>
  );
};

export default ArmySelectionBox;
