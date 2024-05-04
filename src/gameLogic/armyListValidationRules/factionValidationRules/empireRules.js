import { EMPIRE_TEXTS } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "imperialarmy",
    cardNames: ["Kaiserheer"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.IMPERIAL_ARMY,
  },

  {
    subFaction: "provincialArmy",
    cardNames: ["Provinzheer"],
    min: 0.2,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.PROVINCIAL_ARMY,
  },

  {
    subFaction: "orderTroopsAndMagicians",
    cardNames: ["Orden"],
    min: 0.0,
    max: 0.4,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.ORDER_TROOPS_AND_MAGICIANS,
  },
  {
    subFaction: "heroesAndCommanders",
    cardNames: ["Helden/Befehlshaber", "Held"],
    min: 0.0,
    max: 0.3,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.HEROES_AND_COMMANDERS,
  },
  {
    subFaction: "spellcasters",
    cardNames: ["Zauberer", "Priester"],
    min: 0.0,
    max: 0.3,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.SPELLCASTERS,
  },

  {
    subFaction: "centralMarkSpecials",
    cardNames: ["Zentralmark"],
    min: 0.0,
    max: 0.3,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.CENTRAL_MARK_SPECIALS,
  },

  {
    subFaction: "easternMarkSpecials",
    cardNames: ["Ostmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.EASTERN_MARK_SPECIALS,
  },

  {
    subFaction: "westernMarkSpecials",
    cardNames: ["Westmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.WESTERN_MARK_SPECIALS,
  },

  {
    subFaction: "southernMarkSpecials",
    cardNames: ["Südmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.SOUTHERN_MARK_SPECIALS,
  },

  {
    subFaction: "northernMarkSpecials",
    cardNames: ["Nordmark"],
    min: 0.1,
    max: 0.5,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.NORTHERN_MARK_SPECIALS,
  },

  {
    subFaction: "ally",
    cardNames: ["Zwerge"],
    min: 0.0,
    max: 0.2,
    error: EMPIRE_TEXTS.SUB_FACTION_RULES.ALLY,
  },
];

const EmpireRules = {
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
      // faction rule => 40% cap
      heroPointCap = 40;
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

    // special faction rules - no special rules for the empire exist.

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

export { EmpireRules, rules };
