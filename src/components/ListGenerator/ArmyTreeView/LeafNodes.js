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
  blockedLeafNode: {
    fontFamily: "NotMaryKate",
    color: "grey",
    backgroundColor: "white",
    padding: "0 px",
    fontSize: "14px",
  },
  unblockedLeafNode: {
    fontFamily: "NotMaryKate",
    color: "black",
    backgroundColor: "white",
    padding: "0 px",
    fontSize: "14px",
  },
});

/**
 * Element generates the leaf nodes in the TreeView. One leafNode == one unit. The leafNodes can be rendered in one of two states: blocked or default.
 * By default, the unit name, point cost and button and an "add" button are shown. If the unit is blocked by the army's rule, the add button is dusabled
 * and a tooltip with the reason for blocking it is shown on mouse hover.
 */
const LeafNodes = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);
  const allUnitsOfSubFaction = props.units.filter((f) => f.subFaction === props.subFaction);

  const blockResults = contextArmy.blockedUnits.unitsBlockedbyRules;

  // no need for useState - must be recalculated for every rerender
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
   * Generates a layouted label for the unblocked units.
   * @param {unit Object} unit
   * @returns jsx for the label
   */
  const generateLabel = (unit) => {
    return (
      <Grid container className={classes.unblockedLeafNode} direction="row">
        <Grid item xs={10}>
          {unit.unitName}
        </Grid>
        <Grid item xs={2}>
          {unit.points}
        </Grid>
      </Grid>
    );
  };

  return allUnitsOfSubFaction.map((unit) => {
    const NODE_ID = `${props.parentNodeId}${contextArmy.subfactions.indexOf(unit)}`;

    // unit blocked
    return blockedUnitNames.includes(unit.unitName) ? (
      <Tooltip title={findBlockMessage(blockResults, unit.unitName)} key={uuidGenerator()}>
        <Grid container alignItems="center" key={uuidGenerator()}>
          <Grid container item xs={9} className={classes.blockedLeafNode}>
            <Grid item  xs={9} className={classes.treeNode}>
              {unit.unitName}
            </Grid>
            <Grid item xs={3} className={classes.treeNode}>
              {unit.points}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <IconButton disabled={true} className={classes.button}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Tooltip>
    ) : (
    // unit not blocked
      <Grid container alignItems="center" key={uuidGenerator()}>
        <Grid item xs={9}>
          <StyledTreeItem nodeId={NODE_ID} label={generateLabel(unit)} className={classes.treeNode} key={uuidGenerator()}></StyledTreeItem>
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
