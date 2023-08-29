import { ISHTAK } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

//TODO: change the error messages!!
const rules = [
  {
    subFaction: "humans",
    cardNames: ["Menschen"],
    min: 0.1,
    max: 0.6,
    error: ISHTAK.SUB_FACTION_RULES.HUMANS,
  },
  {
    subFaction: "beastmen",
    cardNames: ["Tiermenschen"],
    min: 0.1,
    max: 0.6,
    error: ISHTAK.SUB_FACTION_RULES.BEASTMEN,
  },
  {
    subFaction: "icewitches",
    cardNames: ["Eishexen"],
    min: 0.1,
    max: 0.6,
    error: ISHTAK.SUB_FACTION_RULES.ICEWITCHES,
  },
  {
    subFaction: "demons",
    cardNames: ["Dämonen"],
    min: 0.0,
    max: 0.5,
    error: ISHTAK.SUB_FACTION_RULES.DEMONS,
  },
  {
    subFaction: "undead",
    cardNames: ["Untote"],
    min: 0.0,
    max: 0.5,
    error: ISHTAK.SUB_FACTION_RULES.UNDEAD,
  },
  {
    subFaction: "icegiants",
    cardNames: ["Eisriesen"],
    min: 0.0,
    max: 0.3,
    error: ISHTAK.SUB_FACTION_RULES.ICEGIANTS,
  },
];

const IshtakRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);

    // special faction rules -  all heroes, mages, commanders count towards their repsective subFaction limit (ice witches, beastmen,...). In addition, no more than 50% may be spent on them in total.
    let isAboveIshtakCharLimit = globalRules.NoMoreThanHalfOnCharacters(selectedUnits, availableUnits, totalPointsAllowance);

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

    //Ishtak is the ONLY faction without the "two star commander" requirement - hence this validation must always return true.
    validationResults.commanderIsPresent = true;

    return validationResults;
  },
};

export { IshtakRules, rules };
