import React, { useEffect, useContext, useReducer } from "react";
// material ui
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// components and functions
import TreeUnitNode from "./TreeUnitNode";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import useTreeViewController from "../../../../customHooks/UseTreeViewController.js";
import { isSubFactionAlternativeAndSelected } from "../../../../util/utilityFunctions.js";
// context
import { ValidationContext } from "../../../../contexts/validationContext.js";
import { ArmyContext } from "../../../../contexts/armyContext.js";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Tree = (props) => {
  const AC = useContext(ArmyContext);
  const VC = useContext(ValidationContext);

  const validation = useArmyValidation();
  const controller = useTreeViewController();

  /**
   * The following is a contreived hack to have a forceUpdate function in a functional
   * component. ForceUpdate is a method in class component that immdiately forces a rerender.
   * This is the ONLY WORKING SOLUTION that rerenders all treeView items and correctly shows
   * disabled branches (see testForDisabledSubFaction).
   */
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const UNIT = "unit";

  /**
   * useEffect resets the AC.subFactionDTOs array everytime the army list is validated.
   * The reset toggles the hasNoValidUnits flag for those sub factions where every unit has
   * been blocked by validation rules.
   */
  useEffect(() => {
    AC.setSubFactionDTOs(testForDisabledSubFaction());
  }, [JSON.stringify(VC.listValidationResults)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    forceUpdate();
  }, [JSON.stringify(AC.subFactionDTOs)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function tests wether all items of one type are blocked.
   * If so, the hasNoValidUnits lag is set to true and the branch is greyed out.
   * @param {item DTO} dto
   * @returns true, if the node must be disabled.
   */
  const testForDisabledSubFaction = () => {
    let tempArray = [...AC.subFactionDTOs];

    tempArray.forEach((dto) => {
      let blockedSubFactionUnits = 0;

      dto.units.forEach((u) => {
        const validationResult = validation.returnValidationResult(UNIT, u, props.isFactionNotAlly);
        if (!validationResult.valid) {
          blockedSubFactionUnits++;
        }
      });
      dto.hasNoValidUnits = blockedSubFactionUnits === dto.units.length;
    });

    return tempArray;
  };

  return (
    <TreeView
      aria-label="file system navigator" //
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
    >
      {AC.subFactionDTOs.map((dto, i) => {
        return isSubFactionAlternativeAndSelected(dto) ? (
          <TreeItem
            nodeId={`${i}`} //
            label={dto.name}
            key={i}
            disabled={dto.hasNoValidUnits}
            onClick={() => {
              controller.treeExpansionController([`${i}`]);
            }}
          >
            {dto.units
              .sort((a, b) => a.unitName > b.unitName)
              // if unit has multiple card (werwolves, changelings,...) show only one
              .filter((u) => u.multiStateOrderNumber < 2)
              // map unitCard to validation object (unit + validation result)
              .map((u) => validation.returnValidationResult(UNIT, u, props.isFactionNotAlly))
              .map((validationObj, j) => {
                return (
                  <TreeUnitNode
                    key={j} //
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
