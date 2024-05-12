// React
import React, { Fragment, useContext, useEffect } from "react";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// material ui
import { TextField, IconButton, Tooltip, Typography, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
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

  const theme = useTheme();

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

  const inputElements = [
    {
      id: "teamName", //
      label: INPUT_TEXTS.PLAYER_NAME,
      value: AC.playerName,
      onClick: deletePlayerName,
      onChange: changePlayerName,
    },
    {
      id: "teamName", //
      label: INPUT_TEXTS.TEAM_NAME,
      value: AC.teamName,
      onClick: deleteTeamName,
      onChange: changeTeamName,
    },
    {
      id: "teamName", //
      label: INPUT_TEXTS.ARMY_NAME,
      value: AC.armyName,
      onClick: null,
      onChange: changeArmyName,
    },
  ];

  return (
    <Grid
      container //
      direction="column"
      alignItems="flex-start"
    >
      {inputElements.map((element, i) => (
        <Grid item key={i}>
          <TextField
            sx={{
              paddingTop: "1em",
              paddingBottom: "1em",
              "& .MuiFormLabel-root": {
                fontFamily: "NotMaryKate",
                color: theme.palette.color,
              },
            }}
            id={element.id}
            label={element.label}
            value={element.value}
            onClick={element.onClick}
            onChange={element.onChange}
            autoComplete="off"
            type="search"
            required
            variant="standard"
            InputProps={{
              style: {
                fontFamily: "NotMaryKate",
                fontSize: "20px",
                color:
                  !VC.listValidationResults.commanderIsPresent && element.value === AC.armyName //
                    ? theme.palette.errorColor
                    : theme.color,
                pading: "50px",
                width: "330px",
              },
            }}
          />
          {element.value === AC.armyName ? (
            <Fragment key={element.value}>
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

              {!VC.listValidationResults.commanderIsPresent ? (
                <ContextHelpButton
                  message={VALIDATION.NO_COMMANDER_WARNING} //
                  type={PUSH_MESSAGE_TYPES.ERROR}
                />
              ) : null}
            </Fragment>
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
};

export default ArmyListBoxHeader;
