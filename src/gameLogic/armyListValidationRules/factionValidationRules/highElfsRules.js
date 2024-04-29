//  functions and components
import { areGivenUnitsPresent, findUnits } from "../../../util/utilityFunctions";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
//  constants
import { ELVES } from "../../../constants/textsAndMessages";
import { GIANT, HERO, MAGE, UNIT } from "../../../constants/unitTypes";

const rules = [
  {
    subFaction: "ThanarielClantroops",
    cardNames: [ELVES.SF.THANARIEL_CLAN_TROOPS],
    min: 0.3,
    max: 0.7,
    error: ELVES.SUB_FACTION_RULES.THANARIL_CLAN_TROOPS,
  },

  {
    subFaction: "ThanarielCovens",
    cardNames: ["Thanaril-Kriegerbünde"],
    min: 0.0,
    max: 0.3,
    error: ELVES.SUB_FACTION_RULES.THANARIL_COVENS,
  },

  {
    subFaction: "ThanarielClanlordsAndBards",
    cardNames: [ELVES.SF.THANARIEL_CLANLORDS_AND_BARDS],
    min: 0.0,
    max: 0.3,
    error: ELVES.SUB_FACTION_RULES.THANARIL_CLAN_LORDS,
  },

  {
    subFaction: "Dyrea/Loreath",
    cardNames: [ELVES.SF.DYREA_LOREATH],
    min: 0.0,
    max: 0.4,
    error: ELVES.SUB_FACTION_RULES.LOREATH_DYREA,
  },

  {
    subFaction: "Ilah Ri", // Council Army
    cardNames: [ELVES.SF.ILAH_RI],
    min: 0.0,
    max: 0.5,
    error: ELVES.SUB_FACTION_RULES.ILAH_RI,
  },

  {
    subFaction: "Orea Vanar",
    cardNames: [ELVES.SF.OREA_VANAR],
    min: 0.0,
    max: 0.3,
    error: ELVES.SUB_FACTION_RULES.OREA_VANAR,
  },
  {
    subFaction: "Treelords",
    cardNames: [ELVES.SF.TREELORDS],
    min: 0.0,
    max: 0.25,
    error: ELVES.SUB_FACTION_RULES.TREANTS,
  },
  {
    subFaction: "Centaurs",
    cardNames: [ELVES.SF.CENTAURS],
    min: 0.0,
    max: 0.25,
    error: ELVES.SUB_FACTION_RULES.CENTAURS,
  },
  {
    subFaction: "Old Hero",
    cardNames: [ELVES.SF.OLD_HERO],
    min: 0.0,
    max: 0.25,
    error: ELVES.SUB_FACTION_RULES.OLD_HERO,
  },
];

const ElfRules = {
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

    // special faction rules
    let testForMaxNumberOldHeroes = numberOfOldHeroes(validationData.selectedUnits, validationData.availableUnits);
    let testForOreaVanarUnits = OreaVanarRules(validationData.selectedUnits);
    let testForThanarilCovenUnits = thanarilCovenRule(validationData.selectedUnits);
    let testForEntsVsCentaurs = entsOrCentaurs(validationData.selectedUnits, validationData.availableUnits);
    let testForIlahRi = councilArmyRule(validationData.selectedUnits, validationData.availableUnits);
    let testIlahRiForRemoval = councilArmyRemove(validationData.availableUnits, validationData.selectedUnits);
    let testOldHeroForRemoval = oldHeroRemove(validationData.selectedUnits);
    let testOreaVanarMasterRemoval = removeOreaVanar(validationData.selectedUnits);
    let testThanarilCovenRemoval = removeThanarilCoven(validationData.selectedUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...isExceedingPointAllowance,
      ...hasDuplicateUniques,
      ...testForHeroCapResult,
      ...testForMax2Result,
      ...isAboveSubFactionMax,
      ...testForMaxNumberOldHeroes,
      ...testForOreaVanarUnits,
      ...testForThanarilCovenUnits,
      ...testForEntsVsCentaurs,
      ...testForIlahRi,
    ];
    // Result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // Result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    // Are there units that need to be removed from the list?
    validationResults.removeUnitsNoLongerValid = [
      ...testIlahRiForRemoval, //
      ...testOldHeroForRemoval,
      ...testOreaVanarMasterRemoval,
      ...testThanarilCovenRemoval,
    ];

    return validationResults;
  },
};

//SPECIAL FACTION RULES

//Function calculates the max number of "Old Heroes". The number of Old Heroes is calculated differently from anything else in the game - the player can take 1 old hero per 5 Thanaril and/or Ilah Ri units ("Thanaril-Kriegerbünde" do not count!).
const numberOfOldHeroes = (selectedUnits, availableUnits) => {
  const MESSAGE = ELVES.ERRORS.OLD_HERO_MESSAGE;

  let result = [];

  // the old heroes must start blocked
  availableUnits
    .filter((u) => u.subFaction === ELVES.SF.OLD_HERO)
    .forEach((u) => {
      result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
    });

  // unblock if condition is met
  const numberOldHeroesAlreadySelected = selectedUnits.filter((su) => su.subFaction === ELVES.SF.OLD_HERO).length;
  const allowance = allowedNumberOldHeroes(selectedUnits);

  if (numberOldHeroesAlreadySelected < allowance) {
    result = [];
  }

  return result;
};

/**
 * Function implements the second part of the Old Heroes rule:
 * if the army list no longer contains enough Ilah Ri and/or Thanaril units,
 * the function removes a number of Old Heroes, starting with the last one picked,
 * unitl the rule is no longer broken.
 * @param {[unitCard]} validationData.selectedUnits
 * @returns an array of units that need to be removed from the army list automatically.
 */
const oldHeroRemove = (selectedUnits) => {
  let result = [];

  const numberOldHeroesAlreadySelected = selectedUnits.filter((su) => su.subFaction === ELVES.SF.OLD_HERO).length;
  const allowance = allowedNumberOldHeroes(selectedUnits);

  if (numberOldHeroesAlreadySelected > allowance) {
    let difference = numberOldHeroesAlreadySelected - allowance;

    for (let i = selectedUnits.length - 1; i >= 0; i--) {
      if (selectedUnits[i].subFaction === ELVES.SF.OLD_HERO && difference > 0) {
        result.push(selectedUnits[i]);
        --difference;
      }
    }
  }

  return result;
};

// Function calculates the maximum number of Old Hero units allowed in the current army list.
const allowedNumberOldHeroes = (selectedUnits) => {
  const UNITS_PER_HERO = 5;
  const relevantSubFactions = [ELVES.SF.THANARIEL_CLAN_TROOPS, ELVES.SF.ILAH_RI];

  const countRelevantUnits = selectedUnits.filter((su) => su.unitType === UNIT && relevantSubFactions.includes(su.subFaction)).length;
  return parseInt(countRelevantUnits / UNITS_PER_HERO);
};

const oreaVanarMapping = [
  { school: "Avandril Bellir", master: "Der Junge" },
  { school: "Galorea", master: "Die Wahrheit (Meisterin)" },
  { school: "Til Dolandor", master: "Der Handwerker" },
];

/**
 * Function calculates the number of units of the Orea Vanar.
 * In addition to the point cost, every school (unit) of the Orea Vanar can only be picked once.
 * The Masters (heroes) can only be picked if the corresponding school has already been picked.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const OreaVanarRules = (selectedUnits) => {
  let result = [];

  const selectedUnitNames = selectedUnits.map((u) => u.unitName);

  oreaVanarMapping.forEach((ovm) => {
    if (!selectedUnitNames.includes(ovm.school)) {
      result.push({ unitBlockedbyRules: ovm.master, message: ELVES.ERRORS.MASTERS_MESSAGE(ovm.school) });
    } else {
      result.push({ unitBlockedbyRules: ovm.school, message: ELVES.ERRORS.SCHOOLS_MESSAGE });
    }
  });

  return result;
};

/**
 * Function implements the second part of the Orea Vanar rule:removes masters from the army list if the relevant school is no longer selected.
 * @param {[unitCards]} selectedUnits
 * @returns  array of unitCard Objects to be removed from the army list.
 */
const removeOreaVanar = (selectedUnits) => {
  let result = [];
  let found = [];

  selectedUnits.forEach((u) => {
    oreaVanarMapping.forEach((ovm) => {
      if (ovm.master === u.unitName) {
        found.push(u.unitName);
      }
      if (ovm.school === u.unitName) {
        found.push(u.unitName);
      }
    });
  });

  oreaVanarMapping.forEach((ovm) => {
    if (!found.includes(ovm.school) && found.includes(ovm.master)) {
      result.push(selectedUnits.filter((u) => u.unitName === ovm.master)[0]);
    }
  });

  return result;
};

const heroesCovenantsMapping = [
  { lord: ELVES.ATHULAE, units: [ELVES.ARROW_LORDS] },
  { lord: ELVES.LAURELION, units: [ELVES.SWORD_MASTERS] },
  { lord: ELVES.THINUVIEL, units: [ELVES.FORREST_RIDERS] },
  { lord: ELVES.TERLOR, units: [ELVES.PEGASI] },
  { lord: ELVES.FARENDIL, units: [ELVES.BADGERS] },
  { lord: ELVES.KELAH, units: [ELVES.UNICORN_RIDERS] },
];

/**
 * Function calculates the number of units that are Thanariel Covens (Thanaril-Kriegerbünde). A player can freely pick the first unit of a coven. However, in order to pick additional units of a coven, the player must pick the corresponding hero first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const thanarilCovenRule = (selectedUnits) => {
  const MESSAGE = ELVES.ERRORS.THANARIEL_COVEN_MESSAGE;

  let result = [];

  const selectedCovens = selectedUnits
    .filter((u) => u.unitType === UNIT && u.subFaction === ELVES.SF.THANARIEL_COVENS)
    .map((u) => u.unitName);

  const selectedCovenHeroes = selectedUnits
    .filter((u) => (u.unitType === MAGE || u.unitType === HERO) && u.subFaction === ELVES.SF.THANARIEL_COVENS)
    .map((u) => u.unitName);

  for (let i = 0; i < heroesCovenantsMapping.length; i++) {
    const mapping = heroesCovenantsMapping[i];

    for (let j = 0; j < selectedCovens.length; j++) {
      const CovenUnit = selectedCovens[j];

      if (mapping.units.includes(CovenUnit) && !selectedCovenHeroes.includes(mapping.lord)) {
        result.push({ unitBlockedbyRules: CovenUnit, message: MESSAGE });
      }
    }
  }

  return result;
};

/**
 * Function implements the second part of the Coven rule: if a Thanaril hero is removed and there is more than one unit of the same coven present in the list, it must be removbed automatically.
 * @param {[unitCard]} selectedUnits
 * @returns an array of units that need to be removed from the army list automatically.
 */
const removeThanarilCoven = (selectedUnits) => {
  let result = [];
  let foundLords = [];
  let foundCovens = [];

  heroesCovenantsMapping.forEach((m) => {
    foundLords.push(...selectedUnits.map((u) => u.unitName).filter((u) => u === m.lord));
    foundCovens.push(...selectedUnits.map((u) => u.unitName).filter((u) => m.units.includes(u)));
  });

  heroesCovenantsMapping.forEach((m) => {
    if (!foundLords.includes(m.lord) && foundCovens.filter((c) => m.units.includes(c)).length > 1) {
      const supernumeralCovens = selectedUnits.filter((u) => m.units.includes(u.unitName));
      result.push(supernumeralCovens[0]);
    }
  });

  return result;
};

/**
 * Function implements the rule for the Ilah Ri / Council Army. Ilah Ri units can only be selected if at least one Ila Ri hero has been selected first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const councilArmyRule = (selectedUnits, availableUnits) => {
  const MESSAGE = ELVES.ERRORS.ILAH_RI_COMMANDER_MESSAGE;
  const ILAH_RI_HEROES = findUnits(availableUnits, ELVES.SF.ILAH_RI, [HERO, MAGE]);
  const isIlaRiHeroPresent = areGivenUnitsPresent(selectedUnits, ILAH_RI_HEROES);

  let result = [];

  if (!isIlaRiHeroPresent) {
    availableUnits
      .filter((u) => u.subFaction === ELVES.SF.ILAH_RI && (u.unitType === UNIT || u.unitType === GIANT))
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
      });
  }
  return result;
};

/**
 * Function implements the rule for the Ilah Ri / Council Army:
 * if the army list contains no Ilah Ri heroes but
 * still contains Ilah Ri units, they are removed.
 * @param {[unitCard]} selectedUnits
 * @returns array of units that need to be removed from the army list automatically.
 */
const councilArmyRemove = (availableUnits, selectedUnits) => {
  const ILAH_RI_HEROES = findUnits(availableUnits, ELVES.SF.ILAH_RI, [HERO, MAGE]);

  let isIlaRiHeroPresent = areGivenUnitsPresent(selectedUnits, ILAH_RI_HEROES);

  let result = [];

  if (!isIlaRiHeroPresent) {
    selectedUnits
      .filter((u) => u.subFaction === ELVES.SF.ILAH_RI)
      .forEach((u) => {
        result.push(u);
      });
  }
  return result;
};

/**
 * Function implements the "Ents vs. Centaur" Rule. An Elven Army can contain either ents OR centaurs up to the given percentage.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const entsOrCentaurs = (selectedUnits, availableUnits) => {
  const MESSAGE = ELVES.ERRORS.TREANTS_CENTAUR;
  const FACTIONS = [ELVES.SF.TREELORDS, ELVES.SF.CENTAURS];

  let result = [];

  let presentFaction = selectedUnits.filter((u) => FACTIONS.includes(u.subFaction)).map((u) => u.subFaction)[0];

  if (presentFaction !== undefined) {
    const blockedFaction = FACTIONS.filter((f) => !presentFaction.includes(f))[0];

    availableUnits
      .filter((u) => u.subFaction === blockedFaction)
      .forEach((u) => {
        result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
      });
  }

  return result;
};

export { ElfRules, rules };
