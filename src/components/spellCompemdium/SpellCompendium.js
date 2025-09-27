import { Grid2 as Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { SpellContext } from "../../contexts/spellContext";
import SpellProperty from "./SpellProperty";

// http://localhost:3000/spellCompendium

const SpellCompendium = () => {
  const SC = useContext(SpellContext);

  const [selectedSpell, setSelectedSpell] = useState({});

  return (
    <Grid
      container //
      direction="row"
      size={12}
      sx={{ backgroundColor: "green" }}
    >
      <Grid size={2} sx={{ backgroundColor: "red" }}>
        <List>
          {SC.allSpells.map((s) => (
            <ListItemButton
              onClick={() => {
                setSelectedSpell(s);
              }}
            >
              <ListItemText primary={<Typography>{s.spellName}</Typography>} />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid
        size={10} //
        sx={{
          backgroundColor: "gold", //
          position: "fixed",
          left: "18em",
        }}
      >
        <Typography variant="body1" align="center">
          {selectedSpell.faction}
        </Typography>
        <Typography variant="h5" align="center">
          {selectedSpell.spellName}
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignContent="center"
          sx={{
            // circle
            height: "50px",
            width: "50px",
            border: "4px solid black ",
            borderRadius: "50%",
            display: "inline-block",
          }}
        >
          <Typography variant="h6" align="center">
            {selectedSpell.spellTier}
          </Typography>
        </Grid>

        <SpellProperty title={"Ziel:"} content={selectedSpell.target} />
        <SpellProperty title={"Voraussetzung:"} content={selectedSpell.requirements} />
        <SpellProperty title={"Dauer:"} content={selectedSpell.duration} />
        <SpellProperty title={"Auswirkungen:"} content={selectedSpell.effect} />
      </Grid>
    </Grid>
  );
};

export default SpellCompendium;
