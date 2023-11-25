import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Grid, IconButton } from "@mui/material";
// icons
import HelpIcon from "@mui/icons-material/Help";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { ValidationContext } from "../../../../contexts/validationContext";
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";
import { SelectionContext } from "../../../../contexts/selectionContext";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";

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

const TreeUnitNode = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const VC = useContext(ValidationContext);
  const SEC = useContext(SelectionContext);
  const ALC = useContext(AlternativeListContext);
  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher(props.unit);

  /**
   * Function adds a selected unit and uses the custom UseUnitEnricher hook to add necessary information.
   * @param {unitCard object} unit
   */
  const addUnit = () => {
    let tempArray = [...SEC.selectedUnits];

    tempArray.push(enrichUnit(props.unit));
    SEC.setSelectedUnits(tempArray);

    validation.validateList(tempArray, SEC.maxPointsAllowance, AC.subFactions, ALC.armyHasAlternativeLists);
  };

  const displayValidNode = (isBlocked) => {
    return isBlocked ? classes.blockedLeafNode : classes.unblockedLeafNode;
  };
  const displayBttn = (isBlocked) => {
    return isBlocked ? classes.blockedBttn : classes.unblockedBttn;
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-around">
      <Grid xs={6} item container direction="column">
        <Typography variant="button" className={displayValidNode(!props.isValidUnit)}>
          {props.unit.unitName}
        </Typography>

        <Typography variant="button" className={classes.points}>
          {props.unit.points}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <IconButton
          //
          onClick={addUnit}
          disabled={!props.isValidUnit}
          className={displayBttn(props.isBlocked)}
          size="large"
        >
          <AddCircleOutlineIcon />
        </IconButton>
        {!props.isValidUnit ? (
          <IconButton
            onClick={() => {
              VC.setValidationMessage(props.blockMessage);
              VC.setShowToastMessage(true);
            }}
            size="large"
          >
            <HelpIcon />
          </IconButton>
        ) : null}
      </Grid>
    </Grid>
  );
};
export default TreeUnitNode;