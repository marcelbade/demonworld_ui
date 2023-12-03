// React
import React, { useContext, useEffect } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { TextField, IconButton, Tooltip, Typography, Grid } from "@mui/material";
// icons
import HelpIcon from "@mui/icons-material/Help";
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { ValidationContext } from "../../../../../contexts/validationContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// constants
import { TOOLTIPS, VALIDATION } from "../../../../../constants/textsAndMessages";
import { NONE } from "../../../../../constants/factions";

const useStyles = makeStyles({});

const ArmyListBoxHeader = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const VC = useContext(ValidationContext);
  const SEC = useContext(SelectionContext);

  /**
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changeArmyName = (event) => {
    AC.setArmyName(event.target.value);
  };

  // Calculate date and create a default name for the army list.
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dayOfMonth = currentDate.getDate();

    if (AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined) {
      const defaultArmyName = `${AC.selectedFactionName} - ${dayOfMonth}.${month}.${year}`;
      AC.setArmyName(defaultArmyName);
    }
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container flexdirection="row" alignItems="center">
      {!VC.listValidationResults.commanderIsPresent ? (
        <TextField
          id="armyNameValid"
          autoComplete="off"
          value={AC.armyName}
          InputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "330px",
              color: "red",
            },
          }}
          onChange={changeArmyName}
          required
          variant="standard"
        />
      ) : (
        <TextField
          id="armyNameInvalid"
          autoComplete="off"
          value={AC.armyName}
          InputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "330px",
            },
          }}
          onChange={changeArmyName}
          required
          variant="standard"
        />
      )}
      <Tooltip title={<Typography className={classes.tooltipText}>{TOOLTIPS.DELETE_ARMY_LIST}</Typography>}>
        <IconButton
          className={classes.button}
          variant="outlined"
          onClick={() => {
            SEC.setSelectedUnits([]);
          }}
          size="large">
          <CancelIcon />
        </IconButton>
      </Tooltip>
      {!VC.listValidationResults.commanderIsPresent ? (
        <IconButton
          onClick={() => {
            VC.setValidationMessage(VALIDATION.NO_COMMANDER_WARNING);
            VC.setShowToastMessage(true);
          }}
          size="large">
          <HelpIcon />
        </IconButton>
      ) : null}
    </Grid>
  );
};

export default ArmyListBoxHeader;
