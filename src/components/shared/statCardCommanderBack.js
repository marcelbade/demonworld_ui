// React
import React from "react";
// Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// modules
import { DisplayAllSpecialRules, displayUnitCost } from "../compendiums/factionTable/depencies/factionTableFunctions";
// clsx
import clsx from "clsx";

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
  movementCell: {
    textAlign: "left",
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
  spanCellTwo: {
    textAlign: "end",
  },
  blackStripe: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
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

const StatCardCommanderBack = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - title*/}
      <Grid item container direction="row" className={classes.cardSide}>
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
      {/* 2nd Row - black stripe  - movement*/}
      <Grid item className={clsx(classes.cardSide, classes.blackStripe)}>
        <Grid item className={clsx(classes.spanCellTwo, classes.blackStripe)}></Grid>
        <Typography variant="h6" align="center" className={classes.blackStripe}>
          {props.unit.numberOfElements} {props.unit.numberOfElements === 1 ? "Element" : "Elemente"}
        </Typography>
      </Grid>
      <Grid>
        {/* 3rd Row   special rules */}
        <Grid item>{DisplayAllSpecialRules(props.unit)}</Grid>
      </Grid>
      {/* 4rd Row - black SGridipe #2 */}
      <Grid>
        <Typography variant="h6" align="center" className={classes.blackStripe}>
          {displayUnitCost(props.unit)} Punkte
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatCardCommanderBack;
