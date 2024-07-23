// React
import React, { useState, useContext, Fragment } from "react";
import { Typography, TextField, InputAdornment, Grid } from "@mui/material";
// components and functions
import { SelectionContext } from "../../../../../contexts/selectionContext";
import calculateScoutingFactor from "../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import useArmyValidation from "../../../../../customHooks/UseArmyValidation";
import usePointCostCalculator from "../../../../../customHooks/UsePointCostCalculator";
// constants
import { GENERAL_ERRRORS, STATS, TEXTS, INPUT_TEXTS } from "../../../../../constants/textsAndMessages";

const ArmyListBoxFooter = () => {
  const SEC = useContext(SelectionContext);

  const validation = useArmyValidation();
  const calculator = usePointCostCalculator();

  const [errorMessage, setErrorMessage] = useState("");

  let netPoints =
    SEC.selectedUnits !== undefined //
      ? calculator.calculateTotalArmyCost(SEC.selectedUnits)
      : 0;

  /**
   * Function allows the user to change the maximum point total for the army.
   * When this happens, the list must reevaluated, so the hook function validateList
   * is called.
   * @param {event object} event
   */
  const changeMaximumPointValue = (event) => {
    SEC.setMaxPointsAllowance(event.target.value);

    let isValid = new RegExp(/^[0-9]*$/).test(event.target.value);
    isValid ? setErrorMessage("") : setErrorMessage(GENERAL_ERRRORS.ONLY_NUMBERS);

    validation.validateList(SEC.selectedUnits, event.target.value);
  };

  return (
    <Fragment>
      <Grid container direction="column">
        <Grid container direction="row">
          <Typography variant="subtitle1">
            {INPUT_TEXTS.TOTAL_POINTS} {netPoints} /
          </Typography>
          <TextField
            id="totalPointValue"
            autoComplete="off"
            value={SEC.maxPointsAllowance}
            InputProps={{
              style: {
                fontSize: "20px",
                fontWeight: "bold",
                pading: "50px",
                width: "130px",
              },
              endAdornment: <InputAdornment position="end">{STATS.POINTS}</InputAdornment>,
            }}
            onChange={changeMaximumPointValue}
            required
            error={Boolean(errorMessage)}
            helperText={errorMessage}
            variant="standard"
          />
        </Grid>
        <Typography variant="subtitle1">
          {TEXTS.SCOUTING_FACTOR} {calculateScoutingFactor(SEC.selectedUnits ? SEC.selectedUnits : [])}
        </Typography>
      </Grid>
    </Fragment>
  );
};

export default ArmyListBoxFooter;
