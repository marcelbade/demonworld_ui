// React
import React, { Fragment, useState, useContext } from "react";
// Material UI
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, InputAdornment } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../contexts/armyContext";
import { uuidGenerator } from "../../shared/sharedFunctions";
import SubList from "./subList";

// TODO: remove unneeded styles
const useStyles = makeStyles({
  root: { fontFamily: "gonjuring" },
  list: { height: "70%", minHeight: "70%", maxHeight: "70%" },

  HeaderBox: {
    fontFamily: "notMaryKate",
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    width: "60%",
    borderBottom: "solid 4px black",
  },
  removeButton: {
    fontFamily: "notMaryKate",
    padding: "10px",
    marginLeft: "550px",
  },
  total: {
    fontFamily: "notMaryKate",
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
    fontFamily: "notMaryKate",
    "& .MuiTextField": {
      fontFamily: "notMaryKate",
    },
  },

  bottom: { bottom: "100px" },
  withinLimit: { color: "black" },
  exceeded: { color: "red" },
  subList: {
    textAlign: "end",
  },
});

const ArmyListDisplay = (props) => {
  const contextArmy = useContext(ArmyContext);

  const [MaximumPoints, setMaximumPoints] = useState(contextArmy.maxPointsValue);
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();

  const filterUnitsForSubFaction = (allUnits, subFaction) => {
    return allUnits.filter((u) => u.subFaction === subFaction);
  };

  const handleChange = (event) => {
    setMaximumPoints(event.target.value);
    let isValid = new RegExp(/^[0-9]*$/).test(event.target.value);

    isValid ? setErrorMessage("") : setErrorMessage("Bitte nur Zahlen eingeben.");
  };

  // Component creates the overall list structure. lists for the subFaction are done via the SubList component!
  return contextArmy  ? (
    <Fragment>
      <Grid container directiom="row" alignContent="center">
        <Typography className={classes.armyName}>{contextArmy.unitName}</Typography>
        <button
          className={classes.removeButton}
          variant="outlined"
          onClick={() => {
            props.clearList();
          }}
        >
          Liste löschen
        </button>
      </Grid>

      <List>
        {contextArmy.subfactions.map((subFaction) => (
          <ListItem key={uuidGenerator()}>
            <Grid container direction={"column"}>
              <Typography className={classes.HeaderBox}>{subFaction}</Typography>
              <SubList
                className={classes.subList}
                subFactionUnits={filterUnitsForSubFaction(contextArmy.addedUnits, subFaction)}
                subFactionName={subFaction}
              />
            </Grid>
          </ListItem>
        ))}
      </List>
      <Grid container directiom="row" alignContent="center">
        <Typography className={classes.total}>Gesamtpunktzahl: {contextArmy.totalPointValue} / </Typography>
        <TextField
          id="outlined-basic"
          autoComplete="off"
          value={MaximumPoints}
          InputProps={{
            style: {
              fontFamily: "notMaryKate",
              fontSize: "20px",
              fontWeight: "bold",
              pading: "50px",
              width: "130px",
            },
            endAdornment: <InputAdornment position="end">Punkte</InputAdornment>,
          }}
          onChange={handleChange}
          required
          error={Boolean(errorMessage)}
          helperText={errorMessage}
          // endAdornment={}
          variant="standard"
        />
      </Grid>
    </Fragment>
  ) : null;
};

export default ArmyListDisplay;
