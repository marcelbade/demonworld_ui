import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "ThanarielCovens",
    cardNames: ["Thanaril-Kriegerbd", "Thanaril"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Kriegerbünden und Ihren Anführern bestehen.",
  },

  {
    subFaction: "Treelords",
    cardNames: ["Baumherren"],
    min: 0.0,
    max: 0.25,
    error: "Deine Armeeliste darf zu höchstens 25% aus Einheiten aus Baumherren bestehen.",
  },
  {
    subFaction: "Ilah Ri",
    cardNames: ["Ilah Ri"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten und Anführern der Ratsarmee bestehen.",
  },
  {
    subFaction: "Dyrea/Loreath",
    cardNames: ["Barde / Dyrea / Loreaths"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Dyrea und Loreath bestehen.",
  },

  {
    subFaction: "Orea Vanar",
    cardNames: ["Orea Vanar"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Einheiten der Orea Vanar bestehen.",
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

    // special faction rules - no special rules for Goblins exist.

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

// number of old heroes is calculated differtently from ANYTHING ELSE in the game
const numberOfOldHeroes = (selectedUnits, availableUnits) => {
  // höchstens 1 pro aufgestellter 5 Einheiten der Thanaril (KEINE KRIEGERBÜNDE ; KEINE Orea Vanar ) und/oder der Ratsarmee
  const MESSAGE =
    "Du darfst höchstens einen alten Helden pro aufgestellten 5 Einheiten der Thanaril (keine Kriegerbünden oder Orea Vanar )" +
    "und/oder der Ratsarmee aufstellen";
  const UNITS_PER_HERO = 5;

  let result = [];

  let relevantSubFactions = ["ThanarilTroops", "CouncilArmyAndCommanders"];
  let countRelevantUnits = selectedUnits.filter((selectedUnit) => relevantSubFactions.includes(selectedUnit.subFaction));
  let allowance = parseInt(countRelevantUnits / UNITS_PER_HERO);

  const numberOfOldHeroes = availableUnits
    .filter((availableUnit) => availableUnit.subFaction === "alter Held")
    .reduce((accumulator, numberOfHeroes) => accumulator + numberOfHeroes, 0);

  if (numberOfOldHeroes > allowance) {
    availableUnits
      .filter((availableUnit) => availableUnit.subFaction === "alter Held")
      .forEach((covenantUnit) => result.push({ unitBlockedbyRules: covenantUnit.unitName, message: MESSAGE }));
  }

  return result;
};

const OraVanarMasterRule = (selectedUnits) => {
  const OreaVanarMapping = {
    "Avandril Bellir": "der Junge",
    Galorea: "die Wahrheit (Meisterin)",
    "Til Dolandor": "Der Handwerker",
  };
  const schools = ["Galorea", "Til Dolandor", "Avandril Bellir"];
  const MESSAGE = "Ein Meister kann nur aufgestellt werden, wenn auch ihre Schule auf dem Schlachtfeld anwesend ist";

  let result = [];

  let selectedSchools = selectedUnits.filter((selectedUnit) => schools.includes(selectedUnit.unitName));
  let missingSchools = schools.filter((x) => !selectedSchools.includes(x));

  if (missingSchools.length > 0) {
    missingSchools.forEach((missingSchool) => {
      const blockedMaster = searchMappingForMatch(missingSchool, OreaVanarMapping);
      result.push({ unitBlockedbyRules: blockedMaster, message: MESSAGE });
    });
  }

  return result;
};

//TODO refactor, please?!
const ThanarilCovenantCharRule = (selectedUnits, availableUnits) => {
  const heroesCovenantsMapping = {
    Pfeillords: "Athulae der Pfeil",
    Schwertmeister: "Laurelion das Schwert",
    Waldreiter: "Thinuviel die Geschwinde",
    Pegasusreiter: "Terlor der Pegasus",
    Dachsleute: "Farendil der Dachs",
    "Einhorn-Elfenreiterinnen": "Kelah das Einhorn",
  };

  const MESSAGE =
    "eine zweite und weitere Einheiten DESSELBEN Kriegerbundes können " +
    "nur aufgestellt werden, wenn  auch der Anführer des betreffenden Kriegerbundes anwesend ist";

  let isLeaderPresent = "";
  let result = [];

  selectedUnits.forEach((selectedUnit) => {
    const foundLeader = searchMappingForMatch(selectedUnit, heroesCovenantsMapping);

    if (foundLeader) {
      isLeaderPresent = findLeader(selectedUnit, foundLeader);
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

const searchMappingForMatch = (canditateUnit, mapping) => {
  let match = "";

  for (const unit in mapping) {
    if (Object.hasOwnProperty.call(mapping, unit)) {
      match = mapping[canditateUnit];
    }
  }
  return match;
};

const findLeader = (selectedUnits, foundLeader) => {
  return selectedUnits.filter((selectedUnit) => selectedUnit.unitName === foundLeader) > 0;
};

const councilArmyRule = (selectedUnits, availableUnits) => {
  const MESSAGE = "Du musst mindestens einen Ilah Ri Befehlshaber eingesetzen um Einheiten der Ratsarmee aufzustellen.";
  const heroes = ["Athulain Gilfar", "Generalin Caliar Ildriel"];
  let result = [];
  let councilUnitsAllowed = selectedUnits.filter((selectedUnit) => heroes.includes(selectedUnit.unitName)) > 0;

  if (councilUnitsAllowed) {
    availableUnits
      .filter((availableUnit) => availableUnit.subFaction === "Ilah Ri/Ratsarmee")
      .forEach((councilUnit) => {
        result.push({ unitBlockedbyRules: councilUnit.unitName, message: MESSAGE });
      });
  }
  return result;
};

const entsOrCentaurs = (selectedUnits, availableUnits) => {
  const MESSAGE = "Die Armee kann nur Baumherren oder Zentauren Einheiten enthalten.";

  let factions = ["Baumherren", "Zentauren"];
  let result = [];

  for (let i = 0; i < selectedUnits.length; i++) {
    const selectedUnit = selectedUnits[i];
    if (factions.includes(selectedUnit.subFaction)) {
      factions = factions.filter((march) => march !== selectedUnit.subFaction);
      break;
    }
  }

  availableUnits.forEach((availableUnit) => {
    if (factions.includes(availableUnit.subFaction)) {
      result.push({ unitBlockedbyRules: availableUnit.unitName, message: MESSAGE });
    }
  });

  return result;
};

export { ElveRules, rules };
