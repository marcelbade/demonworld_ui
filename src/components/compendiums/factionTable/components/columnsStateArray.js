import { COMPENDIUM, CARD_TEXT } from "../../../../constants/textsAndMessages";

/**
 * Since the state for the table is relatively large, it is put in its own file
 */

export const columnStateArray = [
  // button
  {
    toggleGroup: "button",
    displayGroup: true,
    columns: [
      {
        column: "lock",
        label: COMPENDIUM.LOCK,
        displayed: true,
        type: "button",
      },

      {
        column: "cardViewButton",
        label: COMPENDIUM.CARD_BUTTON,
        displayed: true,
        type: "button",
      },
    ],
  },
  //   "naming"
  {
    toggleGroup: "naming",
    displayGroup: true,
    columns: [
      {
        column: "faction",
        label: COMPENDIUM.FACTION,
        displayed: true,
        type: "text",
      },
      {
        column: "subFaction",
        label: COMPENDIUM.SUBFACTION,
        displayed: true,
        type: "text",
      },
      {
        column: "unitName",
        label: COMPENDIUM.NAME,
        displayed: true,
        type: "text",
      },
    ],
  },
  // unitCharacteristics
  {
    toggleGroup: "unitCharacteristics",
    displayGroup: true,
    columns: [
      {
        column: "unitType",
        label: COMPENDIUM.UNITTYPE,
        displayed: true,
        type: "text",
      },
      {
        column: "numberOfElements",
        label: CARD_TEXT.ELEMENTS,
        displayed: true,
        type: "text",
      },
      {
        column: "standardBearer",
        label: COMPENDIUM.STANDARDBEARER,
        displayed: true,
        type: "boolean",
      },
      {
        column: "musician",
        label: COMPENDIUM.MUSICIAN,
        displayed: true,
        type: "boolean",
      },
      {
        column: "wedgeFormation",
        label: COMPENDIUM.WEDGEFORMATION,
        displayed: true,
        type: "boolean",
      },
      {
        column: "skirmishFormation",
        label: COMPENDIUM.SKIRMISHFORMATION,
        displayed: true,
        type: "boolean",
      },
      {
        column: "squareFormation",
        label: COMPENDIUM.SQUAREFORMATION,
        displayed: true,
        type: "boolean",
      },
      {
        column: "horde",
        label: COMPENDIUM.HORDE,
        displayed: true,
        type: "boolean",
      },
    ],
  },
  // movement
  {
    toggleGroup: "movementGroup",
    displayGroup: true,
    columns: [
      {
        column: "move",
        label: COMPENDIUM.MOVE,
        displayed: true,
        type: "text",
      },
      {
        column: "charge",
        label: COMPENDIUM.CHARGE,
        displayed: true,
        type: "text",
      },
      {
        column: "skirmish",
        label: COMPENDIUM.SKIRMISH,
        displayed: true,
        type: "text",
      },
      {
        column: "hold_maneuvers",
        label: COMPENDIUM.HOLD_MANEUVERS,
        displayed: true,
        type: "text",
      },
    ],
  },
  // defenseGroup
  {
    toggleGroup: "defenseGroup",
    displayGroup: true,
    columns: [
      {
        column: "unitSize",
        label: COMPENDIUM.UNIT_SIZE,
        displayed: true,
        type: "text",
      },
      {
        column: "armourRange",
        label: COMPENDIUM.ARMOURRANGE,
        displayed: true,
        type: "text",
      },
      {
        column: "armourMelee",
        label: COMPENDIUM.ARMOURMELEE,
        displayed: true,
        type: "text",
      },
    ],
  },
  // defenseGroup
  {
    toggleGroup: "defenseGroup",
    displayGroup: true,
    columns: [
      {
        column: "weapon1",
        label: COMPENDIUM.WEAPON1,
        displayed: true,
        type: "text",
      },
      {
        column: "weapon2",
        label: COMPENDIUM.WEAPON2,
        displayed: true,
        type: "text",
      },
      {
        column: "weapon3",
        label: COMPENDIUM.WEAPON3,
        displayed: true,
        type: "text",
      },
      {
        column: "rangedWeapon",
        label: COMPENDIUM.RANGEDWEAPON,
        displayed: true,
        type: "text",
      },
      {
        column: "skillMelee",
        label: COMPENDIUM.SKILLMELEE,
        displayed: true,
        type: "text",
      },
      {
        column: "skillRange",
        label: COMPENDIUM.SKILLRANGE,
        displayed: true,
        type: "text",
      },
      {
        column: "initiative",
        label: COMPENDIUM.INITIATIVE,
        displayed: true,
        type: "text",
      },
    ],
  },
  // heroCharacteristicsGroup
  {
    toggleGroup: "heroCharacteristicsGroup",
    displayGroup: true,
    columns: [
      {
        column: "commandStars",
        label: COMPENDIUM.COMMANDSTARS,
        displayed: true,
        type: "command",
      },
      {
        column: "magic",
        label: COMPENDIUM.MAGIC,
        displayed: true,
        type: "magic",
      },
      {
        column: "controlZone",
        label: COMPENDIUM.CONTROLZONE,
        displayed: true,
        type: "text",
      },
      {
        column: "OverRun",
        label: COMPENDIUM.OVERRUN,
        displayed: true,
        type: "text",
      },
    ],
  },
  // toughnessGroup
  {
    toggleGroup: "toughnessGroup",
    displayGroup: true,
    columns: [
      {
        column: "hitpoints",
        label: COMPENDIUM.HITPOINTS,
        displayed: true,
        type: "text",
      },
      {
        column: "fear",
        label: COMPENDIUM.FEAR,
        displayed: true,
        type: "text",
      },
      {
        column: "moral1",
        label: COMPENDIUM.MORAL1,
        displayed: true,
        type: "text",
      },
      {
        column: "moral2",
        label: COMPENDIUM.MORAL2,
        displayed: true,
        type: "text",
      },
    ],
  },
  // rulesPointsGroup
  {
    toggleGroup: "rulesPointsGroup",
    displayGroup: true,
    columns: [
      {
        column: "specialRules",
        label: COMPENDIUM.SPECIALRULES,
        displayed: true,
        type: "specialRules",
      },
      {
        column: "points",
        label: COMPENDIUM.POINTS,
        displayed: true,
        type: "text",
      },
      {
        column: "effectiveness_1",
        label: COMPENDIUM.EFFECTIVENESS_1,
        displayed: true,
        type: "text",
      },
      {
        column: "effectiveness_2",
        label: COMPENDIUM.EFFECTIVENESS_2,
        displayed: true,
        type: "text",
      },
    ],
  },
];
