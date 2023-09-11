// React
import React, { useContext, useState } from "react";
// Material UI
import { Grid, FormControl, FormControlLabel, FormLabel, FormGroup, TextField, Switch, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
// Icons
import CancelIcon from "@material-ui/icons/Cancel";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
// constants
import { GENERAL_ERRRORS, TOURNAMENT_RULES } from "../../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    padding: "2em",
  },
  errorIcon: {
    color: "red",
  },
  enabledBttnText: {
    color: "black",
  },
  disbledBttnText: {
    color: "grey",
  },
});

const TournamentRulesMenu = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  const [errorMessage, setErrorMessage] = useState({
    maxHeroValue: "",
    maxNumber: "",
  });
  const [validInput, setValidInput] = useState({
    maxHeroValue: false,
    maxNumber: false,
  });

  const toggleAllButtons = (event) => {
    AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, enableOverride: event.target.checked });
  };

  const changeHeroPercentage = (event) => {
    AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, maxHeroValue: event.target.value });
    validate(event);
  };
  const changeMaxNumber = (event) => {
    AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, maxNumber: event.target.value });
    validate(event);
  };

  const enforceUniqueRule = (event) => {
    AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, uniquesOnlyOnce: event.target.checked });
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
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid>
        <IconButton onClick={() => {}}>
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <FormControl component="fieldset" variant="standard">
          <FormLabel component="legend">Turnierregeln</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Switch checked={AC.tournamentOverrideRules.enableOverride} onChange={toggleAllButtons} />} />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography className={AC.tournamentOverrideRules.enableOverride ? classes.enabledBttnText : classes.disbledBttnText}>
          {TOURNAMENT_RULES.MAX_POINTS_FOR_HERO}
        </Typography>
        <TextField
          id="outlined-basic"
          name="maxHeroValue"
          autoComplete="off"
          value={AC.tournamentOverrideRules.maxHeroValue}
          disabled={!AC.tournamentOverrideRules.enableOverride}
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
        <Typography className={AC.tournamentOverrideRules.enableOverride ? classes.enabledBttnText : classes.disbledBttnText}>
          {TOURNAMENT_RULES.HOW_MANY_TIMES}
        </Typography>
        <TextField
          id="outlined-basic"
          name="maxNumber"
          autoComplete="off"
          value={AC.tournamentOverrideRules.maxNumber}
          disabled={!AC.tournamentOverrideRules.enableOverride}
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
          <FormLabel
            className={AC.tournamentOverrideRules.enableOverride ? classes.enabledBttnText : classes.disbledBttnText}
            component="legend"
          >
            {TOURNAMENT_RULES.ENFORCE_UNIQUE_RULE}
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  disabled={!AC.tournamentOverrideRules.enableOverride} //
                  checked={AC.tournamentOverrideRules.uniquesOnlyOnce}
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
