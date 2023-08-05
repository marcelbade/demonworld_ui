/* TODO SQL: the giant mummy and the "Werkstatt", "altar der Totenbeschwörer" are unique!
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

import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "lesserCovenant",
    cardNames: ["Kleiner Bund "],
    min: 0.2,
    max: 0.7,
    error: "Deine Armeeliste muss zu mindestens 30% aus Einheiten bestehen.",
  },

  {
    subFaction: "greaterCovenant",
    cardNames: ["Großer Bund"],
    min: 0.15,
    max: 0.5,
    error: "Deine Armeeliste darf zu höchstens 50% aus Helden bestehen.",
  },

  {
    subFaction: "shadowCovenant",
    cardNames: ["Schattenbund"],
    min: 0.0,
    max: 0.3,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Gaeta bestehen.",
  },
  {
    subFaction: "heroes",
    cardNames: ["Helden/Befehlshaber"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 40% aus Einheiten aus Zah'ra bestehen.",
  },
  {
    subFaction: "magician",
    cardNames: ["Magier"],
    min: 0.0,
    max: 0.4,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },

  {
    subFaction: "ally",
    cardNames: ["Isthak"],
    min: 0.0,
    max: 0.2,
    error: "Deine Armeeliste darf zu höchstens 20% aus Einheiten aus Alliierten bestehen.",
  },
];

const MAX_HERO_PERCENTAGE = 40;

const UndeadRules = {
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

//FACTION SPECIAL RULES

// // necromancer or commander with commandStars >= 2 must be present
// const necromancerOrCommanderPresent = (selectedUnits, availableUnits) => {
//   const necromancers = ["Xarta die Verderbte", "Sandaur der Perfide", "Jiitis Eishand", "Mad’Agonor"];
//   return selectedUnits.filter((selectedUnit) => selectedUnit.commandStars >= 2 || necromancers.includes(selectedUnit.unitName)) > 0;
// };

/**
 * The army list can have a maximum of 50% characters.
 */
// eslint-disable-next-line
const maxLimitForAllChars = (availableUnits, selectedUnits, maxArmyPoints) => {
  let characterSubFactions = ["Sturmlord", "Hexe", "Helden", " Befehlshaber"];
  let sum = 0;
  let result = [];
  const MESSAGE = "Die Armeekann zu max. 50% aus Hexen, Sturmlords, Befehlshabern und Helden bestehen!";

  selectedUnits
    .filter((unit) => characterSubFactions.includes(unit.subFaction))
    .forEach((characterUnit) => {
      sum += characterUnit.points;
    });

  availableUnits.forEach((availableUnit) => {
    if (availableUnit.points + sum > 0.5 * maxArmyPoints) {
      result.push({ unitBlockedbyRules: availableUnit.unitName, message: MESSAGE });
    }
  });

  // TODO: mach das fertig :D
};

// legal allies
// eslint-disable-next-line
const limitAllies = (availlableAlliedUnits) => {};

export { UndeadRules, rules };
