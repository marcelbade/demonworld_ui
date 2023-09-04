/* TODO SQL: the giant mummy and the "Werkstatt", "Altar der Totenbeschwörer" are unique!
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

const MAX_HERO_PERCENTAGE = 40;

const UndeadRules = {
  testSubFactionRules: (availableUnits, selectedUnits, totalPointsAllowance, subFactions) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(selectedUnits, availableUnits, totalPointsAllowance);
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(rules, selectedUnits, totalPointsAllowance, subFactions);
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(rules, selectedUnits, totalPointsAllowance, availableUnits);
    let hasDuplicateUniques = globalRules.noDuplicateUniques(selectedUnits);
    let hasNoCommander = isUndeadArmyCommanderPresent(selectedUnits);

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

/**
 * The army list can have a maximum of 50% characters.
 */
const maxLimitForAllChars = (availableUnits, selectedUnits, maxArmyPoints) => {
  let characterSubFactions = ["Helden/Befehlshaber", "Magier"];
  let sum = 0;
  let result = [];

  selectedUnits
    .filter((unit) => characterSubFactions.includes(unit.subFaction))
    .forEach((characterUnit) => {
      sum += characterUnit.points;
    });

  availableUnits.forEach((availableUnit) => {
    if (availableUnit.points + sum > 0.5 * maxArmyPoints) {
      result.push({ unitBlockedbyRules: availableUnit.unitName, message: UNDEAD.ERRORS.MAX_LIMIT_CHARACTERS });
    }
  });

  return result;
};

const isUndeadArmyCommanderPresent = (selectedUnits) => {
  const necromancers = [
    "Xarta die Verderbte", //
    "Sandaur der Perfide",
    "Jiitis Eishand",
    "Mad'Agonor",
  ];

  const necromancerPresent = selectedUnits.filter((u) => necromancers.includes(u.unitName));
  const potentialCommanders = selectedUnits.filter((u) => u.commandStars >= 2);
  return necromancerPresent.length > 0 && potentialCommanders.length > 0;
};

const validIshtakAllies = () => {
  const permitted = ["icewitches", "beastmen", "humans"];
  // not permitted
  const blackWizards = ["Drogador", "Xarator", "Masdra Draizar"];

    


};

export { UndeadRules, rules };
