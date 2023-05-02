// React
import React from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// functions and modules
import { DisplayAllSpecialRules, displayUnitCost } from "../compendiums/factionTable/depencies/factionTableFunctions";

const useStyles = makeStyles({
  cardBox: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "lightgrey",
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    fontSize: "20px",
    tableLayout: "fixed",
    width: "30em",
  },
  font: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
  },

  blackStripe: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  cardTitle: {
   
    wordSpacing: "100vw",
    flexWrap: "nowrap",
    fontFamily: "notMaryKate",
    fontWeight: "normal",
    textAlign: "center",
    fontSize: "30px",
    color: "red",
  },
});

const StatCardCommanderBack = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - TITLE*/}
      <Grid item container justify="space-around" direction="row">
        <Grid item xs={3}>
          <Typography variant="h6" align="center" className={classes.font}>
            {props.unit.faction}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="center" className={classes.cardTitle}>
            {props.unit.unitName}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" align="center" className={classes.font}>
            {props.unit.subFaction}
          </Typography>
        </Grid>
      </Grid>

      {/* 2nd Row - black stripe  - ELEMENT*/}
      <Grid item>
        <Typography variant="h6" align="center" className={classes.blackStripe}>
          {props.unit.numberOfElements} {props.unit.numberOfElements === 1 ? "Element" : "Elemente"}
        </Typography>
      </Grid>
      <Grid>
        {/* 3rd Row   SPECIAL RULES */}
        <Grid item>{DisplayAllSpecialRules(props.unit)}</Grid>
      </Grid>
      {/* 4rd Row - POINT COSTS  */}
      <Grid>
        <Typography variant="h6" align="center" className={classes.blackStripe}>
          {displayUnitCost(props.unit)} Punkte
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatCardCommanderBack;
