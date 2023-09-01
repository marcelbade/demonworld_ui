import { ORKS } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";

// clan armies need a two star general

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"],
    min: 0.25,
    max: 1.0,
    error: ORKS.SUB_FACTION_RULES.UNIT,
  },
  {
    subFaction: "characters",
    cardNames: ["Helden / Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: ORKS.SUB_FACTION_RULES.CHARACTERS,
  },
  {
    subFaction: "engines",
    cardNames: ["Gerät"],
    min: 0.0,
    max: 0.3,
    error: ORKS.SUB_FACTION_RULES.ENGINES,
  },
  {
    subFaction: "giants",
    cardNames: ["Giganten"],
    min: 0.0,
    max: 0.3,
    error: ORKS.SUB_FACTION_RULES.GIANTS,
  },
  {
    subFaction: "clantroops",
    cardNames: ["Blutclan", "Wyvernclan", "Tierclan", "Pfeilclan", "Eisenclan", "Eisclan", "Bergclan", "Steinclan"],
    min: 0.0,
    max: 0.4,
    error: ORKS.SUB_FACTION_RULES.CLANTROOPS,
  },
  {
    subFaction: "clanngett",
    cardNames: ["Clanngett"],
    min: 0.0,
    max: 0.5,
    error: ORKS.SUB_FACTION_RULES.CLANNGETT,
  },
  {
    subFaction: "wizards",
    cardNames: ["Zauberer"],
    min: 0.0,
    max: 0.3,
    error: ORKS.SUB_FACTION_RULES.WIZARDS,
  },
  {
    subFaction: "goblins",
    min: 0.0,
    max: 0.2,
    cardNames: ["Goblins"],
    error: ORKS.SUB_FACTION_RULES.GOBLINS,
  },
];

const MAX_HERO_PERCENTAGE = 40;

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const OrkRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions, selectedAlternativeList) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = isOrkArmyCommanderPresent(selectedUnits, selectedAlternativeList);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      selectedUnits,
      totalPointsAllowance,
      availableUnits,
      MAX_HERO_PERCENTAGE
    );

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

    validationResults.removeUnitsNoLongerValid = [];

    // special faction rules

    switchBetweenAlternativeRules(selectedAlternativeList);
    alliesVsClanngett(selectedUnits);

    return validationResults;
  },
};

// If an alternative army has been selected, change the subFaction limits accordingly.
const ORK_SUBFACTION_LIMITS = [
  { subFaction: "Gerät", clans: 0.2, clanngett: 0.3 },
  { subFaction: "Sondertruppen des Clans", clans: 0.5, clanngett: 0.4 },
  { subFaction: "Clanngett", clans: 0, clanngett: 0.5 },
];

/**
 * Function changes the max. limits for the subfactions depending on which alternative army list has been selected.
 */
const switchBetweenAlternativeRules = (selectedAlternativeList) => {
  if (selectedAlternativeList === "Clanngett") {
    changeLimit("clanngett");
  } else {
    changeLimit("clans");
  }
};

const changeLimit = (armyList) => {
  for (let i = 0; i < ORK_SUBFACTION_LIMITS.length; i++) {
    const limit = ORK_SUBFACTION_LIMITS[i];
    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];

      if (rule.cardNames.includes(limit.subFaction)) {
        rule.max = limit[armyList];
      }
    }
  }
};

/**
 * Function implements the rule that every Ork army needs a 2* commander. If it is a Clanngett list, it must also include at least one Clanngett hero.
 * @param {unitCard} selectedUnits
 * @returns true, if either a 2 * commander (clans) or a 2* commander and a Clanngett hero is present.
 */
const isOrkArmyCommanderPresent = (selectedUnits, selectedAlternativeList) => {
  if (selectedAlternativeList !== "Clanngett") {
    return globalRules.isArmyCommanderPresent(selectedUnits);
  }

  const clangettHeroes = ["Trazzag", "Fherniak", "Ärrig", "Khazzar", "Nallian"];

  const clanngettHeroPresent = selectedUnits.filter((u) => clangettHeroes.includes(u));
  const potentialCommanders = selectedUnits.filter((u) => u.commandStars >= 2);
  return clanngettHeroPresent.length > 0 && potentialCommanders.length > 0;
};

const alliesVsClanngett = (selectedUnits, totalPointsAllowance) => {
  const NET_TOTAL_ORKS = 5;
  const NET_TOTAL_GOBLINS = 2;
  const GOBLINS = "Goblins";
  const CLANNGETT = ["Clanngett"];

  if (selectedUnits !== undefined && selectedUnits.length > 0) {
    for (let i = selectedUnits.length - 1; i >= 0; i--) {
      if (selectedUnits[i].subFaction === GOBLINS) {
        decreaseAllowance(NET_TOTAL_ORKS, GOBLINS, selectedUnits, totalPointsAllowance);
      }
      if (selectedUnits[i].subFaction === CLANNGETT) {
        decreaseAllowance(NET_TOTAL_GOBLINS, CLANNGETT, selectedUnits, totalPointsAllowance);
      }
    }
  }
};

/**
 * Function decreases the max point allowance for a subfaction.
 * @param {int} increment
 * @param {int} netTotal
 * @param {String} subFaction
 */
const decreaseAllowance = (netTotal, subFaction, selectedUnits, totalPointsAllowance) => {
  let pointsSpent = 0;

  selectedUnits
    .filter((sU) => sU.subFaction === subFaction)
    .forEach((unit) => {
      pointsSpent += unit.points;
    });

  const percentage = pointsSpent * (100 / totalPointsAllowance);
  const share = Math.floor(percentage);

  const remainder = netTotal - share;
  let foundRules = rules.filter((r) => r.subFaction === subFaction);

  foundRules[0].max = remainder * 0.1;
};

export { OrkRules, rules };
