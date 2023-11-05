// React
import React, { useState, useContext, Fragment } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { Typography, TextField, InputAdornment, Grid } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import calculateScoutingFactor from "../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
// constants
import { GENERAL_ERRRORS, TEXTS } from "../../../../../constants/textsAndMessages";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import { calculateTotalPointCost } from "../../../../shared/sharedFunctions";
import { AlternativeListContext } from "../../../../../contexts/alternativeListContext";

// TODO: remove unneeded styles
const useStyles = makeStyles((theme) => ({
  total: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingRight: "5px",
    position: "relative",
    top: 3,
  },
  bottom: { bottom: "100px" },
  withinLimit: { color: "black" },
  exceeded: { color: "red" },
}));

const ArmyListBoxFooter = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();

  const [errorMessage, setErrorMessage] = useState("");

  let netPoints = SEC.selectedUnits ? calculateTotalPointCost(SEC.selectedUnits) : 0;

  /**
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changeMaximumPointValue = (event) => {
    SEC.setMaxPointsAllowance(event.target.value);

    let isValid = new RegExp(/^[0-9]*$/).test(event.target.value);
    isValid ? setErrorMessage("") : setErrorMessage(GENERAL_ERRRORS.ONLY_NUMBERS);

    validation.validateList(SEC.selectedUnits, event.target.value, AC.subFactions, ALC.armyHasAlternativeLists);
  };

  return (
    <Fragment>
      <Grid container direction="column">
        <Grid container direction="row">
          <Typography className={classes.total}>Gesamtpunktzahl: {netPoints} / </Typography>
          <TextField
            id="outlined-basic"
            autoComplete="off"
            value={SEC.maxPointsAllowance}
            InputProps={{
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                pading: "50px",
                width: "130px",
              },
              endAdornment: <InputAdornment position="end">Punkte</InputAdornment>,
            }}
            onChange={changeMaximumPointValue}
            required
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            variant="standard"
          />
        </Grid>
        <Typography className={classes.total}>
          {TEXTS.SCOUTING_FACTOR} {calculateScoutingFactor(SEC.selectedUnits ? SEC.selectedUnits : [])}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default ArmyListBoxFooter;
