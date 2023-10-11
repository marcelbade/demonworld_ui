// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { TextField, IconButton, Tooltip, Typography, Grid } from "@material-ui/core";
// icons
import HelpIcon from "@material-ui/icons/Help";
import CancelIcon from "@material-ui/icons/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { useEffect } from "react";
// constants
import { TOOLTIPS, VALIDATION } from "../../../../../constants/textsAndMessages";
import { NONE } from "../../../../../constants/factions";

const useStyles = makeStyles({});

const ArmyListBoxHeader = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

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

    if (AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined ) {
      const defaultArmyName = `${AC.selectedFactionName} - ${dayOfMonth}.${month}.${year}`;
      AC.setArmyName(defaultArmyName);
    }
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid container flexdirection="row" alignItems="center">
      {!AC.listValidationResults.commanderIsPresent ? (
        <TextField
          id="outlined-basic"
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
          id="outlined-basic"
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
            AC.setSelectedUnits([]);
          }}
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
      {!AC.listValidationResults.commanderIsPresent ? (
        <IconButton
          onClick={() => {
            AC.setValidationMessage(VALIDATION.NO_COMMANDER_WARNING);
            AC.setShowToastMessage(true);
          }}
        >
          <HelpIcon />
        </IconButton>
      ) : null}
    </Grid>
  );
};

export default ArmyListBoxHeader;
