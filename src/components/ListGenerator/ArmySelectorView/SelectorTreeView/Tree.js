import React, { useEffect, useContext, useReducer } from "react";
// material ui
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// components and functions
import TreeUnitNode from "./TreeUnitNode";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import useTreeViewController from "../../../../customHooks/UseTreeViewController.js";
import { isSubFactionAlternativeAndSelected } from "../../../../util/utilityFunctions.js";
// context
import { AllyContext } from "../../../../contexts/allyContext.js";
import { ArmyContext } from "../../../../contexts/armyContext.js";
import { ValidationContext } from "../../../../contexts/validationContext.js";
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Tree = (props) => {
  const AC = useContext(ArmyContext);
  const VC = useContext(ValidationContext);
  const ALC = useContext(AllyContext);

  const validation = useArmyValidation();
  const controller = useTreeViewController();

  const UNIT = "unit";

  /**
   * The following is a contreived hack to have a forceUpdate function in a functional
   * component. ForceUpdate is a method in class component that immdiately forces a rerender.
   * This is the ONLY WORKING SOLUTION that rerenders all treeView items and correctly shows
   * disabled branches (see testForDisabledSubFaction).
   * https://legacy.reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
   */
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    forceUpdate();
  }, [JSON.stringify(AC.subFactionDTOs)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * useEffect resets the AC.subFactionDTOs array everytime the army list is validated.
   * The reset toggles the hasNoValidUnits flag for those sub factions where every unit has
   * been blocked by validation rules.
   */
  useEffect(() => {
    AC.setSubFactionDTOs(testForDisabledSubFaction());
  }, [JSON.stringify(VC.listValidationResults)]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function checks whether the tree displays the faction or the ally
   * and returns the correct DTOs.
   * @returns an array of SubFaction DTOs.
   */
  const selectCorrectDTOs = () => {
    return props.isFaction ? AC.subFactionDTOs : ALC.allySubFactionDTOs;
  };

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
        const validationResult = validation.returnValidationResult(UNIT, u, props.isFaction);
        if (!validationResult.valid) {
          blockedSubFactionUnits++;
        }
      });
      dto.hasNoValidUnits = blockedSubFactionUnits === dto.units.length;
    });

    return tempArray;
  };

  return (
    <SimpleTreeView
      aria-label="file system navigator" //
      defaultcollapseicon={<ExpandMoreIcon />}
      defaultexpandicon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
    >
      {selectCorrectDTOs().map((dto, i) => {
        // {AC.subFactionDTOs.map((dto, i) => {
        return isSubFactionAlternativeAndSelected(dto) ? (
          <TreeItem
            itemId={`${i}`} //
            label={dto.name}
            key={i}
            disabled={dto.hasNoValidUnits} //TODO  -> how to display if all units of sF are invalid?
            onClick={() => {
              controller.treeExpansionController([`${i}`]);
            }}
            sx={{ width: "20em" }}
          >
            {dto.units
              .sort((a, b) => a.unitName > b.unitName)
              // if unit has multiple card (werwolves, changelings,...) show only one
              .filter((u) => u.multiStateOrderNumber < 2)
              // map unitCard to validation object (unit + validation result)
              .map((u) => validation.returnValidationResult(UNIT, u, props.isFaction))
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
    </SimpleTreeView>
  );
};

export default Tree;
