// React
import React, { useContext, useState, useEffect } from "react";
// Material UI
import { Grid, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
// Icons
import CloseIcon from "@material-ui/icons/Close";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
// constants
import { GENERAL_ERRRORS, VALIDATION } from "../../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    padding: "2em",
  },

  button: {
    width: "15em",
    padding: "2em",
    height: "5em",
  },
  cardTest: {
    width: "100%",
  },
  errorIcon: {
    color: "red",
  },
  warningBox: {
    border: "red 0.2em solid ",
    borderRadius: "1em",
    marginBottom: "0.2em",
  },
});

const TournamentRulesMenu = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [buttonsOn, setButtonsOn] = useState("off");
  const [uniqueRuleOn, setUniqueRuleOn] = useState("off");
  const [disableInput, setDisableInput] = useState(false);

  const toggleTournamentRules = (event) => {
    setButtonsOn(event.target.value);
  };
  const toggleUniquesRule = (event) => {
    setUniqueRuleOn(event.target.value);
  };

  useEffect(() => {
    if (buttonsOn === "on") {
      setDisableInput(false);
    } else {
      setDisableInput(true);
    }
  }, [buttonsOn]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (uniqueRuleOn === "on") {
      AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, uniquesOnlyOnce: true });
    } else {
      AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, uniquesOnlyOnce: false });
    }
  }, [buttonsOn]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changeHeroPercentage = (event) => {
    AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, maxHeroValue: event.target.value });
    validate();
  };
  const changeNonUniqueMax = (event) => {
    AC.setTournamentOverrideRules({ ...AC.tournamentOverrideRules, nonUniqueMax: event.target.value });
    validate();
  };

  const validate = (event) => {
    let isValid = new RegExp(/^[0-9]*$/).test(event.target.value);
    isValid ? setErrorMessage("") : setErrorMessage(GENERAL_ERRRORS.ONLY_NUMBERS);
  };

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Turnierregeln</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={buttonsOn}
            onChange={toggleTournamentRules}
          >
            <FormControlLabel value="on" control={<Radio />} label="An" />
            <FormControlLabel value="off" control={<Radio />} label="Aus" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          value={AC.tournamentOverrideRules.maxHeroValue}
          disabled={disableInput}
          InputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "110px",
            },
            endAdornment: <InputAdornment position="end">Prozent</InputAdornment>,
          }}
          onChange={changeHeroPercentage}
          required
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          variant="standard"
        />
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          value={AC.tournamentOverrideRules.nonUniqueMax}
          disabled={disableInput}
          InputProps={{
            style: {
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "110px",
            },
            endAdornment: <InputAdornment position="end">Prozent</InputAdornment>,
          }}
          onChange={changeNonUniqueMax}
          required
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          variant="standard"
        />
      </Grid>
      <Grid item>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label"> {VALIDATION.NO_DUPLICATE_UNIQUES_MESSAGE}</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={uniqueRuleOn}
            onChange={toggleUniquesRule}
          >
            <FormControlLabel value="on" control={<Radio />} label="An" />
            <FormControlLabel value="off" control={<Radio />} label="Aus" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default TournamentRulesMenu;
