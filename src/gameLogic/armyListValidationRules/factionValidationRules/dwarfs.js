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
    cardNames: ["Z'ahra"],
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

    percentageKingdomsAndAlly(validationData.selectedAlternativeLists);

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

//SPECIAL FACTION RULES

/**
 * The function implements the rule that it is only allowed to take uo to 40% of special troops from one kingdom or its ally and 20% from a second kingdom or its ally.
 * @param {[String]} SelectedAlternateSubFactions
 */
const percentageKingdomsAndAlly = (SelectedAlternateSubFactions) => {
  const MAX_FIRST_SELECTION = 0.4;
  const MAX_SECOND_SELECTION = 0.2;
  const MESSAGE_40_PERCENT = DWARF_TEXTS.SUB_FACTION_RULES.ALLIES_AND_KINGDOMS_40;
  const MESSAGE_20_PERCENT = DWARF_TEXTS.SUB_FACTION_RULES.ALLIES_AND_KINGDOMS_20;

  if (SelectedAlternateSubFactions !== undefined && SelectedAlternateSubFactions.length !== 0) {
    // [subFactioName]

    rules.forEach((r) => {
      const cardNamesArray = r.cardNames;
      cardNamesArray.forEach((c) => {
        if (SelectedAlternateSubFactions[0] === c) {
          r.max = MAX_FIRST_SELECTION;
          r.error = MESSAGE_40_PERCENT;
        } else if (SelectedAlternateSubFactions[1] === c) {
          r.max = MAX_SECOND_SELECTION;
          r.error = MESSAGE_20_PERCENT;
        }
      });
    });

    //TODO set the error message!
  }
};

export { DwarfRules, rules };
