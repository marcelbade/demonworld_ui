import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, IconButton } from "@material-ui/core";
// icons
import HelpIcon from "@material-ui/icons/Help";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";
import { calculateTotalPointCost } from "../../../shared/sharedFunctions";

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
  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher(props.unit);

  /**
   * Function adds a selected unit and uses the custom UseUnitEnricher hook to add necessary information.
   * @param {unitCard object} unit
   */
  const addUnit = () => {
    let tempArray = [...AC.selectedUnits];

    tempArray.push(enrichUnit(props.unit));
    AC.setSelectedUnits(tempArray);

    validation.validateList(tempArray, AC.maxPointsAllowance, AC.subFactions, AC.armyHasAlternativeLists);
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
          onClick={addUnit} //
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
