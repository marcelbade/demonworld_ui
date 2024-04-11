/**
Die zur Verfügung stehenden Punkte können bei einer Armee der Südlichen Stadtstaaten wie folgt verwendet werden:

1.	Provinzheer (einschließlich Persönlichkeiten)	mindestens 30%
	
2.	Truppen des Nordens (einschließlich Persönlichkeiten)	maximal 50%
	
3.	Truppen des Südens (einschließlich Persönlichkeiten) *	maximal 50%
	
			oder	
	
	Truppen Z'ahras (einschließlich Persönlichkeiten / keine Spezialtruppen Gaetas) *	maximal 20%
	
4.	Orden des wahren Glaubens (einschließlich Persönlichkeiten) **	maximal 40%
	
			oder	
	
	Bruderschaft des Sandes (einschließlich Persönlichkeiten) **	maximal 40%
	
*	Truppen des Südens können nicht gemeinsam mit Truppen des verbündeten Zwergenreiches Z'ahra aufgestellt werden.
**	Truppenkontingente des Ordens des wahren Glaubens und der Bruderschaft des Sandes sind nicht kombinierbar.
	
Außerdem sind folgende Beschränkungen und Regelungen zu beachten:	
	
Helden, Befehlshaber, Zauberer	maximal 40%
	
Großelemente	maximal 30% 
	
Jede Armee der Südlichen Stadtstaaten muss mindestens über einen menschlichen Befehlshaber mit '**' oder mehr verfügen. Ysastra und Arokles zählen in diesem Zusammenhang nicht als **-Befehlshaber.
	
Helden und Befehlshaber des Nordens (Südens) dürfen nur aufgestellt werden, wenn auch mindestens eine Einheit des Nordens (Südens) rekrutiert wird.
	
In den folgenden Kapiteln wird vereinzelt auf weitere Beschränkungen verwiesen, wie z. B. beim Phönix.
**/

import { SOUTHERN_CITY_STATES } from "../../../constants/textsAndMessages";
import { MAGE, HERO } from "../../../constants/unitTypes";
import globalRules from "../globalValidationRules/globalValidationRules";
import validationResults from "./validationResultsObjectProvider";

const rules = [
  {
    subFaction: "provinvialTroops",
    min: 0.3,
    max: 1.0,
    cardNames: ["Provinzheer"],
    error: SOUTHERN_CITY_STATES.SUB_FACTION_RULES.PROVINVIAL_TROOPS,
  },
  {
    subFaction: "northernTroops",
    min: 0.0,
    max: 0.5,
    cardNames: ["Truppen des Nordens"],
    error: SOUTHERN_CITY_STATES.SUB_FACTION_RULES.NORTHERN_TROOPS,
  },
  {
    subFaction: "southernTroops",
    min: 0.0,
    max: 0.5,
    cardNames: ["Truppen des Südens"],
    error: SOUTHERN_CITY_STATES.SUB_FACTION_RULES.SOUTHERN_TROOPS,
  },
  {
    subFaction: "orderOfTrueFaith",
    min: 0.0,
    max: 0.4,
    cardNames: ["Orden des wahren Glaubens"],
    error: SOUTHERN_CITY_STATES.SUB_FACTION_RULES.ORDER_OF_TRUE_FAITH,
  },

  {
    subFaction: "brotherhoodOfSand",
    min: 0.0,
    max: 0.4,
    cardNames: ["Bruderschaft des Sandes"],
    error: SOUTHERN_CITY_STATES.SUB_FACTION_RULES.BROTHERHOOD_OF_SAND,
  },
];

const southernCityStatesRules = {
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
    // TODO
    brotherhoodOrOrder(validationData.selectedUnits, validationData.availableUnits);
    totalPointsForMagiciansAndHeroes(validationData.selectedUnits, validationData.availableUnits, validationData.totalPointsAllowance);

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

//SPECIAL FACTION RULES

/**
 * Function implements the "Brotherhood vs. Order" Rule. An Army of the Southern City States can contain either Brotherhood OR Order troops up to the given percentage.
 * @param {[unitCard]} selectedUnits
 * @param {[unitCard]} availableUnits
 * @returns array of objects containing a blocked unit and an error message.
 */
const brotherhoodOrOrder = (selectedUnits, availableUnits) => {
  const MESSAGE = SOUTHERN_CITY_STATES.ERRORS.BROTHERHOOD_ORDER;
  let FACTIONS = ["Orden des wahren Glaubens", "Bruderschaft des Sandes"];

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

/**
 * The army can only consist of 40% shamans and heroes.
 * @param {[unitcard]} selectedUnits
 * @param {int} totalPointsAllowance
 * @returns an array where each element is an object with blocked unit and an error message giving the reaosn
 * for the block.
 */
const totalPointsForMagiciansAndHeroes = (selectedUnits, availableUnits, totalPointsAllowance) => {
  const MAGICIAN_AND_HEROES_LIMIT = 40;
  const max_percentage = (totalPointsAllowance * MAGICIAN_AND_HEROES_LIMIT) / 100;

  let shamansAndHeroesTotal = 0;
  let result = [];

  selectedUnits
    .filter((u) => u.unitType === HERO || u.unitType === MAGE)
    .forEach((u) => {
      shamansAndHeroesTotal = shamansAndHeroesTotal + u.points;
    });

  availableUnits
    .filter((u) => u.unitType === HERO || u.unitType === MAGE)
    .forEach((u) => {
      if (shamansAndHeroesTotal + u.points > max_percentage) {
        result.push({ unitBlockedbyRules: u.unitName, message: SOUTHERN_CITY_STATES.ERRORS.MAX_LIMIT_CHARACTERS });
      }
    });

  return result;
};

// TODO: Helden und Befehlshaber des Nordens (Südens) dür-fen nur aufgestellt werden, wenn auch mindestens eine Einheit des Nordens (Südens) rekrutiert wird.

const provincesRule = () => {

};

export { southernCityStatesRules, rules };
