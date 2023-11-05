import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
// components and functions
import { unitCardMultiSort } from "../../../shared/sharedFunctions";
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import TreeUnitNode from "./TreeUnitNode";

const useStyles = makeStyles({
  node: {
    width: "110%",
    paddingBottom: "1em",
  },
});

const TreeUnitNodeList = (props) => {
  const classes = useStyles();

  const validation = useArmyValidation();

  const [invalidUnitCount, setInvalidUnitCount] = useState(0);

  const FACTION = "faction";
  const UNIT = "unit";
  let numberOfUnits = 0;

  /**
   * Functions filters the units down to the sub faction and removes all additional stat cards for multi state units. Then, it sorts the result.
   * @returns sorted and filtered array of unitCard objects.
   */
  const filterAndSortSubFaction = () => {
    let allUnitsOfSubFaction = [];

    for (let i = 0; i < props.units.length; i++) {
      const unit = props.units[i];
      if (unit.subFaction === props.subFaction && (unit.multiStateOrderNumber === 1 || unit.multiStateOrderNumber === 0))
        allUnitsOfSubFaction.push(unit);
    }

    numberOfUnits = allUnitsOfSubFaction.length;
    allUnitsOfSubFaction = unitCardMultiSort(allUnitsOfSubFaction);

    return allUnitsOfSubFaction;
  };

  const allyOrFaction = () => {
    return props.tree.type === FACTION;
  };

  const testIfSubFactionEmpty = (validationObj) => {
    if (!validationObj.valid) {
      setInvalidUnitCount(invalidUnitCount + 1);
    }
    if (invalidUnitCount === numberOfUnits) {
      
    }

    return validationObj;
  };

  return filterAndSortSubFaction()
    .map((u) => validation.returnValidationResult(UNIT, u, allyOrFaction()))
    .map((validationObj, i) => {
      return (
        <TreeUnitNode
          key={i} //
          className={classes.node}
          unit={validationObj.unit}
          isValidUnit={validationObj.valid}
        />
      );
    });
};

export default TreeUnitNodeList;
