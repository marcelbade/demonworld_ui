// react
import { useContext, useState } from "react";
// material ui
import { Grid2 as Grid } from "@mui/material";
// context
import { SpellContext } from "../../contexts/spellContext";
import { UserContext } from "../../contexts/userContext";
// custom components and functions
import SpellProperty from "./SpellProperty";
import { NO_SELECTION } from "./spellUtil";
import SpellList from "./SpellList";
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import SpellHeader from "./SpellHeader";

const SpellCompendium = () => {
  const SC = useContext(SpellContext);
  const UC = useContext(UserContext);

  // select from spell from left menu
  const [selectedSpell, setSelectedSpell] = useState(NO_SELECTION);

  // data for rendering spell property components
  const propertyTable = [
    {
      // only show to admins for editing
      display: UC.userLoggedIn && UC.user.isAdmin,
      title: SPELL_COMPENDIUM.SPELL_NAME,
      content: selectedSpell.spellName,
      property: "spellName",
    },
    {
      // only show to admins for editing
      display: UC.userLoggedIn && UC.user.isAdmin,
      title: SPELL_COMPENDIUM.SPELL_TIER, //
      content: selectedSpell.spellTier,
      property: "spellTier",
    },
    {
      display: true,
      title: SPELL_COMPENDIUM.TARGET,
      content: selectedSpell.target,
      property: "target",
    },
    {
      display: true,
      title: SPELL_COMPENDIUM.REQUIREMENTS,
      content: selectedSpell.requirements,
      property: "requirements",
    },
    {
      display: true,
      title: SPELL_COMPENDIUM.DURATION,
      content: selectedSpell.duration,
      property: "duration",
    },
    {
      display: true,
      title: SPELL_COMPENDIUM.EFFECT,
      content: selectedSpell.effect,
      property: "effect",
    },
  ];

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
          spellName={selectedSpell.spellName}
          spellTier={selectedSpell.spellTier}
        />

        {propertyTable.map((p, i) => (
          <SpellProperty
            // component data
            key={i}
            display={p.display}
            title={p.title}
            content={p.content}
            property={p.property}
            // editable data
            selectedSpell={selectedSpell}
            selectedFactionForSpell={SC.selectedFactionForSpell}
            user={UC.user}
            userLoggedIn={UC.userLoggedIn}
            setAllSpells={SC.setAllSpells}
            setDisplaySpells={SC.setDisplaySpells}
            setSelectedSpell={setSelectedSpell}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default SpellCompendium;
