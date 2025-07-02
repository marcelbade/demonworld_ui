import React, { useEffect, useContext, useReducer } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
// components and functions
import TreeUnitNode from "./TreeUnitNode.js";
import useArmyValidation from "../../../../customHooks/UseArmyValidation.js";
import useTreeViewController from "../../../../customHooks/UseTreeViewController.js";
import { isSubFactionAlternativeAndSelected } from "../../../../util/utilityFunctions.js";
// context
import { AllyContext } from "../../../../contexts/allyContext.js";
import { ArmyContext } from "../../../../contexts/armyContext.js";
// icons
import { SelectionContext } from "../../../../contexts/selectionContext.js";

const TreeSubFactionBranch = (props, { children }) => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AllyContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const controller = useTreeViewController();

  const theme = useTheme();

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
   * @returns an array of SubFaction DTOs that either 
   * belong to the selected faction, or its ally.
   */
  const displayEitherSubFactionOrAlly = () => {
    return props.isFaction ? AC.subFactionDTOs : ALC.allySubFactionDTOs;
  };

  /**
   * Function styles the branches of the tree menu.
   * the branch gets the same style as the units,
   * if all units in the branch are disabled.
   * @param {boolean} isInValid
   * @returns object with css styles.
   */
  const styleTreebranches = (isInValid) => {
    let styleObj = { width: "30em" };

    if (isInValid) {
      styleObj = { ...styleObj, color: theme.palette.disabled };
    }

    return styleObj;
  };

  /**
   * Function sorts the units, makes sure that units with multiple 
   * unit stat cards are only displayed once in the tree and
   * validates every unit. Invalid units are displayed, but cannot be selected
   * and gain a button that displays a message detailing why it is invalid.  
   * @param {[unitCard]} units -
   * @returns an array of validation objects (see createValidationUnitObject function) 
   */
  const sortFilterValidate = (units) => {
    return (
      units
        .sort((a, b) => a.points > b.points)
        // if unit has multiple card (werwolves, changelings,...) show only one
        .filter((u) => u.multiStateOrderNumber < 2)
        // map unitCard to validation object (unit + validation result)
        .map((u) =>
          validation.createValidationUnitObject(
            u, //
            validation.testArmySelectionAndRunValidation(SEC.selectedUnits, SEC.maxPointsAllowance)
          )
        )
    );
  };

  return displayEitherSubFactionOrAlly().map((subFactionDTO, i) =>
    isSubFactionAlternativeAndSelected(subFactionDTO) ? (
      <TreeItem
        itemId={`${i}`} //
        label={subFactionDTO.name}
        key={i}
        onClick={() => {
          controller.treeExpansionController([`${i}`]);
        }}
        sx={styleTreebranches(subFactionDTO.hasNoValidUnits)}
      >
        {sortFilterValidate(subFactionDTO.units).map((validationObj, i) => (
          <TreeUnitNode
            key={i} //
            unit={validationObj.unit}
            isValidUnit={validationObj.valid}
            validationMessage={validationObj.validationMessage}
          />
        ))}
      </TreeItem>
    ) : null
  );
};

export default TreeSubFactionBranch;
