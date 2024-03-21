import React, { useContext } from "react";
import {makeStyles} from "@material-ui/core";
import { Typography, Grid, IconButton } from "@mui/material";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// components and functions
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";
import { SelectionContext } from "../../../../contexts/selectionContext";
import ContextHelpButton from "../../../shared/ContextHelpButton";
import { PUSH_MESSAGE_TYPES } from "../../../../constants/textsAndMessages";

const useStyles = makeStyles((theme) => ({
  blockedLeafNode: {
    color: theme.palette.disabled,
  },
}));

const TreeUnitNode = (props) => {
  const classes = useStyles();
  const SEC = useContext(SelectionContext);
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

    validation.validateList(tempArray, SEC.maxPointsAllowance);
  };

  const displayValidNode = (isBlocked) => {
    return isBlocked ? classes.blockedLeafNode : null;
  };
  const displayBttn = (isBlocked) => {
    return isBlocked ? classes.blockedBttn : null;
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
          <ContextHelpButton
            message={props.validationMessage} //
            type={PUSH_MESSAGE_TYPES.ERROR}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};
export default TreeUnitNode;
