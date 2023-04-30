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
import blackShieldIcon from "../customIcons/icons8-shield-black.png";

// components & functions
import {
  generateHitPoints,
  renderMagicPoints,
  renderCommandPoints,
  RenderSkillValues,
} from "../compendiums/factionTable/depencies/factionTableFunctions";
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
});

const StatCardCommanderFront = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.cardBox}>
      {/* 1st Row - title*/}
      <Grid item container direction="row" className={classes.cardSide}>
        <Typography className={classes.leftCell}>{renderCommandPoints(props.unit.commandStars)}</Typography>
        <Typography className={clsx(classes.centerCell, classes.cardTitle)}> {props.unit.unitName}</Typography>
        <Typography className={clsx(classes.cardBorder, classes.rightCell)}>{renderMagicPoints(props.unit.magic)}</Typography>
      </Grid>
      {/* 2nd Row - black Stripe  - movement*/}
      <Grid item className={classes.unitCardStripe}>
        <Typography variant="h6" align="left" className={classes.font}>
          {props.unit.move} Bewegungspunkte
        </Typography>
        <Typography variant="h6" align="right" className={classes.font}>
          Kontrollbereich: {props.unit.controlZone_OverRun}
        </Typography>
      </Grid>
      <Grid item>
        {/* 3rd Row - ranged weapons, special rules */}

        {props.unit.rangedWeapon !== "x" ? (
          <Typography>
            {props.unit.rangedWeapon} {props.unit.rangedAttackStats}
          </Typography>
        ) : (
          <Typography></Typography>
        )}
      </Grid>
      <Grid>
        <Typography variant="h6" className={classes.font}>
          Waffe 1: {props.unit.weapon1}
        </Typography>
      </Grid>
      <Grid item>
        <Typography>{props.unit.weapon2 === 0 ? null : "Waffe 2: " + props.unit.weapon2}</Typography>
      </Grid>
      <Grid item container direction="row">
        <Typography variant="h6" className={classes.font}>
          Größe: {props.unit.unitSize}
        </Typography>
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
        <Typography  variant="h6">{RenderSkillValues(props.unit.skillRange, props.unit.skillMelee)}</Typography>
      </Grid>
      {/* 4rd Row - black Stripe #2 */}

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



