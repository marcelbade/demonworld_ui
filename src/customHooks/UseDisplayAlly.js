// react
import { useContext } from "react";
// context
import { AllyContext } from "../contexts/allyContext";
import { AlternativeListContext } from "../contexts/alternativeListContext";
//  constants
import { NO_ALLY } from "../constants/factions";

/**
 * Hook checks if an ally should be displayed.
 * @returns true, if 2 conditions are met:
 *  - the faction has an ally
 *  - if the ally is an alternative subFaction (see dwarves),
 *    it must be selected by the player. If it's not an alternative
 *    the condition defaults to true
 */
const useDisplayAlly = () => {
  const AYC = useContext(AllyContext);
  const ALC = useContext(AlternativeListContext);

  const showAlly = () => {
    if (ALC.allyIsAlternativeOption) {
      return ALC.selectedAlternativeLists.includes(AYC.allyName);
    }

    return AYC.allyName !== NO_ALLY;
  };

  return { showAlly: showAlly };
};

export default useDisplayAlly;
