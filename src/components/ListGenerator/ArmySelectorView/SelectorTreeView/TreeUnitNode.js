import React, { useContext } from "react";
// material ui
import { Typography, Grid, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// components and functions
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";
import ContextHelpButton from "../../../shared/ContextHelpButton";
//constants
import { PUSH_MESSAGE_TYPES } from "../../../../constants/textsAndMessages";
// contexts
import { SelectionContext } from "../../../../contexts/selectionContext";

const TreeUnitNode = (props) => {
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher(props.unit);

  const theme = useTheme();

  /**
   * Function adds a selected unit to the provided array, uses the custom UseUnitEnricher hook to add necessary information to it, and revalidates the the unit selection.
   * @param {unitCard object} unit
   */
  const addUnit = () => {
    let tempArray = [...SEC.selectedUnits];

    tempArray.push(enrichUnit(props.unit));
    SEC.setSelectedUnits(tempArray);

    validation.validateList(tempArray, SEC.maxPointsAllowance);
  };

  /**
   * Function checks whether the unit is valid according to the army's validation rules.
   * @param {boolean} isBlocked
   * @returns true, if unit is a valid choice
   */
  const displayValidNode = (isBlocked) => {
    return isBlocked ? { color: theme.palette.disabled } : null;
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
