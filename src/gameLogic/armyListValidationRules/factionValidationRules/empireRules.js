// components and functions
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
// contants
import { DWARVES } from "../../../constants/factions";
import { DWARF_TEXTS, EMPIRE_TEXTS } from "../../../constants/textsAndMessages";

const rules = [
  {
    subFaction: "imperialarmy",
    cardNames: ["Kaiserheer"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.IMPERIAL_ARMY,
  },

  {
    subFaction: "provincialArmy",
    cardNames: ["Provinzheer"],
    min: 0.2,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.PROVINCIAL_ARMY,
  },

  {
    subFaction: "orderTroopsAndMagicians",
    cardNames: ["Orden"],
    min: 0.0,
    max: 0.4,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.ORDER_TROOPS_AND_MAGICIANS,
  },
  {
    subFaction: "heroesAndCommanders",
    cardNames: ["Helden/Befehlshaber", "Held"],
    min: 0.0,
    max: 0.3,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.HEROES_AND_COMMANDERS,
  },
  {
    subFaction: "spellcasters",
    cardNames: ["Zauberer", "Priester"],
    min: 0.0,
    max: 0.3,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.SPELLCASTERS,
  },

  {
    subFaction: "centralMarkSpecials",
    cardNames: ["Zentralmark"],
    min: 0.0,
    max: 0.3,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.CENTRAL_MARK_SPECIALS,
  },

  {
    subFaction: "easternMarkSpecials",
    cardNames: ["Ostmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.EASTERN_MARK_SPECIALS,
  },

  {
    subFaction: "westernMarkSpecials",
    cardNames: ["Westmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.WESTERN_MARK_SPECIALS,
  },

  {
    subFaction: "southernMarkSpecials",
    cardNames: ["Südmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.SOUTHERN_MARK_SPECIALS,
  },

  {
    subFaction: "northernMarkSpecials",
    cardNames: ["Nordmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.NORTHERN_MARK_SPECIALS,
  },

  {
    subFaction: "ally",
    cardNames: ["Zwerge"],
    min: 0.0,
    max: 0.2,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.ALLY,
  },
];

const EmpireRules = {
  testSubFactionRules: (validationData) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(
      validationData.selectedUnits,
      validationData.availableUnits,
      validationData.totalPointsAllowance
    );
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.subFactions
    );
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits
    );
    let hasNoCommander = globalRules.isArmyCommanderPresent(validationData.selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (validationData.tournamentOverrideRules.enableOverride) {
      maxCopies = validationData.tournamentOverrideRules.maxNumber;
      heroPointCap = validationData.tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 40% cap
      heroPointCap = 40;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(validationData.selectedUnits, maxCopies);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits,
      heroPointCap
    );

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
      : [];

    // special faction rules
    let zahraTroops = blockZahra(validationData.listOfAlliedUnits);
    provinceVsDwarves(validationData);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    //  result - ally rules applied.
    validationResults.alliedUnitsBlockedbyRules = [
      ...zahraTroops, //
    ];

    return validationResults;
  },
};
// special faction rules

/**
 * Function implements the rule that no Z’ahra troops can be allies in an Empire list.
 * @param {untiCards} availableAlliedUnits
 * @returns an array consisting of objects. Every object contains a unit that must
 * be blocked and an error message to be displayed as a tool tip.
 */
const blockZahra = (availableAlliedUnits) => {
  const MESSAGE = EMPIRE_TEXTS.SUB_FACTION_RULES.NO_ZAHRA;
  let result = [];

  const zahraUnits = availableAlliedUnits.filter((u) => u.subFaction === DWARF_TEXTS.SF.ZAHRA);

  zahraUnits.forEach((u) => {
    result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
  });

  return result;
};

/**
 * Function implements a special faction rule: A maximum of 20% of the list can
 * be spent on dwarf troops (except Z'ahra troops). These points however,
 * count as part of the province, i.e., they must be subtracted from
 * the province limit.
 * This is implemented by decreasing the maximum by 1% percent for every
 * 1% spent on dwarves.
 * NOTE: since the increment is 1%, it does not appear in the function since
 * percentage/1 = percentage.
 *
 */
const provinceVsDwarves = (validationData) => {
  const PROVINCE_MAX = 50; // 50% default allowance for either caste
  const PROVINCES = [EMPIRE_TEXTS.SF.EAST_MARCH, EMPIRE_TEXTS.SF.SOUTH_MARCH];

  let pointsSpent = 0;

  validationData.selectedUnits
    .filter((sU) => sU.faction === DWARVES)
    .forEach((unit) => {
      pointsSpent += unit.points;
    });

  const percentage = pointsSpent * (100 / validationData.totalPointsAllowance);
  const remainder = PROVINCE_MAX - percentage;

  rules
    .filter((r) => PROVINCES.includes(r.cardNames[0]))
    .forEach((r) => {
      r.max = remainder * 0.01;
    });
};

export { EmpireRules, rules };
