// React
import React, { useState, useContext, Fragment } from "react";
// Material UI
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, InputAdornment, Grid } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import ArmyListSubFactionEntry from "./ArmyList/ArmyListSubFactionEntry";
import { uuidGenerator } from "../../shared/sharedFunctions";
import calculateScoutingFactor from "../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";

// TODO: remove unneeded styles
const useStyles = makeStyles((theme) => ({
  HeaderBox: {
    fontSize: "20px",
    fontWeight: "bold",
    width: "60%",
    borderBottom: "solid 4px black", 
    marginBottom: "1em",
  },
  total: {
    fontSize: "20px",
    fontWeight: "bold",
    paddingRight: "5px",
    position: "relative",
    top: 3,
  },
  clearIcon: {
    width: "40px",
    height: "40px",
  },
  armyName: {
    fontSize: "30px",
  },
  bottom: { bottom: "100px" },
  withinLimit: { color: "black" },
  exceeded: { color: "red" },
}));

const ArmyListDisplay = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Function takes the user input for maximum point allowance, validates it, and sets the state.
   * @param {event object} event
   */
  const changeMaximumPointValue = (event) => {
    AC.setMaxPointsAllowance(event.target.value);

    let isValid = new RegExp(/^[0-9]*$/).test(event.target.value);
    isValid ? setErrorMessage("") : setErrorMessage("Bitte nur Zahlen eingeben.");
  };

  /**
   * This creates the centre of the UI: the actual army list consisting of the selected units and the display of the maximum * army points.
   */
  return AC ? (
    <Fragment>
      {/* <Grid item container justify="flex-end"> */}

      <List>
        {AC.subFactions.map((sF) => (
          <ArmyListSubFactionEntry subFaction={sF} key={uuidGenerator()} />
        ))}
      </List>
      {/* TOTAL SPENT POINTS +  TOTAL POINT ALLOWANCE*/}
      <Grid container direction="column">
        <Grid container direction="row">
          <Typography className={classes.total}>Gesamtpunktzahl: {AC.totalPointValue} / </Typography>
          <TextField
            id="outlined-basic"
            autoComplete="off"
            value={AC.maxPointsAllowance}
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
        <Typography className={classes.total}>Spähfaktor: {calculateScoutingFactor(AC.selectedUnits)}</Typography>
      </Grid>
    </Fragment>
  ) : null;
};

export default ArmyListDisplay;
