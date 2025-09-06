// React
import { useContext, useEffect } from "react";
// material ui
import { TextField, Grid2 as Grid, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
// constants
import { INPUT_TEXTS } from "../../../../../constants/textsAndMessages";
import { NONE } from "../../../../../constants/factions";

const ArmyListBoxHeader = () => {
  const AC = useContext(ArmyContext);

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
    <Stack
      direction="column"
      sx={{
        minWidth: "50em ",
        alignItems: "center",
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
                color: theme.color,
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
        </Grid>
      ))}
    </Stack>
  );
};

export default ArmyListBoxHeader;
