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
   * Function selects a list of all sub factions of the army - either the faction's list or that of it's ally. If the army has alternative lists, the alternative lit is selected instead of thej faction's list. The ally name has to be removed from the array so it is not displayed as an army sub faction in the tree.
   * @returns
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

  const isSubFactionEmpty = (subFaction) => {
    return (
      AC.listOfAllFactionUnits.filter((f) => f.subFaction === subFaction).length === 0 &&
      AC.listOfAlliedUnits.filter((f) => f.subFaction === subFaction).length === 0
    );
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
          key={uuidGenerator()} //
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
