// React
import React, { useContext, useEffect } from "react";
import { TextField, IconButton, Tooltip, Typography, Grid } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { ValidationContext } from "../../../../../contexts/validationContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import ContextHelpButton from "../../../../shared/ContextHelpButton";
// constants
import { TOOLTIPS, VALIDATION } from "../../../../../constants/textsAndMessages";
import { NONE } from "../../../../../constants/factions";

const ArmyListBoxHeader = () => {
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

  /**
   * Function creates a default name for the army list
   * by combining the faction name and the current date.
   */
  const createDefaultArmyName = () => {
    if (AC.selectedFactionName !== NONE && AC.selectedFactionName !== undefined) {
      const currentDate = new Date();

      // add 1 to the month since it starts with 0
      const year = currentDate.getFullYear();
      const month = 1 + currentDate.getMonth();
      const dayOfMonth = currentDate.getDate();

      AC.setArmyName(`${AC.selectedFactionName} - ${dayOfMonth}.${month}.${year}`);
    }
  };

  useEffect(() => {
    createDefaultArmyName();
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
              fontFamily: "NotMaryKate",
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
              fontFamily: "NotMaryKate",
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
      <Tooltip title={<Typography>{TOOLTIPS.DELETE_ARMY_LIST}</Typography>}>
        <IconButton
          variant="outlined"
          onClick={() => {
            SEC.setSelectedUnits([]);
          }}
          size="large"
        >
          <CancelIcon />
        </IconButton>
      </Tooltip>
      {!VC.listValidationResults.commanderIsPresent ? <ContextHelpButton message={VALIDATION.NO_COMMANDER_WARNING} /> : null}
    </Grid>
  );
};

export default ArmyListBoxHeader;
