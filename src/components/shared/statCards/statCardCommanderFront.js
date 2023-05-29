// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// icons
import blackShieldIcon from "../../../icons/icons8-shield-black.png";
// components & functions
import {
  generateHitPoints,
  renderMagicPoints,
  renderCommandPoints,
  RenderSkillValues,
} from "../../compendiums/factionTable/depencies/factionTableFunctions";

import { Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  cardBox: {
    border: "1px solid black",
    borderCollapse: "collapse",
    backgroundColor: "lightgrey",
    fontFamily: "Beryliumbold",
    fontWeight: "bold",
    fontSize: "20px",
    GridLayout: "fixed",
    width: "28em",
  },

  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
    fontFamily: "Beryliumbold",
  },
  cardTitle: {
    wordSpacing: "100vw",
    flexWrap: "nowrap",
    
    fontWeight: "normal",
    fontSize: "30px",
    color: "red",
  },
  titelCenter: {
    flexWrap: "nowrap",
    fontFamily: "Beryliumbold",
  },

  fontRight: {
    fontFamily: "Beryliumbold",
    textAlign: "right",
  },
  fontLeft: {
    fontFamily: "Beryliumbold",
    textAlign: "Left",
  },
  Icon: {
    height: "1em",
    width: "1em",
  },
  alignIcons: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1em",
  },

  noWrap: {
    flexWrap: "nowrap",
  },
});

const StatCardCommanderFront = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - title*/}
      <Grid item container justify="space-around" direction="row">
        <Grid item xs={3}>
          <Typography variant="h6" align="center">
            {renderCommandPoints(props.unit.commandStars)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" align="center" className={classes.cardTitle}>
            {props.unit.unitName}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" align="center">
            {renderMagicPoints(props.unit.magic)}
          </Typography>
        </Grid>
      </Grid>
      {/* 2nd Row - black Stripe  - MOVEMENT / CONTROL AREA*/}
      <Grid item container justify="space-around" className={classes.unitCardStripe}>
        <Typography variant="h6" className={classes.fontLeft}>
          {props.unit.move} Bewegungspunkte
        </Typography>
        <Grid item className={classes.centerCell}></Grid>
        <Typography variant="h6" className={classes.fontRight}>
          Kontrollbereich: {props.unit.controlZone_OverRun}
        </Typography>
      </Grid>
      <Grid item container justify="center" className={classes.rangedWeapon}>
        {/* 3rd Row - RANGED WEAPONS  */}
        {props.unit.rangedWeapon !== "x" ? (
          <Typography variant="h6" align="right" className={classes.font}>
            {props.unit.rangedWeapon} {props.unit.rangedAttackStats}
          </Typography>
        ) : null}
      </Grid>{" "}
      {/* 4th & 5th Row - WEAPONS  */}
      <Grid item container direction="column">  
        <Grid item container justify="center">
          <Typography variant="h6" className={classes.font}>
            Waffe 1: {props.unit.weapon1}
          </Typography>
        </Grid>
        <Grid item container justify="center">
          <Typography variant="h6" className={classes.font}>
            {props.unit.weapon2 === 0 ? null : "Waffe 2: " + props.unit.weapon2}
          </Typography>
        </Grid>
      </Grid>
      {/* 6th Row - SIZE, ARMOR, SKILLS*/}
      <Grid item container alignItems="center" direction="row" className={classes.noWrap}>
        <Grid item container justify="center">
          <Typography variant="h6" className={classes.font}>
            Größe: {props.unit.unitSize}
          </Typography>
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <div className={classes.alignIcons}>
            <img alt="FK-Panzerung" src={blackShieldIcon} className={classes.Icon} />
          </div>
          <Typography variant="h6" className={classes.font}>
            {props.unit.armourRange}
          </Typography>
          <div className={classes.alignIcons}>
            <img alt="NK-Panzerung" src={blackShieldIcon} className={classes.Icon} />
          </div>
          <Typography variant="h6" className={classes.font}>
            {props.unit.armourMelee}
          </Typography>
        </Grid>
        <Grid item container direction="row" justify="center" className={classes.noWrap}>
          {RenderSkillValues(props.unit.skillRange, props.unit.skillMelee)}
        </Grid>
      </Grid>
      {/* 4rd Row - black Stripe #2 FEAR FACTOR */}
      <Grid item>
        <Typography variant="h6" align="center" className={classes.unitCardStripe}>
          Furchtfaktor: {props.unit.fear}
        </Typography>
      </Grid>
      {/* 5th Row - hit points */}
      <Grid item>
        <Typography variant="h6" align="center">
          {generateHitPoints(props.unit.hitpoints)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatCardCommanderFront;
