import { searchMappingForMatch } from "../../components/shared/sharedFunctions";
import globalRules from "../globalRules/globalRules";

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
    error: "Deine Armeeliste darf zu höchstens 25% aus Einheiten aus Baumherren bestehen.",
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
    cardNames: ["alter Held"],
    min: 0.0,
    max: 0.25,
    error: "SPECIAL",
  },
];

const MAX_HERO_PERCENTAGE = 40;

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const ElveRules = {
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
    let testForThanarilCovenUnits = thanarilCovenantRule(selectedUnits, availableUnits);
    let testForEntsVsCentaurs = entsOrCentaurs(selectedUnits, availableUnits);
    let testForIlahRi = councilArmyRule(selectedUnits, availableUnits);

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
    // result for sub factions below limit.
    validationResults.subFactionBelowMinimum = isBelowSubFactionMin;

    // result - is a commander present?
    validationResults.commanderIsPresent = hasNoCommander;

    return validationResults;
  },
};

//SEPCIAL FACTION RULES

//Function calculates the max number of "Old Heores". The number of old heroes is calculated differently from anything else in the game - the player can take 1 old hero per 5 Thanaril and Ilah Ri units ("Thanaril-Kriegerbünde" do not count!).
const numberOfOldHeroes = (selectedUnits, availableUnits) => {
  const MESSAGE =
    "Du darfst höchstens einen alten Helden pro aufgestellten 5 Einheiten der Thanaril (keine Kriegerbünden oder Orea Vanar )" +
    "und/oder der Ratsarmee aufstellen";
  const UNITS_PER_HERO = 5;
  let result = [];
  let relevantSubFactions = ["ThanarielClantroops", "Ilah Ri"];

  let countRelevantUnits = selectedUnits.filter((selectedUnit) => relevantSubFactions.includes(selectedUnit.subFaction));
  let allowance = parseInt(countRelevantUnits / UNITS_PER_HERO);

  const numberOfOldHeroes = availableUnits
    .filter((availableUnit) => availableUnit.subFaction === "alter Held")
    .reduce((accumulator, numberOfHeroes) => accumulator + numberOfHeroes, 0);

  if (numberOfOldHeroes === allowance) {
    availableUnits
      .filter((availableUnit) => availableUnit.subFaction === "alter Held")
      .forEach((covenantUnit) => result.push({ unitBlockedbyRules: covenantUnit.unitName, message: MESSAGE }));
  }

  return result;
};

/**
 * Function calculates the number of units of the Orea Vanar. Regardless of the point cost, every school (unit) of the Orea Vanar can only be picked once.
 * The Masters (heroes) can only be picked if the corresponding school has already been picked.
 * @param {[unitCard]} selectedUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const OreaVanarRules = (selectedUnits) => {
  const OreaVanarMapping = {
    "Avandril Bellir": "der Junge",
    Galorea: "die Wahrheit (Meisterin)",
    "Til Dolandor": "Der Handwerker",
  };
  const SCHOOLS = ["Galorea", "Til Dolandor", "Avandril Bellir"];
  const MESSAGE_MASTERS = "Ein Meister kann nur aufgestellt werden, wenn auch ihre Schule auf dem Schlachtfeld anwesend ist";
  const MESSAGE_SCHOOLS = "Jede Schule der Orea Vanar kann nur einmal aufgestellt werden";

  let result = [];

  let selectedSchools = selectedUnits.filter((selectedUnit) => SCHOOLS.includes(selectedUnit.unitName));
  let notSelectedSchools = SCHOOLS.filter((x) => !selectedSchools.includes(x));

  if (notSelectedSchools.length > 0) {
    notSelectedSchools.forEach((nss) => {
      const blockedMaster = searchMappingForMatch(nss, OreaVanarMapping);
      result.push({ unitBlockedbyRules: blockedMaster, message: MESSAGE_MASTERS });
    });
  }

  if (selectedSchools.length > 0) {
    selectedSchools.forEach((s) => {
      result.push({ unitBlockedbyRules: s, message: MESSAGE_SCHOOLS });
    });
  }

  return result;
};

//TODO: not working properly.
/**
 * Function calculates the number of units that are Thanariel Covens. A player can freely pick the first unit of a coven. However, in order to pick additional units of a coven the player must pick the corresponding hero first.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const thanarilCovenantRule = (selectedUnits, availableUnits) => {
  const heroesCovenantsMapping = {
    Pfeillords: "Athulae der Pfeil",
    Schwertmeister: "Laurelion das Schwert",
    Waldreiter: "Thinuviel die Geschwinde",
    Pegasusreiter: "Terlor der Pegasus",
    Dachsleute: "Farendil der Dachs",
    "Einhorn-Elfenreiterinnen": "Kelah das Einhorn",
  };

  const MESSAGE =
    "Eine zweite und weitere Einheiten desselben Kriegerbundes können nur aufgestellt werden, wenn auch der Anführer des betreffenden Kriegerbundes anwesend ist";

  let isLeaderPresent = "";
  let result = [];

  selectedUnits.forEach((selectedUnit) => {
    const foundLeader = searchMappingForMatch(selectedUnit, heroesCovenantsMapping);

    if (foundLeader) {
      isLeaderPresent = selectedUnits.filter((selectedUnit) => selectedUnit.unitName === foundLeader) > 0;
    }
    if (!isLeaderPresent) {
      availableUnits
        .filter((availableUnit) => availableUnit.unitName === selectedUnit.unitName)
        .forEach((covenantUnit) => {
          result.push({ unitBlockedbyRules: covenantUnit.unitName, message: MESSAGE });
        });
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
  const MESSAGE = "Du musst mindestens einen Ilah Ri Befehlshaber wählen um Einheiten der Ratsarmee aufstellen zu können.";
  const ILAH_RI_HEROES = ["Athulain Gilfar", "Generalin Caliar Ildriel"];
  let result = [];
  let isIlaRiHeroPresent = selectedUnits.filter((selectedUnit) => ILAH_RI_HEROES.includes(selectedUnit.unitName)).length > 0;

  if (!isIlaRiHeroPresent) {
    availableUnits
      .filter((availableUnit) => availableUnit.subFaction === "Ilah Ri/Ratsarmee")
      .forEach((councilUnit) => {
        result.push({ unitBlockedbyRules: councilUnit.unitName, message: MESSAGE });
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

  for (let i = 0; i < selectedUnits.length; i++) {
    const selectedUnit = selectedUnits[i];
    if (FACTIONS.includes(selectedUnit.subFaction)) {
      FACTIONS = FACTIONS.filter((f) => f !== selectedUnit.subFaction);
      break;
    }
  }

  availableUnits.forEach((availableUnit) => {
    if (FACTIONS.includes(availableUnit.subFaction)) {
      result.push({ unitBlockedbyRules: availableUnit.unitName, message: MESSAGE });
    }
  });

  return result;
};

export { ElveRules, rules };
