// React
import { useContext, useEffect, useState } from "react";
// Material UI
import { Grid2 as Grid, FormControl, FormControlLabel, FormLabel, FormGroup, TextField, Switch, Typography, Divider } from "@mui/material";
// components and functions
import ListDisplaySwitch from "../ListDisplaySwitch";
// context
import { TournamentRulesContext } from "../../../contexts/tournamentRulesContext";
// constants
import { GENERAL_ERRRORS, TOURNAMENT_RULES } from "../../../constants/textsAndMessages";
import { useTheme } from "@emotion/react";

const GameOptions = () => {
  const TC = useContext(TournamentRulesContext);
  const theme = useTheme();

  const ENABLED_BTTN_TEXT = {
    color: theme.palette.color,
  };

  // const DISBLED_BTTN_TEXT = {
  //   color: theme.palette.disabled,
  // };

  useEffect(() => {
    resetIfDisabled();
  }, [TC.tournamentOverrideRules.enableOverride]); // eslint-disable-line react-hooks/exhaustive-deps

  const [errorMessage, setErrorMessage] = useState({
    maxHeroValue: "",
    maxNumber: "",
  });
  const [validInput, setValidInput] = useState({
    maxHeroValue: false,
    maxNumber: false,
  });

  const toggleAllButtons = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, enableOverride: event.target.checked });
  };

  const resetIfDisabled = () => {
    if (!TC.tournamentOverrideRules.enableOverride) {
      TC.setTournamentOverrideRules({
        ...TC.tournamentOverrideRules, //
        maxHeroValue: 30,
        maxNumber: 2,
        uniquesOnlyOnce: true,
      });
    }
  };

  const changeHeroPercentage = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, maxHeroValue: event.target.value });
    validateInput(event);
  };
  const changeMaxNumber = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, maxNumber: event.target.value });
    validateInput(event);
  };

  const enforceUniqueRule = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, uniquesOnlyOnce: event.target.checked });
    validateInput(event);
  };

  const validateInput = (event) => {
    const regExResult = new RegExp(/^[0-9]*$/).test(event.target.value);

    setValidInput({ ...validInput, [event.target.name]: regExResult });
    validInput[event.target.name]
      ? setErrorMessage({ ...errorMessage, [event.target.name]: "" })
      : setErrorMessage({ ...errorMessage, [event.target.name]: GENERAL_ERRRORS.ONLY_NUMBERS });
  };

  return (
    <Grid
      container //
      direction="column"
      alignContent="flex-start"
      spacing={2}
    >
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend">
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.color,
            }}
          >
            {TOURNAMENT_RULES.TOURNAMENT_RULES}
          </Typography>
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch //
                id="toggleAllButtons"
                color="error"
                checked={TC.tournamentOverrideRules.enableOverride}
                onChange={toggleAllButtons}
              />
            }
          />
        </FormGroup>
      </FormControl>
      <Typography>{TOURNAMENT_RULES.MAX_POINTS_FOR_HERO}</Typography>
      <TextField
        id="maxHeroValue"
        name="maxHeroValue"
        autoComplete="off"
        value={TC.tournamentOverrideRules.maxHeroValue}
        onChange={changeHeroPercentage}
        disabled={!TC.tournamentOverrideRules.enableOverride}
        required
        error={Boolean(errorMessage.maxHeroValue)}
        helperText={errorMessage.maxHeroValue}
        variant="standard"
        sx={{ width: "5%" }}
      />

      <Typography sx={ENABLED_BTTN_TEXT}>{TOURNAMENT_RULES.HOW_MANY_TIMES}</Typography>
      <TextField
        id="maxNumber"
        name="maxNumber"
        autoComplete="off"
        value={TC.tournamentOverrideRules.maxNumber}
        onChange={changeMaxNumber}
        disabled={!TC.tournamentOverrideRules.enableOverride}
        required
        error={Boolean(errorMessage.maxNumber)}
        helperText={errorMessage.maxNumber}
        variant="standard"
        sx={{ width: "5%" }}
      />

      <FormControl component="fieldset" variant="standard">
        <FormLabel sx={ENABLED_BTTN_TEXT} component="legend">
          <Typography sx={ENABLED_BTTN_TEXT}>{TOURNAMENT_RULES.ENFORCE_UNIQUE_RULE} </Typography>
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                id="toggleUniqueRule"
                color="error"
                checked={TC.tournamentOverrideRules.uniquesOnlyOnce}
                onChange={enforceUniqueRule}
                disabled={!TC.tournamentOverrideRules.enableOverride}
              />
            }
          />
        </FormGroup>
      </FormControl>
      <Divider sx={{ marginTop: "5em", width: "100%" }} />
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.color,
        }}
      >
        PlatzhalterText :D
      </Typography>
      <ListDisplaySwitch bttnSize="medium" />
    </Grid>
  );
};

export default GameOptions;
