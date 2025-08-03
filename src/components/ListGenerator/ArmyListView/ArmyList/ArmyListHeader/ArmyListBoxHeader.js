// React
import { Fragment, useContext, useEffect } from "react";
// material ui
import { TextField, Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import ContextHelpButton from "../../../../shared/ContextHelpButton";
// constants
import { INPUT_TEXTS, PUSH_MESSAGE_TYPES, VALIDATION } from "../../../../../constants/textsAndMessages";
import { NONE } from "../../../../../constants/factions";
// custom hooks
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import { SelectionContext } from "../../../../../contexts/selectionContext";

const ArmyListBoxHeader = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  // const VC = useContext(ValidationContext);
  const validation = useArmyValidation();

  const theme = useTheme();

  useEffect(() => {
    createDefaultArmyName();
  }, [AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeArmyName = (event) => {
    AC.setArmyName(event.target.value);
  };

  const changePlayerName = (event) => {
    AC.setPlayerName(event.target.value);
  };

  const changeTeamName = (event) => {
    AC.setTeamName(event.target.value);
  };
  const deletePlayerName = () => {
    AC.setPlayerName("");
  };
  const deleteTeamName = () => {
    AC.setTeamName("");
  };

  /**
   * Function creates a default name for the army list
   * by combining the faction name and the current date.
   */
  const createDefaultArmyName = () => {
    if (AC.selectedFactionName === NONE && AC.selectedFactionName === undefined) {
      return;
    }
    const currentDate = new Date();

    const year = currentDate.getFullYear();

    // add 1 to the month since it starts with 0
    const month = 1 + currentDate.getMonth();
    const dayOfMonth = currentDate.getDate();

    AC.setArmyName(`${AC.selectedFactionName} - ${dayOfMonth}.${month}.${year}`);
  };

  /**
   * Function checks, whether the list has an army commander (hero or leader with command >= 2).
   * If not, the entire list is flagged as invalid.
   * @param {[validationObject]} validation
   * @returns true, if the list passed the test.
   */
  const isArmyCommanderMissing = (validation) => {
    const result = validation.testArmySelectionAndRunValidation(SEC.selectedUnits, SEC.maxPointsAllowance);
    return !result.commanderIsPresent;
  };

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
      spacing={3}
      alignItems="flex-start"
      sx={{
        minWidth: "50em ",
      }}
    >
      {inputElements.map((inputElmnt, i) => (
        <Grid key={i}>
          <TextField
            sx={{
              paddingTop: "1em",
              paddingBottom: "1em",
              "& .MuiFormLabel-root": {
                fontFamily: "NotMaryKate",
                color: isArmyCommanderMissing(validation) //
                  ? theme.palette.errorColor
                  : theme.color,

                pading: "50px",
                width: "40em",
                fontSize: "20px",
              },
            }}
            id={inputElmnt.id}
            label={inputElmnt.label}
            value={inputElmnt.value}
            onClick={inputElmnt.onClick}
            onChange={inputElmnt.onChange}
            autoComplete="off"
            type="search"
            required
            variant="standard"
          />
          {inputElmnt.value === AC.armyName ? (
            <Fragment key={inputElmnt.value}>
              <ContextHelpButton
                isVisible={isArmyCommanderMissing(validation, inputElmnt.value)}
                message={VALIDATION.NO_COMMANDER_WARNING} //
                type={PUSH_MESSAGE_TYPES.ERROR}
              />
            </Fragment>
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
};

export default ArmyListBoxHeader;
