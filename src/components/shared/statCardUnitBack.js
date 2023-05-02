// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// icons
// import SecurityIcon from "@material-ui/icons/Security";
// import Icon from "@material-ui/core/Icon";
// import SwordIcon from "./customIcons/blackSword.png";
// import BowIcon from "./customIcons/bow.jpg";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// components & functions
import { DisplayAllSpecialRules, displayUnitCost } from "../compendiums/factionTable/depencies/factionTableFunctions";
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

const StatCardUnitBack = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - title*/}
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
      {/* 2nd Row - black Stripe - movement*/}
      <Grid item container direction="row" className={classes.blackStripe}>
        <Typography variant="h6" className={classes.font}>
          {props.unit.leader ? "Anführer / " : null}
          {props.unit.standardBearer ? "Standarte / " : null}
          {props.unit.musician ? "Musiker" : null}
        </Typography>
        <Typography variant="h6" className={classes.font}>
          {props.unit.numberOfElements} {props.unit.numberOfElements === 1 ? "Element" : "Elemente"}
        </Typography>
      </Grid>
      <Grid item container direction="row">
        {/* 3rd Row special rules */}
        <Typography variant="h6" className={classes.font}>
          {DisplayAllSpecialRules(props.unit)}
        </Typography>
      </Grid>
      {/* 4rd Row - black Stripe #2 */}
      <Grid item container direction="row" className={classes.blackStripe}>
        <Typography variant="h6" className={classes.font}>
          {displayUnitCost(props.unit)} Punkte
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatCardUnitBack;
