// react
import { useContext, useEffect, useState } from "react";
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
import EditSpells from "./EditSpells";
import SpellHeader from "./SpellHeader";

const SpellCompendium = () => {
  const SC = useContext(SpellContext);
  const UC = useContext(UserContext);

  const [selectedSpell, setSelectedSpell] = useState(NO_SELECTION);
  const [propertyToEdit, setPropertyToEdit] = useState(NO_SELECTION);
  const [currentEdit, setCurrentEdit] = useState({
    spellName: false,
    spellTier: false,
    target: false,
    requirements: false,
    effect: false,
    duration: false,
  });

  const showActiveEdit = (property) => {
    switch (property) {
      case "spellName":
        setCurrentEdit({
          ...currentEdit,
          spellName: true,
          spellTier: false,
          target: false,
          requirements: false,
          effect: false,
          duration: false,
        });
        break;
      case "spellTier":
        setCurrentEdit({
          ...currentEdit,
          spellName: false,
          spellTier: true,
          target: false,
          requirements: false,
          effect: false,
          duration: false,
        });
        break;
      case "target":
        setCurrentEdit({
          ...currentEdit,
          spellName: false,
          spellTier: false,
          target: true,
          requirements: false,
          effect: false,
          duration: false,
        });
        break;
      case "requirements":
        setCurrentEdit({
          ...currentEdit,
          spellName: false,
          spellTier: false,
          target: false,
          requirements: true,
          effect: false,
          duration: false,
        });
        break;
      case "effect":
        setCurrentEdit({
          ...currentEdit,
          spellName: false,
          spellTier: false,
          target: false,
          requirements: false,
          effect: true,
          duration: false,
        });
        break;
      case "duration":
        setCurrentEdit({
          ...currentEdit,
          spellName: false,
          spellTier: false,
          target: false,
          requirements: false,
          effect: false,
          duration: true,
        });
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
        {UC.userLoggedIn && UC.user.isAdmin ? (
          <SpellProperty
            title={SPELL_COMPENDIUM.SPELL_NAME} //
            content={selectedSpell.spellName}
            property={"spellName"}
            setPropertyToEdit={setPropertyToEdit}
            showActiveEdit={showActiveEdit}
            currentEdit={currentEdit}
          />
        ) : null}
        {UC.userLoggedIn && UC.user.isAdmin ? (
          <SpellProperty
            title={SPELL_COMPENDIUM.SPELL_TIER} //
            content={selectedSpell.spellTier}
            property={"spellTier"}
            setPropertyToEdit={setPropertyToEdit}
            showActiveEdit={showActiveEdit}
            currentEdit={currentEdit}
          />
        ) : null}
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
          setAllSpells={SC.setAllSpells}
          selectedSpell={selectedSpell} //
          propertyToEdit={propertyToEdit}
          setSelectedSpell={setSelectedSpell}
          user={UC.user}
          userLoggedIn={UC.userLoggedIn}
          selectedFactionForSpell={SC.selectedFactionForSpell}
          setDisplaySpells={SC.setDisplaySpells}
        />
      </Grid>
    </Grid>
  );
};

export default SpellCompendium;
