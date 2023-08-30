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
    cardNames: ["Helden/Befehlshaber"],
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
    cardNames: ["Sondertruppen des Clans"],
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
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

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

    // If an alternative army has been selected, change the subFaction limits accordingly.
    const ORK_SUBFACTION_LIMITS = [
      { subFaction: "Gerät", clans: 0.2, clanngett: 0.3 },
      { subFaction: "Sondertruppen des Clans", clans: 0.5, clanngett: 0.4 },
      { subFaction: "Clanngett", clans: 0, clanngett: 0.5 },
    ];

    /**
     * Function changes the max. limits for the subfactions depending on which alternative army list has been selected.
     */
    const switchBetweenAlternativeRules = () => {
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

    switchBetweenAlternativeRules();

    /**
     * Function implements the rule that a Clanngett army must contain at least one of the Clanngett  heroes.
     * @param {*} selectedUnits array of all selected unit objects
     * @returns true, if the army contains at least one of the unitCards.
     */
    const isClannGettCommanderPresent = () => {
      const clangettHeroes = ["Trazzag", "Fherniak", "Ärrig", "Khazzar", "Nallian"];
      for (let i = 0; i < clangettHeroes.length; i++) {
        const hero = clangettHeroes[i];
        if (selectedUnits.includes(hero)) return true;
      }

      return false;
    };

    if (selectedAlternativeList === "Clanngett") {
      isClannGettCommanderPresent(selectedUnits);
    }

    const alliesVsClanngett = (selectedUnits) => {
      const NET_TOTAL_ORKS = 5;
      const NET_TOTAL_GOBLINS = 2;
      const GOBLINS = "Goblins";
      const CLANNGETT = ["Clanngett"];

      if (selectedUnits !== undefined && selectedUnits.length > 0) {
        for (let i = selectedUnits.length - 1; i >= 0; i--) {
          if (selectedUnits[i].subFaction === GOBLINS) {
            decreaseAllowance(NET_TOTAL_ORKS, GOBLINS);
          }
          if (selectedUnits[i].subFaction === CLANNGETT) {
            decreaseAllowance(NET_TOTAL_GOBLINS, CLANNGETT);
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
    const decreaseAllowance = (netTotal, subFaction) => {
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

    // execute
    alliesVsClanngett(selectedUnits);

    return validationResults;
  },
};

export { OrkRules, rules };
