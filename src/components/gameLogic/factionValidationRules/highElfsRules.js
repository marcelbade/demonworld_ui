import globalRules from "../globalRules/globalRules";

const rules = [
  {
    subFaction: "ThanarilTroops",
    cardNames: ["Thanaril"],
    min: 0.3,
    max: 0.7,
    error: "Deine Armeeliste darf zu höchstens 70% aus Thanariltruppen bestehen",
  },

  {
    subFaction: "ThanarielCovens",
    cardNames: ["Thanaril-Kriegerbd", "Held/Befehlsh. Kriegerbd"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Kriegerbünden und Ihren Anführern bestehen.",
  },

  {
    subFaction: "ThanarilCommanders",
    cardNames: ["Befehlshaber Thanaril", "Barde"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Thanaril-Befehlshabern, -Lords und Barden bestehen.",
  },
  {
    subFaction: "treelords",
    cardNames: ["Baumherren"],
    min: 0.0,
    max: 0.25,
    error: "Deine Armeeliste darf zu höchstens 25% aus Einheiten aus Baumherren bestehen.",
  },
  {
    subFaction: "CouncilArmyAndCommanders",
    cardNames: ["Ilah Ri/Ratsarmee", "Befehlshaber/Ilah Ri/Ratsarmee"],
    min: 0.0,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten und Anführern der Ratsarmee bestehen.",
  },
  {
    subFaction: "Dyrea/Loreath",
    cardNames: ["Loreath", "Dyrea"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten der Dyrea und Loreath bestehen.",
  },

  {
    subFaction: "Orea Vanar",
    cardNames: [
      "Orea Vanar/Ratsarmee",
      "Orea Vanar/Ratsarmee/Avandril Bellir",
      "Orea Vanar/Ratsarmee/Galorea",
      "Orea Vanar/Ratsarmee/Til Dolandor",
    ],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 30% aus Einheiten der Orea Vanar bestehen.",
  },
  {
    subFaction: "Zentauren",
    cardNames: ["Zentauren"],
    min: 0.0,
    max: 0.25,
    error: "Deine Armeeliste darf zu höchstens 25% aus Einheiten der Zentauren bestehen.",
  },
];

const validationResults = {
  unitsBlockedbyRules: [],
  subFactionBelowMinimum: [],
  commanderIsPresent: false,
};

const ElveRules = {
  testSubFactionRules: (availableUnits, selectedUnits, maxArmyPoints) => {
    // elven special rules

    let oreaMasterResult = OraVanarMasterRule(selectedUnits);
    let entsOrCentaursResult = entsOrCentaurs(selectedUnits, availableUnits);
    let councilArmyResult = councilArmyRule(selectedUnits, availableUnits);
    let thanarilRuleResult = ThanarilCovenantCharRule(selectedUnits, availableUnits);

    let oldHeroResult = numberOfOldHeroes(selectedUnits, availableUnits);

    //tournament rules
    let twoRuleResult = globalRules.maximumOfTwo(selectedUnits);
    let heroRuleResult = globalRules.maxOf35PercentHeroes(selectedUnits, maxArmyPoints, availableUnits);
    //  general rules
    let exceedingMaxResult = globalRules.BlockUnitsExceedingMaxPoints(rules, selectedUnits, maxArmyPoints, availableUnits);
    let DuplicateResult = globalRules.noDuplicateUniques(selectedUnits);
    //  check for sub faction below minimum
    let minimumResult = globalRules.subFactionsBelowMinimum(rules, selectedUnits, maxArmyPoints, availableUnits);

    //result for maximum limits
    validationResults.unitsBlockedbyRules = [
      ...oreaMasterResult,
      ...oldHeroResult,
      ...councilArmyResult,
      ...entsOrCentaursResult,
      ...thanarilRuleResult,
      ...DuplicateResult,
      ...heroRuleResult,
      ...twoRuleResult,
      ...exceedingMaxResult,
    ];
    validationResults.subFactionBelowMinimum = minimumResult;
    validationResults.commanderIsPresent = globalRules.isArmyCommanderPresent(selectedUnits);

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

export default ElveRules;
