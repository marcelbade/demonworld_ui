import React from "react";
// material ui
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
// components and functions
import useTreeViewController from "../../../../customHooks/UseTreeViewController.js";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeSubFactionBranch from "./TreeSubFactionBranch.js";

const UnitSelectionTree = (props) => {
  const controller = useTreeViewController();

  return props.tabValue === props.SHOW_ALLY ? (
    <SimpleTreeView
      aria-label="file system navigator" //
      defaultcollapseicon={<ExpandMoreIcon />}
      defaultexpandicon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
      sx={{
        height: "75em",
        overflowY: "auto",
      }}
    >
      <TreeSubFactionBranch
        isFaction={props.isFaction} //
      />
    </SimpleTreeView>
  ) : null;
};

export default UnitSelectionTree;
