//  functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";
//  constants
import { ELF_TEXTS } from "../../../constants/textsAndMessages";
import { GIANT, HERO, MAGE, UNIT } from "../../../constants/unitTypes";

const rules = [
  {
    subFaction: "ThanarielClantroops",
    cardNames: [ELF_TEXTS.SF.THANARIEL_CLAN_TROOPS],
    min: 0.3,
    max: 0.7,
    error: ELF_TEXTS.SUB_FACTION_RULES.THANARIL_CLAN_TROOPS,
  },

  {
    subFaction: "ThanarielCovens",
    cardNames: ["Thanaril-Kriegerbünde"],
    min: 0.0,
    max: 0.3,
    error: ELF_TEXTS.SUB_FACTION_RULES.THANARIL_COVENS,
  },

  {
    subFaction: "ThanarielClanlordsAndBards",
    cardNames: [ELF_TEXTS.SF.THANARIEL_CLANLORDS_AND_BARDS],
    min: 0.0,
    max: 0.3,
    error: ELF_TEXTS.SUB_FACTION_RULES.THANARIL_CLAN_LORDS,
  },

  {
    subFaction: "Dyrea/Loreath",
    cardNames: [ELF_TEXTS.SF.DYREA_LOREATH],
    min: 0.0,
    max: 0.4,
    error: ELF_TEXTS.SUB_FACTION_RULES.LOREATH_DYREA,
  },

  {
    subFaction: "Ilah Ri", // Council Army
    cardNames: [ELF_TEXTS.SF.ILAH_RI],
    min: 0.0,
    max: 0.5,
    error: ELF_TEXTS.SUB_FACTION_RULES.ILAH_RI,
  },

  {
    subFaction: "Orea Vanar",
    cardNames: [ELF_TEXTS.SF.OREA_VANAR],
    min: 0.0,
    max: 0.3,
    error: ELF_TEXTS.SUB_FACTION_RULES.OREA_VANAR,
  },
  {
    subFaction: "Treelords",
    cardNames: [ELF_TEXTS.SF.TREELORDS],
    min: 0.0,
    max: 0.25,
    error: ELF_TEXTS.SUB_FACTION_RULES.TREANTS,
  },
  {
    subFaction: "Centaurs",
    cardNames: [ELF_TEXTS.SF.CENTAURS],
    min: 0.0,
    max: 0.25,
    error: ELF_TEXTS.SUB_FACTION_RULES.CENTAURS,
  },
  {
    subFaction: "Old Hero",
    cardNames: [ELF_TEXTS.SF.OLD_HERO],
    min: 0.0,
    max: 0.25,
    error: ELF_TEXTS.SUB_FACTION_RULES.OLD_HERO,
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
    let testIlahRiForRemoval = councilArmyRemove(validationData.selectedUnits);
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

/**
 * Function calculates the max number of "Old Heroes"a player may pick.
 * The number of Old Heroes is calculated differently
 * from anything else in the game. The player can take
 * 1 old hero per 5 Thanaril and/or Ilah Ri units
 * ("Thanaril-Kriegerbünde" do not count!).
 * @param {*} selectedUnits
 * @param {*} availableUnits
 * @returns
 */
const numberOfOldHeroes = (selectedUnits, availableUnits) => {
  const MESSAGE = ELF_TEXTS.ERRORS.OLD_HERO_MESSAGE;

  let result = [];

  // the old heroes must start blocked
  availableUnits
    .filter((u) => u.subFaction === ELF_TEXTS.SF.OLD_HERO)
    .forEach((u) => {
      result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
    });

  // unblock if condition is met
  const numberOldHeroesAlreadySelected = selectedUnits.filter((su) => su.subFaction === ELF_TEXTS.SF.OLD_HERO).length;
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

  const numberOldHeroesAlreadySelected = selectedUnits.filter((su) => su.subFaction === ELF_TEXTS.SF.OLD_HERO).length;
  const allowance = allowedNumberOldHeroes(selectedUnits);

  // TODO: replace with while loop, see neanderRemove
  if (numberOldHeroesAlreadySelected > allowance) {
    let difference = numberOldHeroesAlreadySelected - allowance;

    for (let i = selectedUnits.length - 1; i >= 0; i--) {
      if (selectedUnits[i].subFaction === ELF_TEXTS.SF.OLD_HERO && difference > 0) {
        result.push(selectedUnits[i].uniqueID);
        --difference;
      }
    }
  }

  return result;
};

// Function calculates the maximum number of Old Hero units allowed in the current army list.
const allowedNumberOldHeroes = (selectedUnits) => {
  const UNITS_PER_HERO = 5;
  const relevantSubFactions = [ELF_TEXTS.SF.THANARIEL_CLAN_TROOPS, ELF_TEXTS.SF.ILAH_RI];

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
      result.push({ unitBlockedbyRules: ovm.master, message: ELF_TEXTS.ERRORS.MASTERS_MESSAGE(ovm.school) });
    } else {
      result.push({ unitBlockedbyRules: ovm.school, message: ELF_TEXTS.ERRORS.SCHOOLS_MESSAGE });
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
        found.push(u.uniqueID);
      }
    });
  });

  oreaVanarMapping.forEach((ovm) => {
    if (!found.includes(ovm.school) && found.includes(ovm.master)) {
      const foundUnit = selectedUnits.find((u) => u.unitName === ovm.master);
      result.push(foundUnit.unitName);
    }
  });

  return result;
};

const heroesCovenantsMapping = [
  { lord: ELF_TEXTS.ATHULAE, units: [ELF_TEXTS.ARROW_LORDS] },
  { lord: ELF_TEXTS.LAURELION, units: [ELF_TEXTS.SWORD_MASTERS] },
  { lord: ELF_TEXTS.THINUVIEL, units: [ELF_TEXTS.FORREST_RIDERS] },
  { lord: ELF_TEXTS.TERLOR, units: [ELF_TEXTS.PEGASI] },
  { lord: ELF_TEXTS.FARENDIL, units: [ELF_TEXTS.BADGERS] },
  { lord: ELF_TEXTS.KELAH, units: [ELF_TEXTS.UNICORN_RIDERS] },
];

/**
 * Function calculates the number of units that are Thanariel Covens (Thanaril-Kriegerbünde). A player can freely pick the first unit of a coven. However, in order to pick additional units of a coven, the player must pick the corresponding hero first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const thanarilCovenRule = (selectedUnits) => {
  const message = ELF_TEXTS.ERRORS.THANARIEL_COVEN_MESSAGE;

  let result = [];

  const selectedCovens = selectedUnits
    .filter((u) => u.unitType === UNIT && u.subFaction === ELF_TEXTS.SF.THANARIEL_COVENS)
    .map((u) => u.unitName);

  const selectedCovenHeroes = selectedUnits
    .filter((u) => (u.unitType === MAGE || u.unitType === HERO) && u.subFaction === ELF_TEXTS.SF.THANARIEL_COVENS)
    .map((u) => u.unitName);

  for (let i = 0; i < heroesCovenantsMapping.length; i++) {
    const mapping = heroesCovenantsMapping[i];

    for (let j = 0; j < selectedCovens.length; j++) {
      const CovenUnit = selectedCovens[j];

      if (mapping.units.includes(CovenUnit) && !selectedCovenHeroes.includes(mapping.lord)) {
        result.push({ unitBlockedbyRules: CovenUnit, message: message(mapping.lord) });
      }
    }
  }

  return result;
};

/**
 * Function implements the second part of the Coven rule: if a Thanaril hero is removed and there is more than one unit of the same coven present in the list, it must be removed automatically.
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
      const supernumeralCoven = selectedUnits.find((u) => m.units.includes(u.unitName));
      result.push(supernumeralCoven.uniqueID);
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
  const MESSAGE = ELF_TEXTS.ERRORS.ILAH_RI_COMMANDER_MESSAGE;
  const ILAH_RI_HEROES = ["Athulain Gilfar", "Generalin Caliar Ildriel"];

  let result = [];

  let isIlaRiHeroPresent = selectedUnits.filter((selectedUnits) => ILAH_RI_HEROES.includes(selectedUnits.unitName)).length > 0;

  if (!isIlaRiHeroPresent) {
    availableUnits
      .filter((u) => u.subFaction === "Ilah Ri" && (u.unitType === UNIT || u.unitType === GIANT))
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
const councilArmyRemove = (selectedUnits) => {
  const ILAH_RI_HEROES = ["Athulain Gilfar", "Generalin Caliar Ildriel"];
  let result = [];

  let isIlaRiHeroPresent = selectedUnits.filter((u) => ILAH_RI_HEROES.includes(u.unitName)).length > 0;

  if (!isIlaRiHeroPresent) {
    selectedUnits
      .filter((u) => u.subFaction === ELF_TEXTS.SF.ILAH_RI)
      .forEach((u) => {
        result.push(u.uniqueID);
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
  const MESSAGE = ELF_TEXTS.ERRORS.TREANTS_CENTAUR;
  const FACTIONS = [ELF_TEXTS.SF.TREELORDS, ELF_TEXTS.SF.CENTAURS];

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
