import React, { useContext } from "react";
import PropTypes from "prop-types";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { TransitionComponent } from "./treeViewFunctions";
import { uuidGenerator } from "../../../shared/sharedFunctions";
import LeafNodeSelector from "./LeafNodeSelector";

import { StyledTreeItem } from "./StyledTreeItem";
import { ARMY_ALTERNATIVES_LIST_MAPPER, ZWERGE } from "../../../../constants/factions";

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
});

const Tree = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  /**
   * Function creates a list of all sub factions of the army. The ally name has to be removed from the array so it is not displayed as an army sub faction in the tree.
   * @returns
   */
  const createSubFactionList = () => {
    let subfactions;
    if (props.showsFaction) {
      subfactions = contextArmy.subfactions.filter((f) => f !== contextArmy.allyName);
    } else {
      subfactions = contextArmy.allySubFactions;
    }

    return subfactions;
  };

  const alternateListSelectionFilter = (subFaction) => {
    if (contextArmy.armyHasAlternativeLists) {
      const tempArray = [...ARMY_ALTERNATIVES_LIST_MAPPER[contextArmy.selectedFactionName]];
      const choice = tempArray.indexOf(contextArmy.selectedAlternativeList);
      tempArray.splice(choice, 1);

      if (contextArmy.selectedFactionName === ZWERGE) {
        const secondChoice = tempArray.indexOf(contextArmy.secondDwarvenOption);
        tempArray.splice(secondChoice, 1);
      }

      return !tempArray.includes(subFaction);
    }
    return true;
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

  return createSubFactionList()
    .sort((a, b) => {
      return a > b;
    })
    .filter((subFaction) => alternateListSelectionFilter(subFaction))
    .map((subFaction) => {
      return (
        <StyledTreeItem
          key={uuidGenerator()} //
          nodeId={createNodeID(createSubFactionList().indexOf(subFaction))}
          label={subFaction}
          className={classes.branch}
        >
          <LeafNodeSelector
            // tree for army or ally?
            units={props.showsFaction ? contextArmy.listOfAllFactionUnits : contextArmy.listOfAllAlliedUnits}
            subFaction={subFaction}
            nodeID={createNodeID(createSubFactionList().indexOf(subFaction))}
          />
        </StyledTreeItem>
      );
    });
};

export default Tree;
