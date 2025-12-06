// functions and components
import SelectionInput from "../shared/selectionInput";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import { NO_SELECTION } from "./spellUtil";
// custom hooks
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";

const SpellSelector = (props) => {
  const displaySize = useCustomMediaQuery();

  /**
   * Create a list of distinct faction names for the spells.
   * Faction names include mercenary casters.
   */
  const distinctFactionNamesForSpells = new Set(props.allSpells.map((s) => s.faction));

  /**
   * Function generates the options for the faction name selector.
   * @returns an array containing all faction names.
   */
  const setFactionNamesOptions = () => {
    const FACTIONS = [...distinctFactionNamesForSpells, SPELL_COMPENDIUM.SHOW_ALL_FACTIONS];
    return FACTIONS.sort();
  };

  /**
   * Function for onChange event. Sets the selected faction and selects all
   * spells for one faction to be displayed in the button row.
   * @param {[FactionObject]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    props.setSelectedFactionForSpell(selectedFaction);
    if (selectedFaction === SPELL_COMPENDIUM.SHOW_ALL_FACTIONS) {
      props.setDisplaySpells(props.allSpells);
      return;
    }

    props.setDisplaySpells(props.allSpells.filter((s) => s.faction.includes(selectedFaction)));
    props.setSelectedSpell(NO_SELECTION);
  };

  /**
   * Function for clear event. Clears values for selected faction
   * and resets the spell list to all spells received from the BE.
   */
  const clearFaction = () => {
    props.setSelectedFactionForSpell("");
    props.setDisplaySpells(props.allSpells);
  };

  return (
    <SelectionInput
      textColor="white"
      width={displaySize.isSmallDisplay ? "10em" : "14em"}
      alternatives={setFactionNamesOptions()}
      filterFunction={selectFaction}
      clearFunction={clearFaction}
      label={SPELL_COMPENDIUM.SELECT_FACTION}
    />
  );
};

export default SpellSelector;
