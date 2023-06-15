import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "warriorCaste",
    cardNames: ["Kriegerkaste"],
    min: 0.3,
    max: 1.0,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten der Kriegerkaste bestehen.",
  },
  {
    subFaction: "nobleCaste",
    cardNames: ["Adelskaste"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armee darf höchstens zu 50% aus Einheiten der Adelskaste bestehen.",
  },
  {
    subFaction: "magicianCaste",
    cardNames: ["Magierkaste", "Magier"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Einheiten der Magierkaste bestehen.",
  },
  {
    subFaction: "priestCaste",
    cardNames: ["Priesterkaste", "Priesterin"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Einheiten der Priesterkaste bestehen.",
  },
  {
    subFaction: "heroes",
    cardNames: ["Befehlshaber", "Held", "Helden / Befehlshaber"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armee darf höchstens zu 40% aus Helden oder Befehlshabern bestehen.",
  },
  {
    subFaction: "summons",
    cardNames: ["Beschwörung"],
    min: 0.0,
    max: 0.0,
    error: "",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const DarkElveRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);

    // special faction rule - no more than 50% may be spent on all heroes, mages, and commanders.
    let isAboveCharLimit = globalRules.NoMoreThanHalfOnCharacters(selectedUnits, availableUnits, totalPointsAllowance);

    // special faction rule - per full 10% of the max point allowance spent on the priest caste, your point allowance for the magicians caste decreases by 10% and vice versa. Note that the algorithm is different from all the other validator logic- it does not create a list of unit Card objects that are added to a "block list", it instead directly decreases the limit.
    const magiciansVsPriests = () => {
      const INCREMENT = 10;
      const NET_TOTAL = 4;
      const PRIEST = ["Priesterin", "Priesterkaste", "magicianCaste"];
      const MAGICIANS = ["Magier", "Magierkaste", "priestCaste"];

      if (selectedUnits !== undefined && selectedUnits.length > 0) {
        for (let i = selectedUnits.length - 1; i >= 0; i--) {
          if (selectedUnits[i].subFaction === "Priesterin" || selectedUnits[i].subFaction === "Priesterkaste") {
            decreaseAllowance(INCREMENT, NET_TOTAL, PRIEST);
          }
          if (selectedUnits[i].subFaction === "Magier" || selectedUnits[i].subFaction === "Magierkaste") {
            decreaseAllowance(INCREMENT, NET_TOTAL, MAGICIANS);
          }
        }
      }
    };

    const decreaseAllowance = (increment, netTotal, subFaction) => {
      let pointSpent = 0;

      selectedUnits
        .filter((sU) => sU.subFaction === subFaction[0] || sU.subFaction === subFaction[1])
        .forEach((unit) => {
          pointSpent += unit.points;
        });

      const percentage = pointSpent * (100 / totalPointsAllowance);
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
