import { GIANT, HERO, MAGE, UNIT } from "../../../constants/unitTypes";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "ThanarielClantroops",
    cardNames: ["Thanaril"],
    min: 0.3,
    max: 0.7,
    error: "Deine Armeeliste muss zu 30% bis 70% aus Thanaril-Clantruppen bestehen.",
  },

  {
    subFaction: "ThanarielCovens",
    cardNames: ["Thanaril-Kriegerbünde"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Kriegerbünden und Ihren Anführern bestehen.",
  },

  {
    subFaction: "ThanarielClanlordsAndBards",
    cardNames: ["Thanaril-Clanlords / Befehlshaber"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Kriegerbünden und Ihren Anführern bestehen.",
  },

  {
    subFaction: "Dyrea/Loreath",
    cardNames: ["Barde / Dyrea / Loreaths"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Dyrea und Loreath bestehen.",
  },

  {
    subFaction: "Ilah Ri", // Ratsarmee
    cardNames: ["Ilah Ri"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten und Anführern der Ratsarmee bestehen.",
  },

  {
    subFaction: "Orea Vanar",
    cardNames: ["Orea Vanar"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Einheiten der Orea Vanar bestehen.",
  },
  {
    subFaction: "Treelords",
    cardNames: ["Baumherren"],
    min: 0.0,
    max: 0.25,
    error: "Deine Armeeliste darf zu höchstens 25% aus Einheiten der Baumherren bestehen.",
  },
  {
    subFaction: "Centaurs",
    cardNames: ["Zentauren"],
    min: 0.0,
    max: 0.25,
    error: "Deine Armeeliste darf zu höchstens 25% aus Einheiten der Zentauren bestehen.",
  },
  {
    subFaction: "Old Hero",
    cardNames: ["Alter Held"],
    min: 0.0,
    max: 0.25,
    error: "SPECIAL",
  },
];

const MAX_HERO_PERCENTAGE = 40;

const ElfRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = globalRules.isArmyCommanderPresent(selectedUnits);

    // tournament rules
    let testForMax2Result = globalRules.maximumOfTwo(selectedUnits);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      selectedUnits,
      totalPointsAllowance,
      availableUnits,
      MAX_HERO_PERCENTAGE
    );

    // special faction rules
    let testForMaxNumberOldHeroes = numberOfOldHeroes(selectedUnits, availableUnits);
    let testForOreaVanarUnits = OreaVanarRules(selectedUnits);
    let testForThanarilCovenUnits = thanarilCovenRule(selectedUnits);
    let testForEntsVsCentaurs = entsOrCentaurs(selectedUnits, availableUnits);
    let testForIlahRi = councilArmyRule(selectedUnits, availableUnits);
    let testIlahRiForRemoval = councilArmyRemove(selectedUnits);
    let testOldHeroForRemoval = oldHeroRemove(selectedUnits);
    let testOreaVanarMasterRemoval = removeOreaVanar(selectedUnits);

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
    ];

    return validationResults;
  },
};

//SPECIAL FACTION RULES

//Function calculates the max number of "Old Heroes". The number of Old Heroes is calculated differently from anything else in the game - the player can take 1 old hero per 5 Thanaril and/or Ilah Ri units ("Thanaril-Kriegerbünde" do not count!).
const numberOfOldHeroes = (selectedUnits, availableUnits) => {
  const MESSAGE =
    "Du darfst höchstens einen alten Helden pro aufgestellten 5 Einheiten der Thanaril (keine Kriegerbünde) und/oder der Ilah Ri aufstellen";

  let result = [];

  // the old heroes must start blocked
  availableUnits
    .filter((u) => u.subFaction === "Alter Held")
    .forEach((u) => {
      result.push({ unitBlockedbyRules: u.unitName, message: MESSAGE });
    });

  // unblock if condition is met
  const numberOldHeroesAlreadySelected = selectedUnits.filter((su) => su.subFaction === "Alter Held").length;
  const allowance = allowedNumberOldHeroes(selectedUnits);

  if (numberOldHeroesAlreadySelected < allowance) {
    result = [];
  }

  return result;
};

/**
 * Function implements the rule Old Heroes:
 * if the army list contains not enough Ilah Ri and/or Thanaril units,
 * the function removes a number of Old Heroes, starting with the last one picked,
 * unitl the rule is no longer broken.
 * @param {[unitCard]} selectedUnits
 * @returns array of units that need to be removed from the army list automatically.
 */
const oldHeroRemove = (selectedUnits) => {
  let result = [];

  const numberOldHeroesAlreadySelected = selectedUnits.filter((su) => su.subFaction === "Alter Held").length;
  const allowance = allowedNumberOldHeroes(selectedUnits);

  if (numberOldHeroesAlreadySelected > allowance) {
    let difference = numberOldHeroesAlreadySelected - allowance;

    for (let i = selectedUnits.length - 1; i >= 0; i--) {
      if (selectedUnits[i].subFaction === "Alter Held" && difference > 0) {
        result.push(selectedUnits[i]);
        --difference;
      }
    }
  }

  return result;
};

// Function claculates the maximum number of Old Hero units allowed in the current army list.
const allowedNumberOldHeroes = (selectedUnits) => {
  const UNITS_PER_HERO = 5;
  const relevantSubFactions = ["Thanaril", "Ilah Ri"];

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
 * Regardless of the point cost, every school (unit) of the Orea Vanar can only be picked once.
 * The Masters (heroes) can only be picked if the corresponding school has already been picked.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const OreaVanarRules = (selectedUnits) => {
  const MESSAGE_MASTERS = "Ein Meister kann nur aufgestellt werden, wenn auch ihre Schule auf dem Schlachtfeld anwesend ist";
  const MESSAGE_SCHOOLS = "Jede Schule der Orea Vanar kann nur einmal aufgestellt werden";

  let result = [];

  const selectedUnitNames = selectedUnits.map((u) => u.unitName);

  oreaVanarMapping.forEach((ovm) => {
    if (!selectedUnitNames.includes(ovm.school)) {
      result.push({ unitBlockedbyRules: ovm.master, message: MESSAGE_MASTERS });
    } else {
      result.push({ unitBlockedbyRules: ovm.school, message: MESSAGE_SCHOOLS });
    }
  });

  return result;
};

/**
 * Function removes OreaVanar masters from the army list if the relevant school is no longer selected.
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

/**
 * Function calculates the number of units that are Thanariel Covens (Thanaril-Kriegerbünde). A player can freely pick the first unit of a coven. However, in order to pick additional units of a coven, the player must pick the corresponding hero first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const thanarilCovenRule = (selectedUnits) => {
  const heroesCovenantsMapping = [
    { lord: "Athulae der Pfeil", units: ["Pfeillords"] },
    { lord: "Laurelion das Schwert", units: ["Schwertmeister"] },
    { lord: "Thinuviel die Geschwinde", units: ["Waldreiter"] },
    { lord: "Terlor der Pegasus", units: ["Pegasusreiter"] },
    { lord: "Farendil der Dachs", units: ["Dachsleute"] },
    { lord: "Kelah das Einhorn", units: ["Einhorn-Elfenreiterinnen"] },
  ];

  const MESSAGE =
    "Eine zweite und weitere Einheiten desselben Kriegerbundes können nur aufgestellt werden, wenn auch der Anführer des betreffenden Kriegerbundes anwesend ist";

  let result = [];

  const selectedCovens = selectedUnits
    .filter((u) => u.unitType === UNIT && u.subFaction === "Thanaril-Kriegerbünde")
    .map((u) => u.unitName);

  const selectedCovenHeroes = selectedUnits
    .filter((u) => (u.unitType === MAGE || u.unitType === HERO) && u.subFaction === "Thanaril-Kriegerbünde")
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
 * Function implements the rule for the Ilah Ri / Council Army. Ilah Ri units can only be selected if at least one Ila Ri hero has been selected first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const councilArmyRule = (selectedUnits, availableUnits) => {
  const MESSAGE = "Du musst mindestens einen Ilah Ri Befehlshaber wählen um Einheiten der Ratsarmee aufstellen zu können.";
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

  let isIlaRiHeroPresent = selectedUnits.filter((selectedUnit) => ILAH_RI_HEROES.includes(selectedUnit.unitName)).length > 0;

  if (!isIlaRiHeroPresent) {
    selectedUnits
      .filter((u) => u.subFaction === "Ilah Ri")
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
  const MESSAGE = "Die Armee kann nur Baumherren oder Zentauren Einheiten enthalten.";
  let FACTIONS = ["Baumherren", "Zentauren"];

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
