import { ORK_CLANS_UNIT_MAPPING } from "../../../constants/factions";
import { ORKS } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";

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
    cardNames: ["Clanntruppen"],
    min: 0.0,
    max: 0.4,
    error: "", // see below, set by switchBetweenAlternativeRules
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
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const OrkRules = {
  testSubFactionRules: (
    validationData 
   ) => {
    // Switch between alternative ruule objects!
    switchBetweenAlternativeRules(validationData.selectedAlternativeLists);

    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(validationData.selectedUnits, validationData.availableUnits, validationData.totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, validationData.selectedUnits, validationData.totalPointsAllowance, validationData.subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits);

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
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits, heroPointCap);

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
      : [];

    // special faction rules
    let goblinsAboveMax = checkForGoblinMax(validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits);
    let hasNoCommander = isOrkArmyCommanderPresent(validationData.selectedUnits, validationData.selectedAlternativeLists);
    let availlableClanUnits = setUnitsForClans(validationData.availableUnits, validationData.selectedAlternativeLists);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...availlableClanUnits,

      //TODO:
      ...goblinsAboveMax,
    ];

    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    validationResults.removeUnitsNoLongerValid = [];

    return validationResults;
  },
};

const ORK_SUBFACTION_LIMITS = {
  clanngett: [
    { subFaction: "clanngett", limit: 0.5 },
    { subFaction: "clantroops", limit: 0.4 },
    { subFaction: "engines", limit: 0.3 },
  ],
  clantroops: [
    { subFaction: "clanngett", limit: 0 },
    { subFaction: "clantroops", limit: 0.5 },
    { subFaction: "engines", limit: 0.2 },
  ],
};

/**
 * Function changes the max. limits for the validationData.subFactions depending on which alternative army list has been selected.
 */
const switchBetweenAlternativeRules = ( selectedAlternativeLists) => {
  //  validationData.selectedAlternativeLists  --> Clanngett, Steinclan,...
  let mapperArray;
  const CLANNGETT = "Clanngett";
  const MAPPER_A = "clanngett";
  const MAPPER_B = "clantroops";

  if (selectedAlternativeLists.includes(CLANNGETT)) {
    mapperArray = ORK_SUBFACTION_LIMITS[MAPPER_A];
  } else {
    mapperArray = ORK_SUBFACTION_LIMITS[MAPPER_B];
  }

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    for (let j = 0; j < mapperArray.length; j++) {
      const mapping = mapperArray[j];

      if (rule.subFaction === mapping.subFaction) {
        rule.max = mapping.limit;
      }
      if (rule.subFaction === "clantroops" && rule.subFaction === mapping.subFaction)
        rule.error = ORKS.SUB_FACTION_RULES.CLANTROOPS(mapping.limit * 100);
    }
  }
};

/**
 * Function implements the rule that every Ork army needs a 2* commander. If it is a Clanngett list, it must also include at least one Clanngett hero.
 * @param {unitCard} selectedUnits
 * @returns true, if either a 2 * commander (clans) or a 2* commander and a Clanngett hero is present.
 */
const isOrkArmyCommanderPresent = (selectedUnits, selectedAlternativeLists) => {
  if (!selectedAlternativeLists.includes("Clanngett")) {
    return globalRules.isArmyCommanderPresent(selectedUnits);
  }

  const clangettHeroes = ["Trazzag", "Fherniak", "Ärrig", "Khazzar", "Nallian"];

  const clanngettHeroPresent = selectedUnits.filter((u) => clangettHeroes.includes(u.unitName));
  const potentialCommanders = selectedUnits.filter((u) => u.commandStars >= 2);
  return clanngettHeroPresent.length > 0 && potentialCommanders.length > 0;
};

/**
 * Functions implement the rule that each clan has only access to a small sub set of clan units.
 * All other units are blocked.
 * @param {[unitCard]} availableUnits
 * @param {String} selectedAlternativeLists
 * @returns an array of objects, each containing a blocked unit and an error message.
 */
const setUnitsForClans = (availableUnits, selectedAlternativeLists) => {
  let result = [];
  const selectedAlternative = selectedAlternativeLists[0];

  availableUnits.forEach((u) => {
    if (u.subFaction === "Clanntruppen" && !ORK_CLANS_UNIT_MAPPING[selectedAlternative].includes(u.unitName)) {
      result.push({ unitBlockedbyRules: u.unitName, message: ORKS.SUB_FACTION_RULES.AVAILABLE_CLANUNITS });
    }
  });

  return result;
};

/**
 * Function implements the rule that Orks don't get allies, instead a fixed percentage of points casn be spent on Goblin units as part of the Clanngett troops.
 * @param {[unitCard]} selectedUnits
 * @param {Int} totalPointsAllowance
 * @param {[unitCard]} availableUnits
 * @returns
 */
const checkForGoblinMax = (selectedUnits, totalPointsAllowance, availableUnits) => {
  const goblinUnits = ["Goblin-Spinnenschützen", "Goblin-Spinnenreiter"];
  const GOBLIN_MAX_PERCENTAGE = 0.2;
  const goblinPointAllowance = totalPointsAllowance * GOBLIN_MAX_PERCENTAGE;

  let currentGoblinTotal = 0;
  let result = [];

  selectedUnits
    .filter((u) => goblinUnits.includes(u.unitName))
    .forEach((u) => {
      currentGoblinTotal += u.points;
      if (u.equipment.length > 0) {
        const itemCost = u.equipment.reduce((sum, { points }) => sum + points, 0);
        currentGoblinTotal += itemCost;
      }
    });

  availableUnits
    .filter((u) => goblinUnits.includes(u.unitName))
    .forEach((u) => {
      if (currentGoblinTotal + u.points > goblinPointAllowance) {
        result.push({ unitBlockedbyRules: u.unitName, message: ORKS.SUB_FACTION_RULES.GOBLINS });
      }
    });

  return result;
};

export { OrkRules, rules };
