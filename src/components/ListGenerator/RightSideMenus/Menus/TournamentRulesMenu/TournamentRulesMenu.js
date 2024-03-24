// React
import React, { useContext, useState } from "react";
// Material UI
import { Grid, FormControl, FormControlLabel, FormLabel, FormGroup, TextField, Switch, Typography, IconButton } from "@mui/material";
// Icons
import CancelIcon from "@mui/icons-material/Cancel";
// context
import { TournamentRulesContext } from "../../../../../contexts/tournamentRulesContext";
// constants
import { GENERAL_ERRRORS, TOURNAMENT_RULES } from "../../../../../constants/textsAndMessages";

const TournamentRulesMenu = () => {
  const TC = useContext(TournamentRulesContext);

  const ENABLED_BTTN_TEXT = {
    color: "black",
  };
  const DISBLED_BTTN_TEXT = {
    color: "grey",
  };

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

  const changeHeroPercentage = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, maxHeroValue: event.target.value });
    validate(event);
  };
  const changeMaxNumber = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, maxNumber: event.target.value });
    validate(event);
  };

  const enforceUniqueRule = (event) => {
    TC.setTournamentOverrideRules({ ...TC.tournamentOverrideRules, uniquesOnlyOnce: event.target.checked });
    validate(event);
  };

  const validate = (event) => {
    const regExResult = new RegExp(/^[0-9]*$/).test(event.target.value);

    setValidInput({ ...validInput, [event.target.name]: regExResult });
    validInput[event.target.name]
      ? setErrorMessage({ ...errorMessage, [event.target.name]: "" })
      : setErrorMessage({ ...errorMessage, [event.target.name]: GENERAL_ERRRORS.ONLY_NUMBERS });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      spacing={4}
      sx={{
        height: "100vh",
        width: "30vw",
        padding: "2em",
      }}
    >
      <Grid>
        <IconButton
          onClick={() => {
            TC.setShowTournamentRulesMenu(false);
          }}
          size="large"
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">{TOURNAMENT_RULES.TOURNAMENT_RULES}</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch //
                  id="toggleAllButtons"
                  checked={TC.tournamentOverrideRules.enableOverride}
                  onChange={toggleAllButtons}
                />
              }
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography //
          sx={TC.tournamentOverrideRules.enableOverride ? ENABLED_BTTN_TEXT : DISBLED_BTTN_TEXT}
        >
          {TOURNAMENT_RULES.MAX_POINTS_FOR_HERO}
        </Typography>
        <TextField
          id="maxHeroValue"
          name="maxHeroValue"
          autoComplete="off"
          value={TC.tournamentOverrideRules.maxHeroValue}
          disabled={!TC.tournamentOverrideRules.enableOverride}
          InputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "50px",
            },
          }}
          onChange={changeHeroPercentage}
          required
          error={Boolean(errorMessage.maxHeroValue)}
          helperText={errorMessage.maxHeroValue}
          variant="standard"
        />
      </Grid>
      <Grid item>
        <Typography sx={TC.tournamentOverrideRules.enableOverride ? ENABLED_BTTN_TEXT : DISBLED_BTTN_TEXT}>
          {TOURNAMENT_RULES.HOW_MANY_TIMES}
        </Typography>
        <TextField
          id="maxNumber"
          name="maxNumber"
          autoComplete="off"
          value={TC.tournamentOverrideRules.maxNumber}
          disabled={!TC.tournamentOverrideRules.enableOverride}
          InputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "50px",
            },
          }}
          onChange={changeMaxNumber}
          required
          error={Boolean(errorMessage.maxNumber)}
          helperText={errorMessage.maxNumber}
          variant="standard"
        />
      </Grid>
      <Grid item>
        <FormControl component="fieldset" variant="standard">
          <FormLabel sx={TC.tournamentOverrideRules.enableOverride ? ENABLED_BTTN_TEXT : DISBLED_BTTN_TEXT} component="legend">
            {TOURNAMENT_RULES.ENFORCE_UNIQUE_RULE}
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  id="toggleUniqueRule"
                  disabled={!TC.tournamentOverrideRules.enableOverride} //
                  checked={TC.tournamentOverrideRules.uniquesOnlyOnce}
                  onChange={enforceUniqueRule}
                />
              }
            />
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TournamentRulesMenu;
