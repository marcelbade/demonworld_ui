import React, { useContext } from "react";
// Material UI
import { Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { uuidGenerator, unitCardMultiSort } from "../../shared/sharedFunctions";
import { StyledTreeItem } from "./styledTreeItem";
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
  const contextArmy = useContext(ArmyContext);
  const blockResults = contextArmy.listValidationResults.unitsBlockedbyRules;

  // no need for a useState hook - must be recalculated for every rerender!
  let blockedUnitNames = [];

  // collect all blocked units in one array
  blockResults.forEach((blockedUnitObj) => {
    blockedUnitNames.push(blockedUnitObj.unitBlockedbyRules);
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
   * Functions filters the units down to the sub faction and sorts the result.
   * @returns sorted and filtered array of unitCard objects.
   */
  const filterAndSortSubFaction = () => {
    let allUnitsOfSubFaction = [];

    allUnitsOfSubFaction = props.units.filter((f) => f.subFaction === props.subFaction);
    allUnitsOfSubFaction = unitCardMultiSort(allUnitsOfSubFaction);

    return allUnitsOfSubFaction;
  };

  /**
   *
   * @returns Function creates a node ID. The node ID needs the node ID of a branch so the leafs are correctly allocated to one of the branches and a unique id for the leave itself.
   */
  const createLeafNodeId = (unit) => {
    return `${props.parentNodeId}${contextArmy.subfactions.indexOf(unit)}`;
  };

  return filterAndSortSubFaction().map((unit) => {
    // unit blocked
    return blockedUnitNames.includes(unit.unitName) ? (
      <Tooltip
        className={classes.node}
        title={<Typography variant="caption">{findBlockMessage(blockResults, unit.unitName)}</Typography>} //
        key={uuidGenerator()}
      >
        <div>
          <LeafNode unit={unit} isBlocked={true} />
        </div>
      </Tooltip>
    ) : (
      // unit not blocked
      <StyledTreeItem
        className={classes.node}
        nodeId={createLeafNodeId(unit)} //
        label={<LeafNode unit={unit} isBlocked={false} />}
        key={uuidGenerator()}
      ></StyledTreeItem>
    );
  });
};

export default LeafNodeSelector;
