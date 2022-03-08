//material

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
//icons
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
// components & functions
import StatCardCommander from "../../../shared/statCardCommander";
import StatCardUnit from "../../../shared/statCardUnit";
// constants
import { HERO, MAGE, AUTOMATON, GIANT } from "../../../../constants/unitTypes";
import { Grid } from "@material-ui/core";

const RulesToolTip = withStyles({
  tooltip: {
    fontFamily: "gonjuring",
    fontSize: "20px",
    color: "white",
    backgroundColor: "black",
  },
})(Tooltip);

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
        {showTommysStuff ? showTommysAnalysis(cardData) : null}
      </Grid>
    </Grid>
  );
};
 


/**
 *  Function controls which kind of stat card (unit or Hero/commander) is displayed in the details panel.
 *
 * @param {[{*}]} cardData
 * @returns  JSX element
 */
export const unitOrCmdCard = (cardData) => {
  let element;
  const singleElements = [HERO, MAGE, AUTOMATON, GIANT];

  singleElements.includes(cardData.unitType)
    ? (element = <StatCardCommander rowData={cardData} />)
    : (element = <StatCardUnit rowData={cardData} />);

  return element;
};

//TODO: finish this function
export const showTommysAnalysis = (cardData) => {
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
    return flag ? (
      <CheckCircleOutlineIcon style={{ color: "black" }} />
    ) : (
      <CancelIcon style={{ color: "black" }} />
    );
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
