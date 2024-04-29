import React, { useState, useEffect, useContext } from "react";
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
// constants
import { NONE } from "../../../../constants/factions.js";

const Tree = (props) => {
  const AC = useContext(ArmyContext);
  const VC = useContext(ValidationContext);

  const [disabledSubFactions, setDisabledSubFactions] = useState([]);

  const validation = useArmyValidation();
  const controller = useTreeViewController();

  const UNIT = "unit";

  useEffect(() => {
    if (AC.selectedFactionName !== NONE) {
      const tempArray = Array(props.subFactionDtoList.length).fill(false);

      setDisabledSubFactions(tempArray);
      testForEmptySubFaction(props.subFactionDtoList, tempArray);
    }
  }, [VC.listValidationResults]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function tests wether all items of one type are blocked.
   * If so, the branch (item category) is shown as disabled (greyed out).
   * @param {item DTO} dto
   * @returns true, if the node must be disabled.
   */
  const testForEmptySubFaction = (subFactionDtoList, flagArray) => {
    let blockedSubFactionUnits = 0;

    //  all subfactions
    for (let i = 0; i < subFactionDtoList.length; i++) {
      const subFactionUnits = subFactionDtoList[i].units;
      const numberOfUnits = subFactionUnits.length;

      for (let j = 0; j < numberOfUnits; j++) {
        const validationResult = validation.returnValidationResult(UNIT, subFactionUnits[j], true);

        if (!validationResult.valid) {
          blockedSubFactionUnits++;
        }
      }
      flagArray[i] = blockedSubFactionUnits === numberOfUnits;
      blockedSubFactionUnits = 0;
    }

    setDisabledSubFactions(flagArray);
  };

  return (
    <TreeView
      aria-label="file system navigator" //
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
    >
      {props.subFactionDtoList.map((dto, i) => {
        return isSubFactionAlternativeAndSelected(dto) ? (
          <TreeItem
            nodeId={`${i}`} //
            label={dto.name}
            key={i}
            disabled={disabledSubFactions[i]}
            onClick={() => {
              controller.getNodeId([`${i}`]);
              testForEmptySubFaction(props.subFactionDtoList, disabledSubFactions);
            }}
          >
            {dto.units
              .sort((a, b) => a.unitName > b.unitName)
              // if unit has multiple card (werwolves, changelings,...) show only one
              .filter((u) => u.multiStateOrderNumber < 2)
              // map unitCard to validation object (unit + validation result)
              .map((u) => validation.returnValidationResult(UNIT, u, true))
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
