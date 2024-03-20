// React
import React from "react";
//Material UI
import { Grid, Tooltip, Typography } from "@mui/material";
//icons
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
// constants
import { COMPENDIUM, UNIT_TYPES } from "../../../../constants/textsAndMessages";

/**
 * Function searches the String value of the special rule property for a space (" ").
 * If a space is found, the special rule is deemed to long and
 * only the String up to the first space is displayed and
 * the rest replaced with an ellipsis. If no space is found,
 * then the special rule consists of a single
 * word (i.e., "two-handed Sword") and is displayed as is.
 * @param {String} rule
 * @returns resized string or "-"
 */
export const renderSpecialRules = (rule) => {
  const firstSpace = rule.indexOf(" ");
  const length = firstSpace === -1 ? rule.length : firstSpace;
  const ellipsis = length !== rule.length ? "..." : "";

  const rulePreview = `${rule.slice(0, length)}${ellipsis}`;

  return (
    <Tooltip title={<Typography>{rule === "-" ? COMPENDIUM.NO_SPECIAL_RULES : rule}</Typography>}>
      <Typography>{rule === "-" ? "-" : rulePreview}</Typography>
    </Tooltip>
  );
};

/**
 * Function calculates Tommy's first effectivenness (melee only) rating from
 * his spreadsheet for a single unit.
 * @param {unitCard} unit
 * @returns a decimal number expressing the effectiveness of the unit.
 */
export const renderEffectiveness_1 = (unit) => {
  const result = (unit.weapon1 + unit.armourMelee) / (unit.points / unit.hitpoints);
  return result.toFixed(2);
};

/**
 * Function calculates Tommy's second effectivenness rating from
 * his spreadsheet for a single unit.
 * @param {unitCard} unit
 * @returns a decimal number expressing the effectiveness of the unit.
 */
export const renderEffectiveness_2 = (unit) => {
  const result =
    (unit.weapon1 +
      unit.armourMelee + //
      (unit.armourRange - 0.5 * unit.unitSize) + //
      3 * unit.initiative +
      0.2 * unit.move + //
      0.5 * unit.numberOfElements) / //
    (unit.points / unit.hitpoints);

  return result.toFixed(2);
};

/**
 * Function takes the unit type abbrevation (G,U,M...) and replaces it with the type name.
 * @param {String} unitType
 * @returns the name of the unit Type from the textsAndMessages file.
 */
export const renderUnitTypeName = (unitType) => {
  return UNIT_TYPES[unitType];
};

/**
 * Function renders an icon for unit stats that are Booleans
 * and only occur in Units that do not consist of a single element
 * (giants, heroes, magic users). For a Unit the function displays either a check mark or X icon,
 * for heroes  and commanders it shows a "-".
 *
 * @param {boolean} flag
 * @returns Material UI icon or "-"
 */
export const renderBooleanAsIcon = (numberOfElements, flag) => {
  const SINGLE_ELEMENT = 1;

  if (numberOfElements !== SINGLE_ELEMENT) {
    return flag ? <CheckCircleOutlineIcon /> : <CancelIcon />;
  } else {
    return "-";
  }
};
/**
 * Function renders the hitpoint markers for the stat cards.
 *
 * @param {integer} hitpoints
 * @returns a String containing the correct number of icons.
 */
export const generateHitPoints = (hitpoints) => {
  let hitpointMarker = "";

  for (let i = 0; i < hitpoints; i++) {
    hitpointMarker = hitpointMarker + "[ ]";
  }
  return hitpointMarker;
};

/**
 * Function renders the rank of a magic user for stat cards.
 *
 * @param {integer} arcana
 * @returns a String containing the correct number of icons.
 */
export const renderMagicPoints = (arcana) => {
  let arcanaMarker = "";

  for (let i = 0; i < arcana; i++) {
    arcanaMarker = arcanaMarker + "/";
  }
  return arcanaMarker;
};
/**
 * Function renders command stars for stat cards.
 *
 * @param {integer} stars
 * @returns a String containing the correct number of icons.
 */
export const renderCommandPoints = (stars) => {
  let starIcons = "";

  for (let i = 0; i < stars; i++) {
    starIcons = starIcons + "*";
  }
  return starIcons;
};

/**
 * Function creates an HTML element for stat cards and calculates the
 * correctnumber of elements. The finished HTML shows the
 * number of elements, as well as unit leader, standard bearer,
 * and musician, if they exist.
 *
 * @param {unitCard} unit
 * @returns an HTML element cotaining the formatted information
 */
export const displayUnitElements = (unit) => {
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
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Typography variant="h6">
        {unit.leader ? "Anführer  " : null}
        {unit.standardBearer ? "/ Standarte" : null}
        {unit.musician ? "/ Musiker" : null}
      </Typography>
      <Typography variant="h6">{number}</Typography>
      <Typography variant="h6">{ending}</Typography>
    </Grid>
  );
};
