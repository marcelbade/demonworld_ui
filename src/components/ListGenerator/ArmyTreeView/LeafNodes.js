import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { uuidGenerator, unitCardMultiSort } from "../../shared/sharedFunctions";
import { StyledTreeItem } from "../dependencies/styledTreeItem";

const useStyles = makeStyles({
  button: {
    color: "black",
  },
  blockedLeafNode: {
    fontFamily: "NotMaryKate",
    color: "grey",
  },
  unblockedLeafNode: {
    fontFamily: "NotMaryKate",
    color: "black",
  },
});

/**
 * This element generates the leaf nodes in the TreeView. One leafNode == one unit. The leafNodes can be rendered in one of two states: blocked or default.
 * By default, the unit name, point cost and button and an "add" button are shown. If the unit is
 * blocked by the army's rule(s), the add button is disabled
 * and a tooltip with the reason for blocking it is shown on mouse hover.
 */
const LeafNodes = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  const blockResults = contextArmy.blockedUnits.unitsBlockedbyRules;

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
   * Generates a layouted label for the unblocked units.
   * @param {unit Object} unit
   * @returns jsx for the label
   */
  const generateLabel = (unit) => {
    return (
      <Grid container alignItems="center" direction="row">
        <Grid item sm={3} md={7}>
          <Typography variant="button" className={classes.unblockedLeafNode}>
            {unit.unitName}
          </Typography>
        </Grid>
        <Grid item xs={2} md={2}>
          <Typography variant="button" className={classes.unblockedLeafNode}>
            {unit.points}
          </Typography>
        </Grid>
        <Grid item xs={1} md={1}>
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
  };

  
  let allUnitsOfSubFaction = props.units.filter((f) => f.subFaction === props.subFaction);
  allUnitsOfSubFaction = unitCardMultiSort(allUnitsOfSubFaction);

  return allUnitsOfSubFaction.map((unit) => {
    const NODE_ID = `${props.parentNodeId}${contextArmy.subfactions.indexOf(unit)}`;

    // unit blocked
    return blockedUnitNames.includes(unit.unitName) ? (
      <Tooltip title={findBlockMessage(blockResults, unit.unitName)} key={uuidGenerator()}>
        <Grid container alignItems="center" key={uuidGenerator()}>
          <Grid container item xs={6} className={classes.blockedLeafNode}>
            <Grid item xs={9}>
              <Typography variant="button" className={classes.blockedLeafNode}>
                {unit.unitName}
              </Typography>
            </Grid>
            <Grid item xs={3} className={classes.treeNode}>
              <Typography variant="button" className={classes.blockedLeafNode}>
                {unit.points}
              </Typography>
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
      <StyledTreeItem nodeId={NODE_ID} label={generateLabel(unit)} key={uuidGenerator()}></StyledTreeItem>
    );
  });
};

export default LeafNodes;
