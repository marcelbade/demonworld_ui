// react
import { useContext } from "react";
// context
import { AllyContext } from "../contexts/allyContext";
import { AlternativeListContext } from "../contexts/alternativeListContext";
//  constants
import { NO_ALLY } from "../constants/factions";
import { EMPIRE_TEXTS } from "../constants/textsAndMessages";

/**
 * Hook checks if an ally should be displayed.
 * @returns true, if the following conditions are met:
 *  - the faction has an ally
 *  - if the ally is an alternative subFaction (see dwarves),
 *    it must be selected by the player. If it's not an alternative
 *    the condition defaults to true
 *  - one faction (empire) has an additional rule: the ally is only displayed,
 *    if certain alternative sub factions are selected.
 */
const useDisplayAlly = () => {
  const AYC = useContext(AllyContext);
  const ALC = useContext(AlternativeListContext);

  /**
   * Function implements the logic whether an ally should be shown or not.
   * @param {String} factionName
   * @returns true, if the ally is to be displayed in the UI.
   */
  const showAlly = (factionName) => {
    if (ALC.allyIsAlternativeOption) {
      return ALC.selectedAlternativeLists.includes(AYC.allyName);
    }

    const hasAlly = AYC.allyName !== NO_ALLY;

    return hasAlly && additionalFactionRules(factionName);
  };

  /**
   * Function searches for additional rules for the selected faction.
   * if found they are called and the resulting boolean flag is returned.
   * @param {String} factionName
   * @returns either additional rules for this faction that return a boolean flag, or true, if no
   * further rules exist for the selected faction.
   */
  const additionalFactionRules = (factionName) => {
    switch (factionName) {
      case EMPIRE_TEXTS.FACTION_NAME:
        return empireRule();
      default:
        return true;
    }
  };

  /**
   * EMPIRE ONLY
   * Function implements the rule that you can only select allied dwarf troops,
   * if the southern or eastern march has been selected.
   */
  const empireRule = () => {
    return (
      ALC.selectedAlternativeLists //
        .includes(EMPIRE_TEXTS.SF.EAST_MARCH) ||
      ALC.selectedAlternativeLists //
        .includes(EMPIRE_TEXTS.SF.SOUTH_MARCH)
    );
  };

  return { showAlly: showAlly };
};

export default useDisplayAlly;
