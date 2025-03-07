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
   * @returns an array of SubFaction DTOs.
   */
  const selectCorrectSubFactions = () => {
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
    let styleObj = { width: "20em" };

    if (isInValid) {
      styleObj = { ...styleObj, color: theme.palette.disabled };
    }

    return styleObj;
  };

  const transform = (units) => {
    return (
      units
        .sort((a, b) => a.unitName > b.unitName)
        // if unit has multiple card (werwolves, changelings,...) show only one
        .filter((u) => u.multiStateOrderNumber < 2)
        // map unitCard to validation object (unit + validation result)
        .map((u) => validation.createUnitObject(u, validation.validateList(SEC.selectedUnits, SEC.maxPointsAllowance)))
    );
  };

  return selectCorrectSubFactions().map((dto, i) =>
    isSubFactionAlternativeAndSelected(dto) ? (
      <TreeItem
        itemId={`${i}`} //
        label={dto.name}
        key={i}
        onClick={() => {
          controller.treeExpansionController([`${i}`]);
        }}
        sx={styleTreebranches(dto.hasNoValidUnits)}
      >
        {transform(dto.units).map((validationObj, j) => (
          <TreeUnitNode
            key={j} //
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
