// react
import { useContext } from "react";
// context
import { ArmyContext } from "../contexts/armyContext";
import { AlternativeListContext } from "../contexts/alternativeListContext";
import { AllyContext } from "../contexts/allyContext";
import { SecondSubFactionContext } from "../contexts/secondSubFactionContext";
// constants
import { ARMIES_ADDITIONAL_SUBFACTIONS, ARMIES_ADDITIONAL_SUBFACTIONS_MAPPING, NO_ALLY, SPECIAL } from "../constants/factions";
import useUnitEnricher from "./UseUnitEnricher";

/**
 * Custom hook supplies a single function that sets the entire state of the list generator. This encompasses:
 * - faction data (units, subfaction, ...)
 * - ally data
 * - alternative list data
 * In additon, the useUnitEnricher hook is called for all units.
 * @returns setFactionPropertiesfunction( factionName: String ) -> Function sets the entire state for a faction when it is selected.
 */
const UseArmyStateLoader = () => {
  const AC = useContext(ArmyContext);
  const ALC = useContext(AlternativeListContext);
  const AYC = useContext(AllyContext);
  const SFC = useContext(SecondSubFactionContext);

  const enrichUnit = useUnitEnricher();

  /**
   * Function sets the entire state for a faction when it is selected.
   * @param {String} factionName
   */
  const setFactionProperties = (factionName) => {
    const factionObj = AC.fetchedFactions.find((f) => f.factionName === factionName);
    // find speical units that are available to every faction
    const specials = AC.fetchedFactions.find((f) => f.factionName === SPECIAL);
    const allSubFactions = [...factionObj.subFactions.map((sF) => sF.name)];
    const allFactionUnits = captureAllFactionUnits(factionObj.subFactions, specials.subFactions);

    AC.setSubFactionDTOs(factionObj.subFactions);
    AC.setSelectedFactionName(factionObj.factionName);
    AC.setDistinctSubFactions(allSubFactions);
    AC.setListOfAllFactionUnits(allFactionUnits);

    // faction has an ally?
    if (factionObj.ally !== NO_ALLY) {
      const allAllySubFactions = [...factionObj.allySubFactions.map((sF) => sF.name)];
      const allAllyUnits = captureAllFactionUnits(factionObj.allySubFactions, []);

      AYC.setAllyName(factionObj.ally);
      AYC.setAllySubFactionDTOs(factionObj.allySubFactions);
      AYC.setDistinctAllySubFactions(allAllySubFactions);
      AYC.setListOfAlliedUnits(allAllyUnits);
    }

    if (factionObj.hasAlternativeLists) {
      ALC.setArmyHasAlternativeLists(factionObj.hasAlternativeLists);
      ALC.setNumberOfAlternativeChoices(factionObj.numberOfAlternativeArmySelections);
      ALC.setAlternateListNames(factionObj.alternativeOptions.subFactions);
      ALC.setAllyIsAlternativeOption(factionObj.allyIsAlternativeOption);
    }

    if (ARMIES_ADDITIONAL_SUBFACTIONS.includes(factionObj.factionName)) {
      const result = ARMIES_ADDITIONAL_SUBFACTIONS_MAPPING.filter((e) => e.army === factionObj.factionName);

      SFC.setHasAdditionalSubFaction(true);

      SFC.setSecondSubfactionCaption(result[0].caption);
      SFC.setExcemptSubFactions(result[0].excemptSubFactions);
      SFC.setSecondSubFactionList(result[0].secondSubFactionList);
    }
  };

  /**
   * Function creates an array containing all units for either the faction or the ally.
   * For the faction, special units are added that are needed for the special item logic.
   * No boolean is necessary. For the ally, the specials array is simply empty.
   * @param {*} subFactionObjects
   * @returns an array containing every unitCard object for the faction or its ally.
   */
  const captureAllFactionUnits = (subFactionObjects, specials) => {
    let result = [];

    const tempArray = [...subFactionObjects, ...specials];

    tempArray.forEach((sF) => {
      sF.units.forEach((u) => {
        result.push(enrichUnit(u));
      });
    });

    return result;
  };

  return { setFactionProperties: setFactionProperties };
};

export default UseArmyStateLoader;
