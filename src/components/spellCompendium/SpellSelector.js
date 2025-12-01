// react
import { useContext } from "react";
// mui
import { Grid2 as Grid } from "@mui/material";
// functions and components
import SelectionInput from "../shared/selectionInput";
// context
import { GameDataContext } from "../../contexts/gameDataContext";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import { NO_SELECTION } from "./spellUtil";
// custom hooks
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";

const SpellSelector = (props) => {
  const GDC = useContext(GameDataContext);
  const displaySize = useCustomMediaQuery();

  /**
   * Function generates the options for the faction name selector.
   * @returns an array containing all faction names.
   */
  const setFactionNamesOptions = () => {
    const FACTIONS = [...GDC.allFactionNames, SPELL_COMPENDIUM.SHOW_ALL_FACTIONS];
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
    <Grid
      container //
      direction="column"
    >
      <SelectionInput
        textColor="white"
        width={displaySize.isSmallDisplay ? "10em" : "20em"}
        alternatives={setFactionNamesOptions()}
        filterFunction={selectFaction}
        clearFunction={clearFaction}
        label={SPELL_COMPENDIUM.SELECT_FACTION}
      />
    </Grid>
  );
};

export default SpellSelector;
