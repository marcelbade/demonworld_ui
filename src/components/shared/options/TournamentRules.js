// react
import { Fragment, useEffect, useState, useContext } from "react";
import { useTheme } from "@emotion/react";
// Material UI
import { FormControl, FormControlLabel, FormLabel, FormGroup, TextField, Switch, Typography } from "@mui/material";
// context
import { TournamentRulesContext } from "../../../contexts/tournamentRulesContext";
// constants
import { GENERAL_ERRRORS, OPTIONS } from "../../../constants/textsAndMessages";

const TournamentRules = () => {
  const theme = useTheme();
  const TC = useContext(TournamentRulesContext);

  const [errorMessage, setErrorMessage] = useState({
    maxHeroValue: "",
    maxNumber: "",
  });

  const [validInput, setValidInput] = useState({
    maxHeroValue: false,
    maxNumber: false,
  });

  useEffect(() => {
    resetIfDisabled();
  }, [TC.tournamentOverrideRules.enableOverride]); // eslint-disable-line react-hooks/exhaustive-deps

  const ENABLED_BTTN_TEXT = {
    color: theme.palette.color,
  };

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
    <Fragment>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend"></FormLabel>
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
      <Typography>{OPTIONS.MAX_POINTS_FOR_HERO}</Typography>
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

      <Typography sx={ENABLED_BTTN_TEXT}>{OPTIONS.HOW_MANY_TIMES}</Typography>
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
          <Typography sx={ENABLED_BTTN_TEXT}>{OPTIONS.ENFORCE_UNIQUE_RULE} </Typography>
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
    </Fragment>
  );
};

export default TournamentRules;
