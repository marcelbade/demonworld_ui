import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

//
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { uuidGenerator } from "../../shared/sharedFunctions";
import { StyledTreeItem } from "../dependencies/styledTreeItem";

const useStyles = makeStyles({
  treeNode: {
    backgroundColor: "white",
  },
  button: {
    fontFamily: "BreatheOfFire",
    color: "black",
    backgroundColor: "white",
    padding: "0 px",
  },
});

// Element generates the leaf nodes in the TreeView. One leafNode -> one unit.
const LeafNodes = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);
  const allUnitsOfSubFaction = props.units.filter((f) => f.subFaction === props.subFaction);

  const blockResults = contextArmy.blockedUnits.unitsBlockedbyRules;

  let blockedUnitNames = [];

  blockResults.forEach((blockedUnitObj) => {
    blockedUnitNames.push(blockedUnitObj.unitBlockedbyRules);
  });

  const findBlockMessage = (blockResults, name) => {
    let message;
    blockResults.forEach((singleResult) => {
      if (name === singleResult.unitBlockedbyRules) {
        message = singleResult.message;
      }
    });

    return message;
  };

  return allUnitsOfSubFaction.map((unit) => {
    const NODE_ID = `${props.parentNodeId}${contextArmy.subfactions.indexOf(unit)}`;

    return blockedUnitNames.includes(unit.unitName) ? (
      <Tooltip title={findBlockMessage(blockResults, unit.unitName)} key={uuidGenerator()}>
        <Grid container alignItems="center" key={uuidGenerator()}>
          <Grid item xs={9}>
            <p className={classes.treeNode}>{`${unit.unitName} - ${unit.points}`}</p>
          </Grid>
          <Grid item xs={3}>
            <IconButton
              disabled={true}
              className={classes.button}
              onClick={() => {
                contextArmy.selectUnit(unit);
              }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Tooltip>
    ) : (
      <Grid container alignItems="center" key={uuidGenerator()}>
        <Grid item xs={9}>
          <StyledTreeItem
            nodeId={NODE_ID}
            label={`${unit.unitName} - ${unit.points}`}
            className={classes.treeNode}
            key={uuidGenerator()}
          ></StyledTreeItem>
        </Grid>
        <Grid item xs={3}>
          <IconButton
            className={classes.button}
            onClick={() => {
              contextArmy.selectUnit(unit);
            }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  });
};

export default LeafNodes;
