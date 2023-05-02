// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
// functions and modules
import { DisplayAllSpecialRules, DisplayUnitElements, displayUnitCost } from "../compendiums/factionTable/depencies/factionTableFunctions";

const useStyles = makeStyles({
  cardBox: {
    border: "1px solid black",
    backgroundColor: "lightgrey",
    fontSize: "20px",
    tableLayout: "fixed",
    width: "30em",
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
  font: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
  },
  paddingLeft: {
    paddingLeft: "0.5em",
  },
  paddingRight: {
    paddingRight: "0.5em",
  },
});

const StatCardUnitBack = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - TITLE*/}
      <Grid item container justify="space-around" alignItems="center" direction="row">
        <Grid item xs={3} className={classes.paddingLeft}>
          <Typography variant="h6" align="left" className={classes.font}>
            {props.unit.faction}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className={classes.cardTitle}>
            {props.unit.unitName}
          </Typography>
        </Grid>
        <Grid item xs={3} className={classes.paddingRight}>
          <Typography variant="h6" align="right" className={classes.font}>
            {props.unit.subFaction}
          </Typography>
        </Grid>
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
