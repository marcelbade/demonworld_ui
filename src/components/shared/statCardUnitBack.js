// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// icons

import { DisplayAllSpecialRules, DisplayUnitElements, displayUnitCost } from "../compendiums/factionTable/depencies/factionTableFunctions";
// clsx
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  cardBox: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "lightgrey",
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    fontSize: "20px",
    tableLayout: "fixed",
    width: "inherit",
  },

  leftCell: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    paddingLeft: "5px",
    width: "30%",
  },
  centerCell: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    width: "40%",
  },
  rightCell: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    width: "30%",
    paddingRight: "5px",
  },
  cardBorder: {
    borderRight: "1px solid black",
  },
  blackStripe: {
    fontFamily: "Beryliumbold",
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  cardTitle: {
    fontFamily: "notMaryKate",
    fontWeight: "normal",
    marginBottom: "0px",
    marginTop: "0px",
    textAlign: "center",
    fontSize: "30px",
    color: "red",
    borderWidth: "0px",
  },
});

const StatCardUnitBack = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - TITLE*/}
      <Grid item container direction="row">
        <Typography variant="h6" align="left" className={classes.leftCell}>
          {props.unit.faction}
        </Typography>
        <Typography variant="h6" className={clsx(classes.centerCell, classes.cardTitle)}>
          {props.unit.unitName}
        </Typography>
        <Typography variant="h6" align="right" className={clsx(classes.cardBorder, classes.rightCell)}>
          {props.unit.subFaction}
        </Typography>
      </Grid>
      {/* 2nd Row - black Stripe - ELEMENTS */}
      <Grid item container direction="row" className={classes.blackStripe}>
        {DisplayUnitElements(props.unit)}
      </Grid>
      <Grid item container justify="center" direction="row">
        {/* 3rd Row  SPECIAL RULES*/}
        <Typography variant="h6">{DisplayAllSpecialRules(props.unit)}</Typography>
      </Grid>
      {/* 4rd Row - POINT COST */}
      <Grid>
        <Typography variant="h6" align="center" className={classes.blackStripe}>
          {displayUnitCost(props.unit)} Punkte
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatCardUnitBack;
