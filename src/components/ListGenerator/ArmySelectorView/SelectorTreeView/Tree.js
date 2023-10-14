import React, { useContext } from "react";
import PropTypes from "prop-types";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { TransitionComponent } from "./treeViewFunctions";
import LeafNodeSelector from "./LeafNodeSelector";
import { StyledTreeItem } from "./StyledTreeItem";

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const useStyles = makeStyles({
  branch: {
    width: "20em",
  },
  disabledBranch: {
    width: "20em",
    color: "grey",
  },
});

const Tree = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  /**
   * Function selects a list of all sub factions in the army or in it's ally.
   * If the army has alternative lists, the alternative list is
   * selected instead of the faction's list.
   * If a list of the army's sub faction is created,
   * the ally has to be removed from the array so it is not
   * displayed as one of the faction's sub faction in the tree.
   * @returns a list of all sub factions that can be found in the faction or in the allied faction
   */
  const selectsSubFactionList = () => {
    let subfactions;
    if (props.showsFaction && !AC.armyHasAlternativeLists) {
      subfactions = AC.subFactions.filter((f) => f !== AC.allyName);
    } else if (props.showsFaction && AC.armyHasAlternativeLists) {
      subfactions = AC.alternateListSubFactions.filter((f) => f !== AC.allyName);
    } else {
      subfactions = AC.allySubFactions;
    }

    return subfactions;
  };

  /**
   * Function marks a sub faction in the army selector tree view as empty (greyed out)
   * if all units in that subFaction are blocked by the validator. The function checks both faction and ally.
   * @param {[String]} subFaction
   * @returns true, if all units for a sub faction are blocked.
   */
  const isSubFactionEmpty = (subFaction) => {
    const validationResults = props.showsFaction //
      ? AC.listValidationResults.unitsBlockedbyRules
      : AC.listValidationResults.alliedUnitsBlockedbyRules;

    const blockedUnitNames = validationResults.map((b) => b.unitBlockedbyRules);
    const notBlockedUnits = AC.listOfAllFactionUnits.filter((u) => u.subFaction === subFaction && !blockedUnitNames.includes(u.unitName));

    return notBlockedUnits.length === 0;
  };

  /**
   * Function creates an ID for every node. The id must be larger than the root ID of 1, hence the offset.
   * @param {*} index of the subfaction in the array.
   * @returns int nodeID
   */
  const createNodeID = (index) => {
    const ID_OFFSET = 2;
    return `${ID_OFFSET}${index}`;
  };

  return selectsSubFactionList()
    .sort((a, b) => {
      return a > b;
    })
    .map((sF) => {
      return (
        <StyledTreeItem
          key={sF} //
          nodeId={createNodeID(selectsSubFactionList().indexOf(sF))}
          label={sF}
          className={
            isSubFactionEmpty(sF) //
              ? classes.disabledBranch
              : classes.branch
          }
        >
          <LeafNodeSelector
            // tree for army or ally?
            units={
              props.showsFaction //
                ? AC.listOfAllFactionUnits
                : AC.listOfAlliedUnits
            }
            showsFaction={props.showsFaction}
            subFaction={sF}
            nodeID={createNodeID(selectsSubFactionList().indexOf(sF))}
          />
        </StyledTreeItem>
      );
    });
};

export default Tree;
