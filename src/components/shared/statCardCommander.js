// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// icons
// import SecurityIcon from "@material-ui/icons/Security";
// import Icon from "@material-ui/core/Icon";
// import SwordIcon from "./customIcons/blackSword.png";
// import BowIcon from "./customIcons/bow.jpg";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// components & functions
import {
  generatHitPoints,
  renderMagicPoints,
  renderCommandPoints,
} from "../compendiums/factionTable/depencies/factionTableFunctions";
// clsx
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    fontFamily: "Beryliumbold",
    height: "100%",
    width: "100%",
    fontSize: "20px",
    fontWeight: "bold",
  },
  titleIcons: {
    height: "24px",
    width: "24px",
  },
  unitCardStripe: {
    fontFamily: "Beryliumbold",
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  cardBox: {
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    width: "60%",
    fontSize: "20px",
    "& p": { marginBottom: "0px", marginTop: "0px" },
  },
  cardSide: {
    backgroundColor: "lightgrey",
  },
  specialRules: {
    fontFamily: "Beryliumbold",
    paddingTop: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
    fontSize: "20px",
    "& p": { marginBottom: "0px", marginTop: "0px" },
  },
  cardTitle: {
    fontFamily: "notMaryKate",
    fontWeight: "normal",
    marginBottom: "0px",
    marginTop: "0px",
    textAlign: "center",
    fontSize: "40px",
    color: "red",
    borderWidth: "0px",
    "& .MuiGrid-item": { border: "none", padding: "0px", margin: "0px" },
  },
  cardSubfaction: {
    fontFamily: "Beryliumbold",
    marginLeft: "10px",
    marginRight: "10px",
  },
  divider: {
    backgroundColor: "white",
    maxWidth: "1%",
  },
});

const StatCardUnit = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      className={classes.cardBox}
    >
      {/* FRONTSIDE OF THE CARD */}
      <Grid
        container
        item
        xs={5}
        className={classes.cardSide}
        direction="column"
      >
        <Grid container item direction="row" justify="space-between">
          <Grid item xs={3}>
            <p className={classes.cardSubfaction}>
              {renderCommandPoints(props.rowData.commandStars)}
            </p>
          </Grid>
          <Grid container item xs={6} justify="center">
            <p className={classes.cardTitle}>{props.rowData.unitName}</p>
          </Grid>
          <Grid container item xs={3} justify="flex-end">
            <p className={classes.cardSubfaction}>
              {renderMagicPoints(props.rowData.magic)}
            </p>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          className={classes.unitCardStripe}
        >
          <p>
            B: {props.rowData.move} / A: {props.rowData.charge} / P:
            {props.rowData.skirmish}
          </p>
          <p>{props.rowData.hold_maneuvers} Manoever</p>
          <p>
            {props.rowData.wedgeFormation ? "Ke / " : null}
            {props.rowData.skirmishFormation ? "Pl / " : null}
            {props.rowData.squareFormation ? "Ka / " : null}
            {props.rowData.horde ? "Horde" : null}
          </p>
        </Grid>
        {props.rowData.rangedWeapon ? (
          <Grid container direction="row" justify="center">
            <p> {props.rowData.rangedWeapon} </p>
            <p> {props.rowData.rangedAttackStats} </p>
          </Grid>
        ) : null}
        <Grid container direction="row" justify="center">
          <p> Waffe 1: </p>
          <p> {props.rowData.weapon1} </p>
        </Grid>
        {props.rowData.weapon2 === 0 ? null : (
          <Grid container direction="row" justify="center">
            <p> Waffe 2: </p>
            <p>{props.rowData.weapon2} </p>
          </Grid>
        )}
        <Grid container direction="row" justify="space-around">
          <p> Groesse: {props.rowData.unitSize} </p>
          <p>
            Panzerung: {props.rowData.armourRange} / {props.rowData.armourMelee}{" "}
          </p>
        </Grid>
        {props.rowData.skillMelee && props.rowData.skillRange ? (
          <Grid container direction="row" justify="space-around">
            <p>
              Kampfgeschick:{" "}
              {props.rowData.skillRange ? props.rowData.skillRange + "/" : null}
              {props.rowData.skillMelee ? props.rowData.skillMelee : null}
            </p>
          </Grid>
        ) : null}
        <Grid
          container
          direction="row"
          justify="space-around"
          className={classes.unitCardStripe}
        >
          <p>Furchtfaktor: {props.rowData.fear}</p>
          <p>
            Moral: {props.rowData.moral2 ? props.rowData.moral2 : "-"}/
            {props.rowData.moral2 ? props.rowData.moral2 : "-"}
          </p>
        </Grid>
        <Grid container direction="row" justify="space-around">
          {generatHitPoints(props.rowData.hitpoints)}
        </Grid>
      </Grid>
      <Grid item xs={2} className={classes.divider}>
        {" "}
      </Grid>
      {/* BACKSIDE OF THE CARD */}
      <Grid
        className={classes.cardSide}
        container
        item
        xs={5}
        direction="column"
      >
        <Grid container item justify="space-between">
          <Grid item xs={3}>
            <p className={classes.cardSubfaction}>{props.rowData.faction}</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.cardTitle}>{props.rowData.unitName}</p>
          </Grid>
          <Grid item container xs={3} justify="flex-end">
            <p className={classes.cardSubfaction}>{props.rowData.subFaction}</p>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          className={classes.unitCardStripe}
        >
          <p>
            {props.rowData.leader ? "Anfuehrer / " : null}
            {props.rowData.standardBearer ? "Standarte / " : null}
            {props.rowData.musician ? "Musiker" : null}
          </p>
          <p>
            {props.rowData.numberOfElements}{" "}
            {props.rowData.numberOfElements === 1 ? "Element" : "Elemente"}
          </p>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          className={clsx(classes.specialRules, "font-face-gonjuring")}
        >
          <p>
            {props.rowData.specialRules.length === 0
              ? "Keine besonderen Spielregeln."
              : props.rowData.specialRules}{" "}
          </p>
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="space-around"
          className={classes.unitCardStripe}
        >
          <p>{props.rowData.points} Punkte</p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StatCardUnit;
