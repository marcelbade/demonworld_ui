import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"],
    min: 0.3,
    max: 1.0,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten bestehen.",
  },

  {
    subFaction: "characters",
    cardNames: ["Held", "Befehlshaber", "Helden/Befehlshaber", "Erdpriester", "Erzpriester", "Feuerpriester"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Helden bestehen.",
  },

  {
    subFaction: "gaeta",
    cardNames: ["Gaeta"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "zahra",
    cardNames: ["Zah'ra"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Zah'ra bestehen.",
  },
  {
    subFaction: "ally",
    cardNames: ["Imperium"],
    min: 0.0,
    max: 0.2,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
];

 
const DwarfRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    // let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      selectedUnits,
      totalPointsAllowance,
      availableUnits,
      // MAX_HERO_PERCENTAGE
    );

    // special faction rule: dwarf kingdoms and allies - the player has to choose one. That Kondom can make up up to 40% of the list, the other one up to 20%. Instead of the second kingdom, the player can take up to 20% of imperial allies
    percentageKingdomsAndAlly(selectedUnits);


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
    // validationResults.commanderIsPresent = hasNoCommander;

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

// function takes care of the dwarf army list special rule:max.
// of 40% of the force. Once the choice is made, the player can only take the second kingdom OR the ally and only to a max. of 20%.
const percentageKingdomsAndAlly = (selectedUnits) => {
  let options = ["Gaeta", "Zah'ra", "Imperium"];
  let first = "";
  let second = "";
  let third = "";

  //const MESSAGE = "Die Armee kann nicht Einheiten beider Zwergeneinheiten und des Alliierten enthalten!";

  // TODO: mach das fertig :D

  selectedUnits.forEach((unit) => {
    // neither kingdom nor ally selected
    if (options.includes(unit.subFaction) && first === "") {
      first = unit.subFaction;
      options = options.filter((option) => option !== first);
    }
    // second kingdeom is selected
    else if (options.includes(unit.subFaction) && first !== "" && second === "") {
      second = unit.subFaction;
      options = options.filter((option) => option !== second);
      third = options[0];
    }
    // ally instead of second kingdom selected
    else if (options.includes(unit.faction) && first !== "") {
      second = unit.Faction;
      options = options.filter((option) => option !== second);
      third = options[0];
    }
  });

  if (second) {
    rules.forEach((rule) => {
      if (rule.subFaction === second || rule.faction === second) {
        rule.max = 0.2;
      }
      if (rule.subFaction === third || rule.faction === third) {
        rule.max = 0;
      }
    });
  }
};

export { DwarfRules, rules };
