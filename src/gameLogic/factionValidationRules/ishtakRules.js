import globalRules from "../globalRules/globalRules";

//TODO: change the error messages!!
const rules = [
  {
    subFaction: "humans",
    cardNames: ["Menschen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste muss zu 10% bis 60% aus Menschen bestehen.",
  },
  {
    subFaction: "beastmen",
    cardNames: ["Tiermenschen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste muss zu 10% bis 60% aus Tiermenschen bestehen.",
  },
  {
    subFaction: "icewitches",
    cardNames: ["Eishexen"],
    min: 0.1,
    max: 0.6,
    error: "Deine Armeeliste muss zu 10% bis 60% aus Eishexen bestehen.",
  },
  {
    subFaction: "demons",
    cardNames: ["Dämonen"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Dämonen bestehen.",
  },
  {
    subFaction: "undead",
    cardNames: ["Untote"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Untoten bestehen.",
  },
  {
    subFaction: "icegiants",
    cardNames: ["Eisriesen"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Eisriesen bestehen.",
  },
];

const NO_MORE_THAN_HALF_ON_ISHTAK_CHARS_MESSAGE = "Du darfst höchstens 50% der Punkte für Helden, Befehlshaber und Magier ausgeben.";
const ISHTAK_HEROES_CAP = 0.5;

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  // Ishtak does not have this requirement - hence, this must always be true
  commanderIsPresent: true,
};

const IshtakRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);

    // special faction rules -  all heroes, mages, commanders count towards their repsective subFaction limit (ice witches, beastmen,...). In addition, no more than 50% may be spent on them in total.

    let NoMoreThanHalfOnCharacters = () => {
      let result = [];
      let pointsSpentOnChars = 0;
      selectedUnits.forEach((u) => (pointsSpentOnChars += u.points));

      availableUnits
        .filter((aU) => aU.unitType === "H" || aU.unitType === "M")
        .forEach((char) => {
          if (char.points + pointsSpentOnChars > totalPointsAllowance * ISHTAK_HEROES_CAP) {
            result.push({ unitBlockedbyRules: char.unitName, message: NO_MORE_THAN_HALF_ON_ISHTAK_CHARS_MESSAGE });
          }
        });

      return result;
    };

    let isAboveIshtakCharLimit = NoMoreThanHalfOnCharacters();

    console.log("isAboveIshtakCharLimit");
    console.log(isAboveIshtakCharLimit);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...isAboveIshtakCharLimit,
    ];
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;


    console.log("Ishtak validationResults")
    console.log(validationResults)

    return validationResults;
  },
};

export { IshtakRules, rules };
