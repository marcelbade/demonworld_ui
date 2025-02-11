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
// icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SelectionContext } from "../../../../contexts/selectionContext.js";

const Tree = (props) => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const controller = useTreeViewController();

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
   * Function checks whether the tree displays the faction or the ally
   * and returns the correct DTOs.
   * @returns an array of SubFaction DTOs.
   */
  const selectCorrectDTOs = () => {
    return props.isFaction ? AC.subFactionDTOs : ALC.allySubFactionDTOs;
  };

  const testForDisabledSubFaction = (subFaction, invalidUnits) => {
    let tempObj = [...AC.subFactionDTOs];

    tempObj.forEach((dto) => {
      if (dto.name === subFaction) {
        const subFactionUnits = dto.units.map((u) => u.unitName);
        const invalidUnitNames = invalidUnits.map((iu) => iu.unitBlockedbyRules);
        const uniqueInvalidUnitNames = [...new Set(invalidUnitNames)];

        if (uniqueInvalidUnitNames.length !== 0) {
          const allInvalid =
            JSON.stringify(uniqueInvalidUnitNames.sort()) === //
            JSON.stringify(subFactionUnits.sort());

          dto.hasNoValidUnits = allInvalid;
        }
      }
    });

    AC.setSubFactionDTOs([...tempObj]);
  }; // END

  return (
    <SimpleTreeView
      aria-label="file system navigator" //
      defaultcollapseicon={<ExpandMoreIcon />}
      defaultexpandicon={<ChevronRightIcon />}
      expanded={controller.expansionValue}
    >
      {selectCorrectDTOs().map((dto, i) => {
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

              .map((u) =>
                validation.createUnitObject(
                  u,
                  props.isFaction, //
                  validation.validateList(SEC.selectedUnits, SEC.maxPointsAllowance)
                )
              )

              .map((validationObj, j) => {
                return (
                  <TreeUnitNode
                    key={j} //
                    unit={validationObj.unit}
                    isValidUnit={validationObj.valid}
                    validationMessage={validationObj.validationMessage}
                    testForDisabledSubFaction={testForDisabledSubFaction}
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
