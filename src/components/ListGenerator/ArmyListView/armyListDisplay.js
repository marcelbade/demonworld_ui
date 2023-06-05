// React
import React, { useState, useContext, Fragment } from "react";
// Material UI
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, InputAdornment } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import SubFactionEntry from "./SubFactionEntry";
import { uuidGenerator } from "../../shared/sharedFunctions";

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
  const contextArmy = useContext(ArmyContext);

  const [errorMessage, setErrorMessage] = useState("");

  const changeMaximumPointValue = (event) => {
    contextArmy.setMaxPointsAllowance(event.target.value);

    // validate user input
    let isValid = new RegExp(/^[0-9]*$/).test(event.target.value);
    isValid ? setErrorMessage("") : setErrorMessage("Bitte nur Zahlen eingeben.");
  };



 
  /**
   * This creates the centre of the UI: the actual army list consisting of the selected units and the display of the maximum * army points.
   */
  return contextArmy ? (
    <Fragment>
      {/* <Grid item container justify="flex-end"> */}

      <List>
        {contextArmy.subfactions.map((sF) => (
          <SubFactionEntry subFaction={sF} key={uuidGenerator()} />
        ))}
      </List>
      {/* TOTAL SPENT POINTS */}
      <Typography className={classes.total}>Gesamtpunktzahl: {contextArmy.totalPointValue} / </Typography>
      {/* TOTAL POINT ALLOWANCE */}
      <TextField
        id="outlined-basic"
        autoComplete="off"
        value={contextArmy.maxPointsValue}
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
    </Fragment>
  ) : null;
};

export default ArmyListDisplay;
