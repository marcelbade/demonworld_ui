import React from "react";
// material ui
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// components and functions
import TreeUnitNode from "./TreeUnitNode";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import useTreeViewController from "../../../../customHooks/UseTreeViewController.js";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { isSubFactionAlternativeAndSelective } from "../../../../util/utilityFunctions.js";

const Tree = (props) => {
  const validation = useArmyValidation();
  const controller = useTreeViewController();

  const UNIT = "unit";

  const testForEmptySubFaction = (subfactionDTO) => {
    const numberOfUnits = subfactionDTO.units.length;

    const numberOfBlockedUnits = subfactionDTO.units
      .map((u) => validation.returnValidationResult(UNIT, u, true))
      .filter((obj) => !obj.valid).length;

    return numberOfUnits === numberOfBlockedUnits;
  };

  return (
    <TreeView
      aria-label="file system navigator" //
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
    >
      {props.subFactionDtoList.map((dto, i) => {
        return isSubFactionAlternativeAndSelective(dto) ? (
          <TreeItem
            nodeId={`${i}`} //
            label={dto.name}
            key={i}
            disabled={testForEmptySubFaction(dto)}
            onClick={() => controller.getNodeId([`${i}`])}
          >
            {dto.units.sort((a,b) => a.unitName > b.unitName)
              // if unit has multiple card (werwolves, changelings,...) show only one
              .filter((u) => u.multiStateOrderNumber < 2)
              // map unitCard to validation object (unit + validation result)
              .map((u) => validation.returnValidationResult(UNIT, u, true))
              .map((validationObj, i) => {
                return (
                  <TreeUnitNode
                    key={i} //
                    unit={validationObj.unit}
                    isValidUnit={validationObj.valid}
                    validationMessage={validationObj.validationMessage}
                  />
                );
              })}
          </TreeItem>
        ) : null;
      })}
    </TreeView>
  );
};

export default Tree;
