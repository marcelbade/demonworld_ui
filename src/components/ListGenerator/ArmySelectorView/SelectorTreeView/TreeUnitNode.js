import React, { useContext } from "react";
// material ui
import { Typography, Grid, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// components and functions
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";
import { SelectionContext } from "../../../../contexts/selectionContext";
import ContextHelpButton from "../../../shared/ContextHelpButton";
import { PUSH_MESSAGE_TYPES } from "../../../../constants/textsAndMessages";

// textBlock: {
//   width: "25em",
// },

// unblockedLeafNode: {
//   paddingRight: "0.5em",
// },

// unblockedBttn: {
//   alignContent: "center",
//   color: "black",
// },
// blockedBttn: {
//
// },

const TreeUnitNode = (props) => {
  const SEC = useContext(SelectionContext);
  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher(props.unit);
  const theme = useTheme();

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
    return isBlocked ? { color: theme.palette.disabled } : null;
  };
  const displayBttn = (isBlocked) => {
    return isBlocked ? { paddingLeft: "1em" } : null;
  };

  return (
    <Grid container direction="row" alignItems="center" justifyContent="space-around">
      <Grid xs={6} item container direction="column">
        <Typography variant="button" sx={displayValidNode(!props.isValidUnit)}>
          {props.unit.unitName}
        </Typography>

        <Typography variant="button">{props.unit.points}</Typography>
      </Grid>
      <Grid item xs={5}>
        <IconButton
          //
          onClick={addUnit}
          disabled={!props.isValidUnit}
          sx={displayBttn(props.isBlocked)}
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
