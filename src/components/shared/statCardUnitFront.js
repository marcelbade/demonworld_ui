// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components & functions
import {
  generateHitPoints,
  renderMagicPoints,
  renderCommandPoints,
  RenderSkillValues,
} from "../compendiums/factionTable/depencies/factionTableFunctions";
// icons
import blackShieldIcon from "../customIcons/icons8-shield-black.png";

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
    GridLayout: "fixed",
    width: "inherit",
  },
  movementCell: {
    textAlign: "left",
    fontFamily: "Beryliumbold",
  },
  leftCell: {
    paddingLeft: "0px",
    width: "30%",
    fontFamily: "Beryliumbold",
  },
  centerCell: {
    width: "40%",
    fontFamily: "Beryliumbold",
  },
  rightCell: {
    width: "30%",
    fontFamily: "Beryliumbold",
  },
  cardBorder: {
    borderRight: "1px solid black",
    fontFamily: "Beryliumbold",
  },
  spanCellTwo: {
    textAlign: "end",
    fontFamily: "Beryliumbold",
  },
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
    fontFamily: "Beryliumbold",
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
  maneuvers: {
    marginLeft: "2em",
  },
  sizeArmourSkill: {
    flexWrap: "nowrap",
  },
});

const StatCardUnitFront = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" className={classes.cardBox}>
      {/* 1st Row - title*/}
      <Grid item container direction="row">
        <Typography variant="h6" className={classes.leftCell}>
          {renderCommandPoints(props.unit.commandStars)}
        </Typography>
        <Typography variant="h6" className={clsx(classes.centerCell, classes.cardTitle)}>
          {props.unit.unitName}
        </Typography>
        <Typography variant="h6" className={clsx(classes.cardBorder, classes.rightCell)}>
          {renderMagicPoints(props.unit.magic)}
        </Typography>
      </Grid>
      {/* 2nd Row - black Stripe  - MOVEMENT / CONTROL AREA*/}
      <Grid item container direction="row" justify="center" className={classes.unitCardStripe}>
        <Typography variant="h6" className={classes.font}>
          B: {props.unit.move} / A: {props.unit.charge} / P:{props.unit.skirmish}
        </Typography>
        <Typography variant="h6" className={clsx(classes.font, classes.maneuvers)}>
          {props.unit.hold_maneuvers} Manöver
        </Typography>
        <Typography variant="h6" className={classes.font}>
          {props.unit.wedgeFormation ? "Ke / " : null}
          {props.unit.skirmishFormation ? "Pl / " : null}
          {props.unit.squareFormation ? "Ka / " : null}
          {props.unit.horde ? "Horde" : null}
        </Typography>
      </Grid>
      {/* 3rd Row - RANGED WEAPONS  */}
      <Grid item container direction="row" justify="center">
        {props.unit.rangedWeapon !== "x" ? (
          <Typography variant="h6" className={classes.font}>
            {props.unit.rangedWeapon} {props.unit.rangedAttackStats}
          </Typography>
        ) : null}
      </Grid>
      {/* 4th & 5th Row - WEAPONS  */}
      <Grid container direction="row" justify="center">
        <Typography variant="h6" className={classes.font}>
          Waffe 1: {props.unit.weapon1}
        </Typography>
      </Grid>
      <Grid container direction="row" justify="center">
        <Typography variant="h6" className={classes.font}>
          {props.unit.weapon2 === 0 ? null : "Waffe 2: " + props.unit.weapon2}
        </Typography>
      </Grid>
      {/* 6th Row - SIZE, ARMOR, SKILLS*/}
      <Grid item container alignItems="center" direction="row" className={classes.sizeArmourSkill}>
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
        <Grid item container direction="row" justify="center" className={classes.sizeArmourSkill}>
          {RenderSkillValues(props.unit.skillRange, props.unit.skillMelee)}
        </Grid>
      </Grid>
      {/* 7th Row - FEAR & MORAL */}
      <Grid container direction="row" justify="center" className={classes.unitCardStripe}>
        <Typography variant="h6" className={classes.font}>
          Furchtfaktor: {props.unit.fear}
        </Typography>
        <Typography variant="h6" className={classes.font}>
          Moral: {props.unit.moral1 ? props.unit.moral1 : "-"} / {props.unit.moral2 ? props.unit.moral2 : "-"}
        </Typography>
      </Grid>
      {/* 5th Row - HIT POINTS */}
      <Grid container direction="row">
        <Typography variant="h6" className={classes.font}>
          {generateHitPoints(props.unit.hitpoints)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StatCardUnitFront;
