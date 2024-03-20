import { COMPENDIUM } from "../../../../constants/textsAndMessages";

/**
 * Since the state for the table is relatively large, it is put in its own file
 */

export const columnGroupObjects = [
  { toggleGroup: "button", displayEntireGroup: true },
  { toggleGroup: "naming", displayEntireGroup: true },
  { toggleGroup: "unitCharacteristics", displayEntireGroup: true },
  { toggleGroup: "movementGroup", displayEntireGroup: true },
  { toggleGroup: "defenseGroup", displayEntireGroup: true },
  { toggleGroup: "offenseGroup", displayEntireGroup: true },
  { toggleGroup: "heroCharacteristicsGroup", displayEntireGroup: true },
  { toggleGroup: "toughnessGroup", displayEntireGroup: true },
  { toggleGroup: "rulesPointsGroup", displayEntireGroup: true },
];

export const columnsStateObjects = [
  // Buttons  
  {
    column: "lock", //
    label: COMPENDIUM.LOCK,
    displayed: true,
    type: "button",
    toggleGroup: "button",
  },
  {
    column: "button", //
    label: COMPENDIUM.CARD_BUTTON,
    displayed: true,
    type: "button",
    toggleGroup: "button",
  },
  // naming group
  {
    column: "faction", //
    label: COMPENDIUM.FACTION,
    displayed: true,
    type: "text",
    toggleGroup: "naming",
  },
  {
    column: "subFaction", //
    label: COMPENDIUM.SUBFACTION,
    displayed: true,
    type: "text",
    toggleGroup: "naming",
  },
  {
    column: "name", //
    label: COMPENDIUM.NAME,
    displayed: true,
    type: "text",
    toggleGroup: "naming",
  },
  // unit characteristics group
  {
    column: "unitType", //
    label: COMPENDIUM.UNITTYPE,
    displayed: true,
    type: "text",
    toggleGroup: "unitCharacteristics",
  },
  {
    column: "numberOfElements", //
    label: COMPENDIUM.NUMBEROFELEMENTS,
    displayed: true,
    type: "text",
    toggleGroup: "unitCharacteristics",
  },
  {
    column: "standardBearer",
    label: COMPENDIUM.STANDARDBEARER,
    displayed: true,
    toggleGroup: "unitCharacteristics",
    type: "boolean",
  },
  {
    column: "musician", //
    label: COMPENDIUM.MUSICIAN,
    displayed: true,
    toggleGroup: "unitCharacteristics",
    type: "boolean",
  },
  {
    column: "wedgeFormation",
    label: COMPENDIUM.WEDGEFORMATION,
    displayed: true,
    toggleGroup: "unitCharacteristics",
    type: "boolean",
  },
  {
    column: "skirmishFormation",
    label: COMPENDIUM.SKIRMISHFORMATION,
    displayed: true,
    toggleGroup: "unitCharacteristics",
    type: "boolean",
  },
  {
    column: "squareFormation",
    label: COMPENDIUM.NAME,
    displayed: true,
    toggleGroup: "unitCharacteristics",
    type: "boolean",
  },
  {
    column: "horde",
    label: COMPENDIUM.HORDE,
    displayed: true,
    toggleGroup: "",
    type: "boolean",
  },
  // movement group
  {
    column: "move", //
    label: COMPENDIUM.MOVE,
    displayed: true,
    type: "text",
    toggleGroup: "movementGroup",
  },
  {
    column: "charge", //
    label: COMPENDIUM.CHARGE,
    displayed: true,
    type: "text",
    toggleGroup: "movementGroup",
  },
  {
    column: "skirmish", //
    label: COMPENDIUM.SKIRMISH,
    displayed: true,
    type: "text",
    toggleGroup: "movementGroup",
  },
  {
    column: "hold_maneuvers", //
    label: COMPENDIUM.HOLD_MANEUVERS,
    displayed: true,
    type: "text",
    toggleGroup: "movementGroup",
  },
  // defense group
  {
    column: "unitSize", //
    label: COMPENDIUM.UNIT_SIZE,
    displayed: true,
    type: "text",
    toggleGroup: "defenseGroup",
  },
  {
    column: "armourRange", //
    label: COMPENDIUM.ARMOURRANGE,
    displayed: true,
    type: "text",
    toggleGroup: "defenseGroup",
  },
  {
    column: "armourMelee", //
    label: COMPENDIUM.ARMOURMELEE,
    displayed: true,
    type: "text",
    toggleGroup: "defenseGroup",
  },
  // offense group
  {
    column: "weapon1", //
    label: COMPENDIUM.WEAPON1,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  {
    column: "weapon2", //
    label: COMPENDIUM.WEAPON2,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  {
    column: "weapon3", //
    label: COMPENDIUM.WEAPON3,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  {
    column: "rangedWeapon", //
    label: COMPENDIUM.RANGEDWEAPON,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  {
    column: "skillMelee", //
    label: COMPENDIUM.SKILLMELEE,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  {
    column: "skillRange", //
    label: COMPENDIUM.SKILLRANGE,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  {
    column: "initiative", //
    label: COMPENDIUM.INITIATIVE,
    displayed: true,
    type: "text",
    toggleGroup: "offenseGroup",
  },
  // hero characteristics group
  {
    column: "commandStars", //
    label: COMPENDIUM.COMMANDSTARS,
    displayed: true,
    toggleGroup: "heroCharacteristicsGroup",
    type: "command",
  },
  {
    column: "magic", //
    label: COMPENDIUM.MAGIC,
    displayed: true,
    toggleGroup: "heroCharacteristicsGroup",
    type: "magic",
  },
  {
    column: "controlZone",
    label: COMPENDIUM.CONTROLZONE,
    displayed: true,
    type: "text",
    toggleGroup: "heroCharacteristicsGroup",
  },
  {
    column: "OverRun",
    label: COMPENDIUM.OVERRUN,
    displayed: true,
    type: "text",
    toggleGroup: "heroCharacteristicsGroup",
  },
  // toughness group
  {
    column: "hitpoints", //
    label: COMPENDIUM.HITPOINTS,
    displayed: true,
    type: "text",
    toggleGroup: "toughnessGroup",
  },
  {
    column: "fear", //
    label: COMPENDIUM.FEAR,
    displayed: true,
    type: "text",
    toggleGroup: "toughnessGroup",
  },
  {
    column: "moral1", //
    label: COMPENDIUM.MORAL1,
    displayed: true,
    type: "text",
    toggleGroup: "toughnessGroup",
  },
  {
    column: "moral2", //
    label: COMPENDIUM.MORAL2,
    displayed: true,
    type: "text",
    toggleGroup: "toughnessGroup",
  },
  // rules_points group
  {
    column: "specialRules", //
    label: COMPENDIUM.SPECIALRULES, //
    displayed: true,
    toggleGroup: "rulesPointsGroup",
    type: "specialRules",
  },
  {
    column: "points", //
    label: COMPENDIUM.POINTS,
    displayed: true,
    type: "text",
    toggleGroup: "rulesPointsGroup",
  },
  {
    column: "effectiveness_1", //
    label: COMPENDIUM.EFFECTIVENESS_1,
    displayed: true,
    type: "text",
    toggleGroup: "rulesPointsGroup",
  },
  {
    column: "effectiveness_2", //
    label: COMPENDIUM.EFFECTIVENESS_2,
    displayed: true,
    type: "text",
    toggleGroup: "rulesPointsGroup",
  },
];
