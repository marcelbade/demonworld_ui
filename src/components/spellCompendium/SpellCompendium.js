// react
import { useContext, useState } from "react";
// material ui
import { Button, Grid2 as Grid } from "@mui/material";
// context
import { SpellContext } from "../../contexts/spellContext";
import { UserContext } from "../../contexts/userContext";
// custom components and functions
import SpellProperty from "./SpellProperty";
import { NO_SELECTION } from "./spellUtil";
import SpellList from "./SpellList";
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import SpellHeader from "./SpellHeader";
import BackToTopContainer from "../shared/BackToTopContainer";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";
// custom hooks
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";
// icons
import customRedGameIcon from "../../assets/icons/logo_red.png";

const SpellCompendium = () => {
  const SC = useContext(SpellContext);
  const UC = useContext(UserContext);

  const displaySize = useCustomMediaQuery();

  // select from spell from left menu
  const [selectedSpell, setSelectedSpell] = useState(NO_SELECTION);
  const [openSpellList, setOpenSpellList] = useState(false);

  const toggleDrawer = () => {
    setOpenSpellList((prevState) => !prevState);
  };

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
    {
      display: true,
      title: SPELL_COMPENDIUM.ABBREVIATED_EFFECT,
      content: selectedSpell.abbreviatedEffect,
      property: "abbreviatedEffect",
    },
  ];

  return (
    <>
      <Grid
        container //
        direction="row"
        justifyContent="center"
        size={12}
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={true} //
          title={""}
          logo={customRedGameIcon}
          hasLogo={true}
          displayNaviBttn={true}
          displayListBttns={true}
          logoWidth={displaySize.isTinyDisplay ? "250px" : "350px"}
        />
        <TopDrawerButton />
      </Grid>
      <BackToTopContainer>
        <Grid
          container
          size={12}
          direction="row"
          sx={{
            height: "100%,",
          }}
        >
          <SpellList
            allSpells={SC.allSpells}
            selectedSpell={selectedSpell}
            selectedFactionForSpell={SC.selectedFactionForSpell}
            setSelectedFactionForSpell={SC.setSelectedFactionForSpell}
            displaySpells={SC.displaySpells}
            setDisplaySpells={SC.setDisplaySpells}
            openSpellList={openSpellList}
            setSelectedSpell={setSelectedSpell}
            toggleDrawer={toggleDrawer}
          />

          <SpellHeader
            selectedSpell={selectedSpell} //
            displaySpells={SC.displaySpells}
            setDisplaySpells={SC.setDisplaySpells}
            setSelectedSpell={setSelectedSpell}
            toggleDrawer={toggleDrawer}
          />

          {selectedSpell.spellName !== "" ? (
            propertyTable.map((p, i) => (
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
            ))
          ) : (
            <Grid
              size={12} //
              container
              justifyContent="center"
            >
              <Button
                variant="outlined"
                onClick={() => {
                  toggleDrawer(true);
                }}
              >
                {SPELL_COMPENDIUM.SELECT_A_SPELL}
              </Button>
            </Grid>
          )}
        </Grid>
      </BackToTopContainer>
    </>
  );
};

export default SpellCompendium;
