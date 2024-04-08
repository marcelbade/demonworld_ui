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
import { INPUT_TEXTS, PUSH_MESSAGE_TYPES, TOOLTIPS, VALIDATION } from "../../../../../constants/textsAndMessages";
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
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changePlayerName = (event) => {
    AC.setPlayerName(event.target.value);
  };

  /**
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changeTeamName = (event) => {
    AC.setTeamName(event.target.value);
  };
  const deletePlayerName = (event) => {
    AC.setPlayerName("");
  };
  const deleteTeamName = (event) => {
    AC.setTeamName("");
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
      <TextField
        sx={{
          "& .MuiFormLabel-root": {
            fontFamily: "NotMaryKate",
          },
        }}
        id="playerName"
        autoComplete="off"
        label={INPUT_TEXTS.PLAYER_NAME}
        type="search"
        value={AC.playerName}
        InputProps={{
          style: {
            fontFamily: "NotMaryKate",
            fontSize: "20px",
            color: "lightgrey",

            pading: "50px",
            width: "330px",
          },
        }}
        onClick={deletePlayerName}
        onChange={changePlayerName}
        required
        variant="standard"
      />
      <TextField
        sx={{
          "& .MuiFormLabel-root": {
            fontFamily: "NotMaryKate",
          },
        }}
        id="teamName"
        label={INPUT_TEXTS.TEAM_NAME}
        type="search"
        autoComplete="off"
        value={AC.teamName}
        InputProps={{
          style: {
            fontFamily: "NotMaryKate",
            color: "lightgrey",
            fontSize: "20px",

            pading: "50px",
            width: "330px",
          },
        }}
        onClick={deleteTeamName}
        onChange={changeTeamName}
        required
        variant="standard"
      />

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
          sx={{
            "& .MuiFormLabel-root": {
              fontFamily: "NotMaryKate",
            },
          }}
          id="armyNameInvalid"
          label={INPUT_TEXTS.ARMY_NAME}
          type="search"
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
      {!VC.listValidationResults.commanderIsPresent ? ( //
        <ContextHelpButton
          message={VALIDATION.NO_COMMANDER_WARNING} //
          type={PUSH_MESSAGE_TYPES.ERROR}
        />
      ) : null}
    </Grid>
  );
};

export default ArmyListBoxHeader;
