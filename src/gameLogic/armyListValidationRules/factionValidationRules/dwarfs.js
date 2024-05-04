// functions and components
import validationResults from "./validationResultsObjectProvider";
// constants
import { DWARF_TEXTS } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";

const rules = [
  {
    subFaction: "unit",
    cardNames: ["Einheit"],
    min: 0.3,
    max: 1.0,
    error: DWARF_TEXTS.SUB_FACTION_RULES.UNITS,
  },

  {
    subFaction: "characters",
    cardNames: ["Held", "Befehlshaber", "Helden/Befehlshaber", "Erdpriester", "Erzpriester", "Feuerpriester"],
    min: 0.0,
    max: 0.5,
    error: DWARF_TEXTS.SUB_FACTION_RULES.CHARACTERS,
  },

  {
    subFaction: "gaeta",
    cardNames: ["Gaeta"],
    min: 0.0,
    max: 0.4,
    error: "", // special rule: error message is set by function percentageKingdomsAndAlly
  },
  {
    subFaction: "zahra",
    cardNames: ["Zah'ra"],
    min: 0.0,
    max: 0.4,
    error: "", // special rule: error message is set by function percentageKingdomsAndAlly
  },
  {
    subFaction: "ally",
    cardNames: ["Imperium"],
    min: 0.0,
    max: 0.2,
    error: DWARF_TEXTS.SUB_FACTION_RULES.ALLY,
  },
];

const DwarfRules = {
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
      // faction rule =>  no cap for heroes!
      heroPointCap = 100;
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

    // special faction rule: dwarf kingdoms and allies - the player has to choose one. That Kondom can make up up to 40% of the list, the other one up to 20%. Instead of the second kingdom, the player can take up to 20% of imperial allies
    percentageKingdomsAndAlly(validationData.selectedUnits);

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

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

/**
 * The function implements the rule that it is only allowed to take uo to 40% of special troops from one kingdom or its ally and 20% from a second kingdom or its ally.
 * @param {unitCards} selectedUnits
 */
const percentageKingdomsAndAlly = (selectedUnits) => {
  // let kindomsAndALly = ["Gaeta", "Zah'ra", "Imperium"];
  // let firstChoice = "";
  // let secondChoice = "";
  // const MESSAGE_A = DWARF_TEXTS.SUB_FACTION_RULES.ALLIES_AND_KINGDOMS_40;
  // const MESSAGE_B = DWARF_TEXTS.SUB_FACTION_RULES.ALLIES_AND_KINGDOMS_20;
  // const selectedSubFaction = selectedUnits.map((u) => u.subFaction).find((sF) => kindomsAndALly.includes(sF));
  // console.log("selectedSubFaction", selectedSubFaction);
  // if (firstChoice === "") {
  //   firstChoice = selectedSubFaction;
  // } else {
  //   secondChoice = selectedSubFaction;
  // }
  // const ruleFirstChoice = firstChoice === "" ? rules.find((r) => r.cardNames[0] === firstChoice) : null;
  // const ruleSecondChoice = secondChoice === "" ? rules.find((r) => r.cardNames[0] === secondChoice) : null;
  // ruleFirstChoice.error = MESSAGE_A;
  // ruleSecondChoice.max = 0.2;
  // ruleSecondChoice.error = MESSAGE_B;
};

export { DwarfRules, rules };
