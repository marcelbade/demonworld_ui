// React
import { Fragment } from "react";
//material
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
// components & functions
import { unitOrCmdCard } from "../../../shared/sharedFunctions";
// icons
import blackBowIcon from "../../../../icons/bow2.png";
import blackSwordIcon from "../../../../icons/sword2.png";
 

const RulesToolTip = withStyles({
  tooltip: {
    fontFamily: "gonjuring",
    fontSize: "20px",
    color: "white",
    backgroundColor: "black",
  },
})(Tooltip);

const useStyles = makeStyles({
  specialRules: {
    fontFamily: "Beryliumbold",
    paddingLeft: "0.5em",
  },
  Icon: {
    width: "1em",
    height: "1em",
  },
  skillBox: {
    marginLeft: "1em",
    flexWrap: "nowrap",
  },
  secondSkillIcon: {
    width: "1em",
    height: "1em",
    marginLeft: "1em",
  },
});

/**
 * Cut special rule to a max of 30 characters. If there is no rule, show "-".
 * @param {String} rule
 * @returns resized string or "-"
 */
export const renderSpecialRules = (rule) => {
  return (
    <RulesToolTip title={rule}>
      <p className="font-face-gonjuring">{rule.length === 0 ? "-" : "..."}</p>
    </RulesToolTip>
  );
};

// eslint-disable-next-line no-unused-vars
const renderDetailsPanel = (cardData, showTommysStuff) => {
  return (
    <Grid container>
      <Grid item xs={6}>
        {unitOrCmdCard(cardData)}
      </Grid>
      <Grid item xs={6}>
        {showTommysStuff ? tommysAnalysis(cardData) : null}
      </Grid>
    </Grid>
  );
};

//TODO: finish this function
export const tommysAnalysis = (cardData) => {
  //#############
  return <Grid container direction="column"></Grid>;
};

/**
 * Function that renders the correct icon for those unit stats that are booleans. For a Unit the function displays either a check mark or X icon,
 * for heroes  and commanders it shows  a "-".
 *
 * @param {boolean} flag
 * @returns Material UI icon or "-"
 */
export const renderBooleanAsIcon = (numberOfElements, flag) => {
  const SINGLE_ELEMENT = 1;

  if (numberOfElements !== SINGLE_ELEMENT) {
    return flag ? <CheckCircleOutlineIcon style={{ color: "black" }} /> : <CancelIcon style={{ color: "black" }} />;
  } else {
    return "-";
  }
};
/**
 * Function renders the hitpoint markers for the stat cards.
 *
 * @param {integer} hitpoints
 * @returns  String
 */
export const generateHitPoints = (hitpoints) => {
  let hitpointMarker = "";

  for (let i = 0; i < hitpoints; i++) {
    hitpointMarker = hitpointMarker + "[ ]";
  }
  return hitpointMarker;
};

/**
 * Function renders arcane markers for stat cards.
 *
 * @param {integer} arcana
 * @returns String
 */
export const renderMagicPoints = (arcana) => {
  let arcanaMarker = "";

  for (let i = 0; i < arcana; i++) {
    arcanaMarker = arcanaMarker + "/";
  }
  return arcanaMarker;
};
/**
 * Function renders  command stars for stat cards.
 *
 * @param {integer} stars
 * @returns String
 */
export const renderCommandPoints = (stars) => {
  let starIcons = "";

  for (let i = 0; i < stars; i++) {
    starIcons = starIcons + "*";
  }
  return starIcons;
};

/**
 * Function creates the html for the displayed unit card's special rule section.
 *
 * @param {unitCard} unit
 * @returns html containing the unit's special rule (if it has any), and optionally, the rules for any
 * pieces of equipment added to the unit.
 */
export const DisplayAllSpecialRules = (unit) => {
  const classes = useStyles();
  return (
    <Typography variant="body1" align="center" className={classes.specialRules}>
      {unit.specialRules === "" ? "Keine Besonderen Spielregeln" : unit.specialRules}
      {"equipment" in unit && unit.equipment.length !== 0
        ? unit.equipment.map((e) => {
            return (
              <Fragment>
                <hr></hr>
                <Typography variant="body1" className={classes.specialRules}>
                  {e.name}
                </Typography>
                <Typography>_______</Typography>
                <Typography variant="body1" className={classes.specialRules}>
                  {e.rule}
                </Typography>
              </Fragment>
            );
          })
        : null}
    </Typography>
  );
};

/**
 * Function renders the Skill part of the stat card display.
 * @param {unitCard rangeSkill property} rangeSkill
 * @param {unitCard meleeSkill property} meleeSkill
 * @returns a JSX element with the unitCard melee and range skills displayed.
 */
export const RenderSkillValues = (rangeSkill, meleeSkill) => {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.skillBox}>
      {meleeSkill !== 0 ? (
        <Fragment>
          <img alt="NK-Fertigkeit" src={blackSwordIcon} className={classes.Icon} />
          <Typography variant="h6"> {meleeSkill} </Typography>
        </Fragment>
      ) : null}
      {rangeSkill !== 0 ? (
        <Fragment>
          <img alt="Fernkampffertigkeit" src={blackBowIcon} className={classes.secondSkillIcon} />
          <Typography variant="h6"> {rangeSkill} </Typography>
        </Fragment>
      ) : null}
    </Grid>
  );
};

export const DisplayUnitElements = (unit) => {
  const classes = useStyles();

  let specialElements = 0;
  if (unit.leader) {
    ++specialElements;
  }
  if (unit.standardBearer) {
    ++specialElements;
  }
  if (unit.musician) {
    ++specialElements;
  }

  let number = `${unit.numberOfElements - specialElements}`;
  let ending = unit.numberOfElements === 1 ? "Element" : "Elemente";

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={classes.skillBox}>
      <Typography variant="h6" className={classes.specialRules}>
        {unit.leader ? "Anführer / " : null}
        {unit.standardBearer ? "Standarte / " : null}
        {unit.musician ? "Musiker / " : null}
      </Typography>
      <Typography variant="h6" className={classes.specialRules}>
        {number}
      </Typography>
      <Typography variant="h6" className={classes.specialRules}>
        {ending}
      </Typography>
    </Grid>
  );
};



export const displayFormations = (unit) => {
  let formationString = "";

  if (unit.wedgeFormation) {
    formationString += "Ke";
  }
  if (unit.skirmishFormation) {
    formationString += "Pl";
  }
  if (unit.squareFormation) {
    formationString += "Ka";
  }
  if (unit.squareFormation) {
    formationString += "Horde";
  }

  formationString = formationString.replace(/([A-Z])/g, " $1").trim();

  return formationString;
};
