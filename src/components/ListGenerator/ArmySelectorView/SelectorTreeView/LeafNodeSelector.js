import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { unitCardMultiSort } from "../../../shared/sharedFunctions";
import { StyledTreeItem } from "./StyledTreeItem";
import LeafNode from "./LeafNode";

const useStyles = makeStyles({
  node: {
    width: "110%",
    paddingBottom: "1em",
  },
});

/**
 * This element generates the leaf nodes in the TreeView. One leafNode == one unit. The leafNodes can be rendered in one of two states: blocked or default.
 * By default, the unit name, point cost and an "add" button are shown. If the unit is
 * blocked by the army's rule(s), this add button is disabled
 * and a tooltip with the reason for blocking it is shown on mouse hover.
 */
const LeafNodeSelector = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  const blockResults = props.showsFaction
    ? AC.listValidationResults.unitsBlockedbyRules
    : AC.listValidationResults.alliedUnitsBlockedbyRules;

  // no need for a useState hook - must be recalculated for every rerender!
  let blockedUnitNames = [];

  // collect all blocked units in one array
  blockResults.forEach((bR) => {
    blockedUnitNames.push(bR.unitBlockedbyRules);
  });

  /**
   * Find & return the reason the unit was blocked
   * @param {[*]} blockResults list
   * @param {String} name of the unit
   * @returns the block message as a String.
   */
  const findBlockMessage = (blockResults, name) => {
    let message;
    blockResults.forEach((singleResult) => {
      if (name === singleResult.unitBlockedbyRules) {
        message = singleResult.message;
      }
    });

    return message;
  };

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

    allUnitsOfSubFaction = unitCardMultiSort(allUnitsOfSubFaction);

    return allUnitsOfSubFaction;
  };

  /**
   *  Function creates a node ID. The node ID needs the node ID of a branch so the leafs are correctly allocated to one of the branches and a unique id for the leave itself.
   * @param {unitCard obj} unit
   * @returns an int number representing a node ID.
   */
  const createLeafNodeId = (unit) => {
    return `${props.parentNodeId}${AC.subFactions.indexOf(unit)}`;
  };

  return filterAndSortSubFaction().map((u) => {
    // unit blocked
    return blockedUnitNames.includes(u.unitName) ? (
      <LeafNode
        key={u.unitName}
        unit={u}
        isBlocked={true} //
        blockMessage={findBlockMessage(blockResults, u.unitName)}
      />
    ) : (
      // unit not blocked
      <StyledTreeItem
        key={u.unitName}
        className={classes.node}
        nodeId={createLeafNodeId(u)} //
        label={<LeafNode unit={u} isBlocked={false} />}
      ></StyledTreeItem>
    );
  });
};

export default LeafNodeSelector;
