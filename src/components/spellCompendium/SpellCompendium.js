// react
import { useContext, useState } from "react";
// material ui
import { Grid2 as Grid } from "@mui/material";
// context
import { SpellContext } from "../../contexts/spellContext";
// custom components and functions
import SpellProperty from "./SpellProperty";
import { NO_SELECTION } from "./spellUtil";
import SpellList from "./SpellList";
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import EditSpells from "./EditSpells";
import SpellHeader from "./SpellHeader";

const SpellCompendium = () => {
  const SC = useContext(SpellContext);

  const [selectedSpell, setSelectedSpell] = useState(NO_SELECTION);
  const [propertyToEdit, setPropertyToEdit] = useState(NO_SELECTION);
  const [currentEdit, setCurrentEdit] = useState({
    target: false,
    requirements: false,
    effect: false,
    duration: false,
  });

  const showActiveEdit = (property) => {
    switch (property) {
      case "target":
        setCurrentEdit({ ...currentEdit, target: true, requirements: false, effect: false, duration: false });
        break;
      case "requirements":
        setCurrentEdit({ ...currentEdit, target: false, requirements: true, effect: false, duration: false });
        break;
      case "effect":
        setCurrentEdit({ ...currentEdit, target: false, requirements: false, effect: true, duration: false });
        break;
      case "duration":
        setCurrentEdit({ ...currentEdit, target: false, requirements: false, effect: false, duration: true });
        break;

      default:
        break;
    }
  };

  return (
    <Grid
      container
      size={12}
      direction="row"
      sx={{
        height: "100%,",
      }}
    >
      <Grid size={2}>
        <SpellList
          setSelectedSpell={setSelectedSpell}
          allSpells={SC.allSpells}
          selectedFactionForSpell={SC.selectedFactionForSpell}
          setSelectedFactionForSpell={SC.setSelectedFactionForSpell}
          displaySpells={SC.displaySpells}
          setDisplaySpells={SC.setDisplaySpells}
          showActiveEdit={showActiveEdit}
        />
      </Grid>
      <Grid
        container //
        direction="column"
        size={10}
        justifyItems="center"
        alignItems="center"
      >
        <SpellHeader
          faction={selectedSpell.faction} //
          spellName={selectedSpell.spellName} //
          spellTier={selectedSpell.spellTier}
        />

        <SpellProperty
          title={SPELL_COMPENDIUM.TARGET} //
          content={selectedSpell.target}
          property={"target"}
          setPropertyToEdit={setPropertyToEdit}
          showActiveEdit={showActiveEdit}
          currentEdit={currentEdit}
        />
        <SpellProperty
          title={SPELL_COMPENDIUM.REQUIREMENTS}
          content={selectedSpell.requirements}
          property={"requirements"}
          setPropertyToEdit={setPropertyToEdit}
          showActiveEdit={showActiveEdit}
          currentEdit={currentEdit}
        />
        <SpellProperty
          title={SPELL_COMPENDIUM.DURATION} //
          content={selectedSpell.duration}
          property={"duration"}
          setPropertyToEdit={setPropertyToEdit}
          showActiveEdit={showActiveEdit}
          currentEdit={currentEdit}
        />
        <SpellProperty
          title={SPELL_COMPENDIUM.EFFECT} //
          content={selectedSpell.effect}
          property={"effect"}
          setPropertyToEdit={setPropertyToEdit}
          showActiveEdit={showActiveEdit}
          currentEdit={currentEdit}
        />

        <EditSpells
          selectedSpell={selectedSpell} //
          propertyToEdit={propertyToEdit}
          setSelectedSpell={setSelectedSpell}
        />
      </Grid>
    </Grid>
  );
};

export default SpellCompendium;
