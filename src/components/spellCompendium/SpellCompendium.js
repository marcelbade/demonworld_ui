// react
import { useContext, useState } from "react";
// mui
import { Grid2 as Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
// context
import { SpellContext } from "../../contexts/spellContext";
// custom components and functions
import SpellProperty from "./SpellProperty";
import SpellSelector from "./SpellSelector";
import { spellTierIsText } from "./spellUtil";

// icons
import TierIcon from "./TierIcon";

// http://localhost:3000/spellCompendium

const SpellCompendium = () => {
  const SC = useContext(SpellContext);

  const [selectedSpell, setSelectedSpell] = useState({ spellTier: "" });

  return (
    <Grid
      container //
      direction="row"
      size={12}
    >
      <Grid size={2}>
        <SpellSelector
          allSpells={SC.allSpells} //
          selectedFactionForSpell={SC.selectedFactionForSpell} //
          setSelectedFactionForSpell={SC.setSelectedFactionForSpell}
          displaySpells={SC.displaySpells}
          setDisplaySpells={SC.setDisplaySpells}
        />
        <List>
          {SC.displaySpells.map((s) => (
            <ListItemButton
              onClick={() => {
                setSelectedSpell(s);
              }}
            >
              <ListItemText
                sx={{ width: "7em", minWidth: "7em" }} //
                primary={<Typography>{s.spellName}</Typography>}
              />
              <ListItemText
                primary={
                  <Typography>
                    {spellTierIsText(s.spellTier) //
                      ? "*"
                      : s.spellTier}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid
        container
        size={10} //
        sx={{
          //
          position: "fixed",
          left: "26.5em",
        }}
      >
        <Typography
          variant="h6" //
          align="right"
          sx={{
            width: "100%", //
            paddingRight: "5em",
            paddingTop: "1em",
          }}
        >
          {selectedSpell.faction}
        </Typography>
        <Typography
          variant="h5" //
          align="center"
          sx={{
            width: "100%", //
          }}
        >
          {selectedSpell.spellName}
        </Typography>
        <TierIcon tier={selectedSpell.spellTier} />

        <SpellProperty title={"Ziel:"} content={selectedSpell.target} />
        <SpellProperty title={"Voraussetzung:"} content={selectedSpell.requirements} />
        <SpellProperty title={"Dauer:"} content={selectedSpell.duration} />
        <SpellProperty title={"Auswirkungen:"} content={selectedSpell.effect} />
      </Grid>
    </Grid>
  );
};

export default SpellCompendium;
