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

// functions and components
import globalRules from "../globalValidationRules/globalValidationRules";
import { mercenaryValidationRules } from "../globalValidationRules/mercenaryValidationRules";
import validationResults from "./validationResultsObjectProvider";
// constants
import { UNDEAD_TEXTS } from "../../../constants/textsAndMessages";

const rules = [
  {
    subFaction: "lesserCovenant",
    cardNames: ["Kleiner Bund "],
    min: 0.2,
    max: 0.7,
    error: UNDEAD_TEXTS.SUB_FACTION_RULES.LESSER_COVENANT,
  },

  {
    subFaction: "greaterCovenant",
    cardNames: ["Großer Bund"],
    min: 0.15,
    max: 0.5,
    error: UNDEAD_TEXTS.SUB_FACTION_RULES.GREATER_COVENANT,
  },

  {
    subFaction: "shadowCovenant",
    cardNames: ["Schattenbund"],
    min: 0.0,
    max: 0.3,
    error: UNDEAD_TEXTS.SUB_FACTION_RULES.SHADOW_COVENANT,
  },
  {
    subFaction: "heroes",
    cardNames: ["Helden/Befehlshaber"],
    min: 0.0,
    max: 0.4,
    error: UNDEAD_TEXTS.SUB_FACTION_RULES.HEROES,
  },
  {
    subFaction: "magician",
    cardNames: ["Magier"],
    min: 0.0,
    max: 0.4,
    error: UNDEAD_TEXTS.SUB_FACTION_RULES.MAGICIAN,
  },

  {
    subFaction: "ally",
    cardNames: ["Isthak"],
    min: 0.0,
    max: 0.2,
    error: UNDEAD_TEXTS.SUB_FACTION_RULES.ALLY,
  },
];

const UndeadRules = {
  testSubFactionRules: (validationData) => {
    //  general rules
    let isExceedingPointAllowance = globalRules.armyMustNotExceedMaxAllowance(
      validationData.selectedUnits,
      validationData.availableUnits,
      validationData.totalPointsAllowance,
    );
    let isBelowSubFactionMin = globalRules.unitsBelowSubfactionMinimum(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.distinctSubFactions,
    );
    let isAboveSubFactionMax = globalRules.unitsAboveSubFactionMax(
      rules,
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits,
    );
    let hasNoCommander = isUndeadArmyCommanderPresent(validationData.selectedUnits);
    let hasBlockedAllies = validIsthakAllies(validationData.listOfAlliedUnits);

    let hasFireUnits = mercenaryValidationRules.containsfireUnits(validationData.selectedUnits, validationData.availableUnits);

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
    let testForHeroCapResult = globalRules.belowMaxPercentageHeroes(
      validationData.selectedUnits,
      validationData.totalPointsAllowance,
      validationData.availableUnits,
      heroPointCap,
    );

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
      ...hasFireUnits,
    ];
    // result for sub factions below limit.
    validationResults.invalidSubFactions = [...isBelowSubFactionMin, ...hasNoCommander];

    validationResults.alliedUnitsBlockedbyRules = hasBlockedAllies;

    return validationResults;
  },
};

//FACTION SPECIAL RULES

const isUndeadArmyCommanderPresent = (selectedUnits, availableUnits, rules) => {
  let result = [];

  const necromancers = [
    UNDEAD_TEXTS.NECROMANCERS.JIITIS,
    UNDEAD_TEXTS.NECROMANCERS.MAD_AGONOR,
    UNDEAD_TEXTS.NECROMANCERS.SANDAUR,
    UNDEAD_TEXTS.NECROMANCERS.XARTA,
  ];

  const selectedCommanders = selectedUnits.filter((u) => u.commandStars >= 2 || necromancers.includes(u.unitName));

  if (selectedCommanders.length > 0) {
    return []; // list already contains commander
  }

  let subFactionsWithCommanders = availableUnits //
    .filter((u) => u.commandStars >= 2 || necromancers.includes(u.unitName))
    .map((availableCommander) => availableCommander.subFaction);

  // remove duplicates!
  subFactionsWithCommanders = [...new Set(subFactionsWithCommanders)];

  subFactionsWithCommanders.forEach((subFaction) => {
    // find card names !
    rules.forEach((rule) =>
      rule.cardNames.includes(subFaction)
        ? result.push({
            invalidSubFaction: rule.cardNames, //
            message: UNDEAD_TEXTS.SUB_FACTION_RULES.UNDEAD_COMMANDER,
          })
        : null,
    );
  });

  return result;
};

const validIsthakAllies = (listOfAlliedUnits) => {
  const permittedSubFactions = [
    UNDEAD_TEXTS.SUBFACTIONS.BEASTMEN, //
    UNDEAD_TEXTS.SUBFACTIONS.HUMANS,
    UNDEAD_TEXTS.SUBFACTIONS.ICEWITCHES,
  ];
  const blockedUnits = ["Drogador", "Xarator", "Masdra Draizar"]; // TODO Config file?!
  const result = [];

  const blockedAlliedUnits = listOfAlliedUnits.filter(
    (a) => !permittedSubFactions.includes(a.subFaction) || blockedUnits.includes(a.unitName),
  );

  blockedAlliedUnits.forEach((aU) => {
    result.push({
      unitBlockedbyRules: aU.unitName, //
      subFaction: aU.subFaction,
      message: UNDEAD_TEXTS.ERRORS.ALLIES,
    });
  });

  return result;
};

export { UndeadRules, rules };
