import React, { useContext } from "react";
import PropTypes from "prop-types";
// Material UI

// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { TransitionComponent } from "../dependencies/treeViewFunctions";
import { uuidGenerator } from "../../shared/sharedFunctions";
import LeafNodes from "./LeafNodes";
import { createNodeID } from "../dependencies/nodeIdCreator";
import { StyledTreeItem } from "../dependencies/styledTreeItem";

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const Tree = (props) => {
  const contextArmy = useContext(ArmyContext);

  /**
   * Function creates a list. The ally name has to be removed from the array so it is not displayed as a army subFaction in the tree.
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

  const subfactions = createSubFactionList();

  const units = props.showsFaction ? contextArmy.units : contextArmy.alliedUnits;

  return subfactions
    .sort((a, b) => {
      return a > b;
    })
    .map((subF) => {
      const NODE_ID = createNodeID(subfactions.indexOf(subF));
      return (
        <StyledTreeItem key={uuidGenerator()} nodeId={NODE_ID} label={subF}>
          <LeafNodes units={units} subFaction={subF} nodeID={NODE_ID} />
        </StyledTreeItem>
      );
    });
};

export default Tree;
