import { DARKELVES } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "warriorCaste",
    cardNames: ["Kriegerkaste"],
    min: 0.3,
    max: 1.0,
    error: DARKELVES.SUB_FACTION_RULES.WARRIOR_CASTE,
  },
  {
    subFaction: "nobleCaste",
    cardNames: ["Adelskaste"],
    min: 0.0,
    max: 0.5,
    error: DARKELVES.SUB_FACTION_RULES.NOBLE_CASTE,
  },
  {
    subFaction: "magicianCaste",
    cardNames: ["Magierkaste", "Magier"],
    min: 0.0,
    max: 0.4,
    error: DARKELVES.SUB_FACTION_RULES.MAGICIAN_CASTE,
  },
  {
    subFaction: "priestCaste",
    cardNames: ["Priesterkaste", "Priesterin"],
    min: 0.0,
    max: 0.4,
    error: DARKELVES.SUB_FACTION_RULES.PRIEST_CASTE,
  },
  {
    subFaction: "heroes",
    cardNames: ["Befehlshaber", "Held", "Helden/Befehlshaber"],
    min: 0.0,
    max: 0.4,
    error: DARKELVES.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "summons",
    cardNames: ["Beschwörung"],
    min: 0.0,
    max: 0.0,
    error: "",
  },
];

const DarkElveRules = {
  testSubFactionRules: (
    availableUnits,
    selectedUnits,
    totalPointsAllowance,
    subFactions,
    selectedAlternativeList,
    tournamentOverrideRules,
    listOfAlliedUnits
  ) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (tournamentOverrideRules.enableOverride) {
      maxCopies = tournamentOverrideRules.maxNumber;
      heroPointCap = tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 50% cap
      heroPointCap = 50;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(selectedUnits, maxCopies);
    let isAboveCharLimit = globalRules.belowMaxPercentageHeroes(selectedUnits, totalPointsAllowance, availableUnits, heroPointCap);

    let hasDuplicateUniques = tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(selectedUnits)
      : [];

    /**
     * Function implements a special faction rule per full 10% of the max point allowance 
     * spent on the priest caste, your point allowance 
     * for the magicians caste decreases by 10% and vice versa.
     * Note that the algorithm is different from all the other validator logic-
     * it does not create a list of unit Card objects that are added to a "block list",
     * it instead directly decreases the limit.
     */
    const magiciansVsPriests = () => {
      const INCREMENT = 10;
      const NET_TOTAL = 4; // 40% allowance
      const PRIESTS = ["Priesterin", "Priesterkaste", "magicianCaste"];
      const MAGICIANS = ["Magier", "Magierkaste", "priestCaste"];

      if (selectedUnits !== undefined && selectedUnits.length > 0) {
        for (let i = selectedUnits.length - 1; i >= 0; i--) {
          if (selectedUnits[i].subFaction === "Priesterin" || selectedUnits[i].subFaction === "Priesterkaste") {
            decreaseAllowance(INCREMENT, NET_TOTAL, PRIESTS);
          }
          if (selectedUnits[i].subFaction === "Magier" || selectedUnits[i].subFaction === "Magierkaste") {
            decreaseAllowance(INCREMENT, NET_TOTAL, MAGICIANS);
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
    const decreaseAllowance = (increment, netTotal, subFaction) => {
      let pointsSpent = 0;

      selectedUnits
        .filter((sU) => sU.subFaction === subFaction[0] || sU.subFaction === subFaction[1])
        .forEach((unit) => {
          pointsSpent += unit.points;
        });

      const percentage = pointsSpent * (100 / totalPointsAllowance);
      const share = Math.floor(percentage / increment);

      const remainder = netTotal - share;
      let foundRules = rules.filter((r) => r.subFaction === subFaction[2]);

      foundRules[0].max = remainder * 0.1;
    };

    // execute
    magiciansVsPriests();

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAboveCharLimit,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    return validationResults;
  },
};

export { DarkElveRules, rules };
