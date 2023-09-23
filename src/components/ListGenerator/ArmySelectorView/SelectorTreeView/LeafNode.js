import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
// icons
import HelpIcon from "@material-ui/icons/Help";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { enrichUnitCardObject } from "../../ListGeneratorFunctions";

const useStyles = makeStyles({
  textBlock: {
    width: "25em",
  },
  blockedLeafNode: {
    paddingRight: "0.5em",

    color: "grey",
  },
  unblockedLeafNode: {
    paddingRight: "0.5em",
  },
  points: {
    color: "grey",
  },

  unblockedBttn: {
    alignContent: "center",
    color: "black",
  },
  blockedBttn: {
    paddingLeft: "1em",
  },
});

const LeafNode = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  /**
   * Function adds a selected units to a the army list and adds 3 things:
   * - a unique ID, so the same unit can be selected more than once and all instances can be differentiated
   * - equipment slots so items can be added
   * - a loss counter for the loss calculator
   * @param {unitCard object} unit
   */
  const addUnit = (unit) => {
    AC.setSelectedUnits([...AC.selectedUnits, enrichUnitCardObject(unit)]);
  };

  const displayLeaf = (isBlocked) => {
    return isBlocked ? classes.blockedLeafNode : classes.unblockedLeafNode;
  };
  const displayBttn = (isBlocked) => {
    return isBlocked ? classes.blockedBttn : classes.unblockedBttn;
  };

  return (
    <Grid container direction="row" alignItems="center" justify="space-around">
      <Grid xs={6} item container direction="column">
        <Typography variant="button" className={displayLeaf(props.isBlocked)}>
          {props.unit.unitName}
        </Typography>

        <Typography variant="button" className={classes.points}>
          {props.unit.points}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <IconButton
          onClick={() => {
            addUnit(props.unit);
          }}
          disabled={props.isBlocked}
          className={displayBttn(props.isBlocked)}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        {props.isBlocked ? (
          <IconButton
            onClick={() => {
              AC.setValidationMessage(props.blockMessage);
              AC.setShowToastMessage(true);
            }}
          >
            <HelpIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};
export default LeafNode;
