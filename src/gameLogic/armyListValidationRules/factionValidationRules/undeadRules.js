/*  
 *
 *Eine Armee der Untoten darf nicht mehr als 50% der Gesamtpunktzahl für
Helden, Befehlshaber und Magier ausgeben. Sie muss mindestens einen
Totenbeschwörer oder einen ** Befehlshaber enthalten.

Für die Rekrutierung isthakischer Alliierter können nur Rekrutierungskarten
aus dem Armeebuch Isthak aus den Kategorien Menschen (aber keine
Schwarzmagier), Tiermenschen und Eishexen aufgestellt werden. Die
Rekrutierungsregeln aus dem Armeebuch Isthak gelten dabei nicht. Es ist zum
Beispiel erlaubt, ausschließlich Einheiten und Charaktere der Eishexen oder der
Tiermenschen aufzustellen. Allerdings können keine Schwarzmagier, Dämonen oder
Eisriesen aufgestellt werden.
 * */

import { UNDEAD } from "../../../constants/textsAndMessages";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "lesserCovenant",
    cardNames: ["Kleiner Bund "],
    min: 0.2,
    max: 0.7,
    error: UNDEAD.SUB_FACTION_RULES.LESSER_COVENANT,
  },

  {
    subFaction: "greaterCovenant",
    cardNames: ["Großer Bund"],
    min: 0.15,
    max: 0.5,
    error: UNDEAD.SUB_FACTION_RULES.GREATER_COVENANT,
  },

  {
    subFaction: "shadowCovenant",
    cardNames: ["Schattenbund"],
    min: 0.0,
    max: 0.3,
    error: UNDEAD.SUB_FACTION_RULES.SHADOW_COVENANT,
  },
  {
    subFaction: "heroes",
    cardNames: ["Helden/Befehlshaber"],
    min: 0.0,
    max: 0.4,
    error: UNDEAD.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "magician",
    cardNames: ["Magier"],
    min: 0.0,
    max: 0.4,
    error: UNDEAD.SUB_FACTION_RULES.MAGICIAN,
  },

  {
    subFaction: "ally",
    cardNames: ["Isthak"],
    min: 0.0,
    max: 0.2,
    error: UNDEAD.SUB_FACTION_RULES.ALLY,
  },
];

const UndeadRules = {
  testSubFactionRules: (
    validationData 
  ) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(validationData.selectedUnits, validationData.availableUnits, validationData.totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, validationData.selectedUnits, validationData.totalPointsAllowance, validationData.subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits);
    let hasNoCommander = isUndeadArmyCommanderPresent(validationData.selectedUnits);
    let hasBlockedAllies = validIshtakAllies(validationData.listOfAlliedUnits);

    // tournament rules
    let maxCopies;
    let heroPointCap;

    if (validationData.tournamentOverrideRules.enableOverride) {
      maxCopies = validationData.tournamentOverrideRules.maxNumber;
      heroPointCap = validationData.tournamentOverrideRules.maxHeroValue;
    } else {
      maxCopies = 2;
      // faction rule => 50% cap
      heroPointCap = 50;
    }

    let testForMax2Result = globalRules.maximumCopiesOfUnit(validationData.selectedUnits, maxCopies);
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(validationData.selectedUnits, validationData.totalPointsAllowance, validationData.availableUnits, heroPointCap);

    let hasDuplicateUniques = validationData.tournamentOverrideRules.uniquesOnlyOnce //
      ? globalRules.noDuplicateUniques(validationData.selectedUnits)
      : [];
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

    validationResults.alliedUnitsBlockedbyRules = hasBlockedAllies;

    return validationResults;
  },
};

//FACTION SPECIAL RULES

const isUndeadArmyCommanderPresent = (selectedUnits) => {
  const necromancers = [
    "Xarta die Verderbte", //
    "Sandaur der Perfide",
    "Jiitis Eishand",
    "Mad'Agonor",
  ];

  const necromancerPresent = selectedUnits.filter((u) => necromancers.includes(u.unitName));
  const potentialCommanders = selectedUnits.filter((u) => u.commandStars >= 2);
  return necromancerPresent.length > 0 || potentialCommanders.length > 0;
};

const validIshtakAllies = (listOfAlliedUnits) => {
  const permittedSubFactions = ["Eishexen", "Tiermenschen", "Menschen"];
  const blockedUnits = ["Drogador", "Xarator", "Masdra Draizar"];
  const result = [];

  const blockedAlliedUnits = listOfAlliedUnits.filter(
    (a) => !permittedSubFactions.includes(a.subFaction) || blockedUnits.includes(a.unitName)
  );

  blockedAlliedUnits.forEach((aU) => {
    result.push({ unitBlockedbyRules: aU.unitName, message: UNDEAD.ERRORS.ALLIES });
  });

  return result;
};

export { UndeadRules, rules };
