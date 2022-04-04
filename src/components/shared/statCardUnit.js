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
import {
  generateHitPoints,
  renderMagicPoints,
  renderCommandPoints,
  renderSkillValues,
} from "../compendiums/factionTable/depencies/factionTableFunctions";
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
    width: "1800px",
    "& :hover": {
      backgroundColor: "lightgrey",
    },
  },
  leftCell: {
    width: "30%",
  },
  centerCell: {
    width: "40%",
  },
  rightCell: {
    width: "30%",
  },
  cardBorder: {
    borderRight: "1px solid black",
  },
  alignSpecialElements: {
    paddingLeft: "10px",
    textAlign: "start",
  },
  unitCardStripe: {
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

const StatCardUnit = (props) => {
  const classes = useStyles();

  return (
    <table className={classes.cardBox}>
      {/* 1st Row - title*/}
      <tr className={classes.cardSide}>
        {/* FS */}
        <td className={classes.leftCell}>{renderCommandPoints(props.rowData.commandStars)}</td>
        <td className={clsx(classes.centerCell, classes.cardTitle)}>{props.rowData.unitName}</td>
        <td className={clsx(classes.cardBorder, classes.rightCell)}>{renderMagicPoints(props.rowData.magic)}</td>
        {/* BS */}
        <td className={classes.leftCell}>{props.rowData.faction}</td>
        <td className={clsx(classes.centerCell, classes.cardTitle)}>{props.rowData.unitName}</td>
        <td className={clsx(classes.cardBorder, classes.rightCell)}>{props.rowData.subFaction}</td>
      </tr>
      {/* 2nd Row - black Stripe - movement*/}
      <tr className={clsx(classes.cardSide, classes.unitCardStripe)}>
        {/* FS */}
        <td className={clsx(classes.leftCell, classes.unitCardStripe)}>
          B: {props.rowData.move} / A: {props.rowData.charge} / P:{props.rowData.skirmish}
        </td>
        <td className={classes.unitCardStripe}>{props.rowData.hold_maneuvers} Manöver</td>
        <td className={classes.unitCardStripe}>
          {props.rowData.wedgeFormation ? "Ke / " : null}
          {props.rowData.skirmishFormation ? "Pl / " : null}
          {props.rowData.squareFormation ? "Ka / " : null}
          {props.rowData.horde ? "Horde" : null}
        </td>

        {/* BS */}
        <td colSpan={"2"} className={classes.alignSpecialElements}>
          {props.rowData.leader ? "Anführer / " : null}
          {props.rowData.standardBearer ? "Standarte / " : null}
          {props.rowData.musician ? "Musiker" : null}
        </td>
        <td className={classes.unitCardStripe}>
          {props.rowData.numberOfElements} {props.rowData.numberOfElements === 1 ? "Element" : "Elemente"}
        </td>
      </tr>
      <tr>
        {/* 3rd Row - ranged weapons, special rules */}
        {/* FS */}
        {props.rowData.rangedWeapon !== "x" ? (
          <td colSpan={"3"} className={classes.cardBorder}>
            {props.rowData.rangedWeapon} {props.rowData.rangedAttackStats}
          </td>
        ) : (
          <td colSpan={"3"} className={classes.cardBorder}></td>
        )}
        <td colSpan={"3"} rowSpan={"5"}>
          {props.rowData.specialRules.length === 0 ? "Keine besonderen Spielregeln." : props.rowData.specialRules}
        </td>
      </tr>
      <tr>
        <td colSpan={"3"} className={classes.cardBorder}>
          Waffe 1: {props.rowData.weapon1}
        </td>
      </tr>
      <tr>
        <td colSpan={"3"} className={classes.cardBorder}>
          {props.rowData.weapon2 === 0 ? null : "Waffe 2: " + props.rowData.weapon2}
        </td>
      </tr>
      <tr>
        <td className={classes.leftCell}>Größe: {props.rowData.unitSize}</td>
        <td className={classes.centerCell}></td>
        <td className={clsx(classes.cardBorder, classes.rightCell)}>
          Panzerung: {props.rowData.armourRange} / {props.rowData.armourMelee}{" "}
        </td>
      </tr>
      <tr>
        <td colSpan={"3"} className={classes.cardBorder}>
          {renderSkillValues(props.rowData.skillRange, props.rowData.skillMelee)}
        </td>
      </tr>
      {/* 4rd Row - black Stripe #2 */}
      {/* FS */}
      <tr>
        <td className={clsx(classes.leftCell, classes.unitCardStripe)}>Furchtfaktor: {props.rowData.fear}</td>
        <td className={clsx(classes.centerCell, classes.unitCardStripe)}></td>
        <td className={clsx(classes.rightCell, classes.unitCardStripe)}>
          Moral: {props.rowData.moral2 ? props.rowData.moral2 : "-"} / {props.rowData.moral2 ? props.rowData.moral2 : "-"}
        </td>
        {/* BS */}
        <td colSpan={"3"} className={classes.unitCardStripe}>
          {props.rowData.points} Punkte
        </td>
      </tr>
      {/* 5th Row - hit points */}
      <tr>
        <td colSpan={"3"} className={classes.cardBorder}>
          {generateHitPoints(props.rowData.hitpoints)}
        </td>
      </tr>
    </table>
  );
};

export default StatCardUnit;
