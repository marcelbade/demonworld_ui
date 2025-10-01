import { Grid2 as Grid } from "@mui/material";
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import SelectionInput from "../shared/selectionInput";
import { NO_SELECTION } from "./spellUtil";

const SpellSelector = (props) => {
  /**
   * Function generates the options for the faction name selector.
   * @returns an array containing all faction names.
   */
  const setFactionNamesOptions = () => {
    const FACTIONS = [...ALL_FACTIONS_ARRAY, SPELL_COMPENDIUM.SHOW_ALL_FACTIONS];
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

    /**
     *
     */
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
    <Grid
      container //
      direction="column"
    >
      <SelectionInput
        textColor="white"
        width={"20em"}
        alternatives={setFactionNamesOptions()}
        filterFunction={selectFaction}
        clearFunction={clearFaction}
        label={SPELL_COMPENDIUM.SELECT_FACTION}
      />
    </Grid>
  );
};

export default SpellSelector;
