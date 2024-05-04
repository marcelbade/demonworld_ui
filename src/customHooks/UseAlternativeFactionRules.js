// constants
import { DWARF_TEXTS, EMPIRE_TEXTS, ORKS_TEXTS } from "../constants/textsAndMessages";

/**
 * Hook implements additional game logic so it is kept
 * separate from the UI logic. Some faction have
 * additional rules regarding alternative sub factions and their selection:
 * E.g., they limit which alternative subFaction can be selected
 * at what point of the selection process.
 * @param {String} faction
 * @param {[String]} alternatives
 * @returns a two-dimensional array. First dimension corresponds to the
 * SelectionInput element (0 = first, 1= second, and so on),
 * second dimension contains the list of options the selector will show.
 */
const useAlternativeFactionRules = (faction, alternatives) => {
  let result = [];

  switch (faction) {
    // dwarfs: faction has 2 selections, Ally can only be shown in the second!
    case DWARF_TEXTS.FACTION_NAME:
      result[0] = alternatives.filter((a) => a !== DWARF_TEXTS.ALLY);
      result[1] = alternatives;

      break;
    // empire: normal selection
    case EMPIRE_TEXTS.FACTION_NAME:
      result[0] = alternatives;
      break;
    // orks: normal selection
    case ORKS_TEXTS.FACTION_NAME:
      result[0] = alternatives;
      break;
    default:
      break;
  }

  return result;
};

export default useAlternativeFactionRules;
