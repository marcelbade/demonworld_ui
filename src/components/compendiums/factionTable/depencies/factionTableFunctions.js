//material
import { makeStyles, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
// components & functions
import { unitOrCmdCard } from "../../../shared/sharedFunctions";
// constants
import { Grid } from "@material-ui/core";
import { Fragment } from "react";

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
    fontWeight: "bold",
  },

  itemRuleText: {
    fontFamily: "Beryliumbold",
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
  let starMarker = "";

  for (let i = 0; i < stars; i++) {
    starMarker = starMarker + "*";
  }
  return starMarker;
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
    <Typography variant="h6" align="center" className={classes.specialRules}>
      {unit.specialRules === "" ? "Keine Besonderen Spielregeln" : unit.specialRules}
      {"equipment" in unit && unit.equipment.length !== 0
        ? unit.equipment.map((e) => {
            return (
              <Fragment>
                <hr></hr>
                <Typography variant="body1" className={classes.specialRules}>
                  {e.name}
                </Typography>
                <Typography variant="body1" className={classes.itemRuleText}>
                  {e.rule}
                </Typography>
              </Fragment>
            );
          })
        : null}
    </Typography>
  );
};

export const renderSkillValues = (rangeSkill, meleeSkill) => {
  let result = rangeSkill !== 0 || meleeSkill !== 0 ? `Kampfgeschick: ${rangeSkill} / ${meleeSkill} ` : "";

  return result;
};

/**
 * Returns the total point cost for the unit + all equipment selected for it
 * @param {unitCard} unit
 * @returns total point cost for the unit + equipment
 */
export const displayUnitCost = (unit) => {
  if ("equipment" in unit && unit.equipment.length !== 0) {
    let pointTotal = 0;
    unit.equipment.forEach((pieceOfGear) => {
      pointTotal += pieceOfGear.points;
    });
    return unit.points + pointTotal;
  } else {
    return unit.points;
  }
};
