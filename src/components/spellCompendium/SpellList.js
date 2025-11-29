// react
import { useTheme } from "@emotion/react";
// material ui
import { Grid2 as Grid, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import SpellSelector from "./SpellSelector";
// custom components and functions
import { spellTierIsText } from "./spellUtil";
import { useEffect } from "react";

const SpellList = (props) => {
  const theme = useTheme();

  useEffect(
    () => {}, //
    [JSON.stringify(props.displaySpells)] // eslint-disable-line react-hooks/exhaustive-deps
  ); 

  return (
    <>
      <Grid
        size={2}
        sx={{
          paddingTop: "2em",
          backgroundColor: theme.palette.contrastedOptions, //
          position: "fixed",
        }}
      >
        <SpellSelector
          setSelectedSpell={props.setSelectedSpell}
          allSpells={props.allSpells} //
          selectedFactionForSpell={props.selectedFactionForSpell} //
          setSelectedFactionForSpell={props.setSelectedFactionForSpell}
          displaySpells={props.displaySpells}
          setDisplaySpells={props.setDisplaySpells}
        />
      </Grid>
      <Grid
        size={2}
        sx={{
          backgroundColor: theme.palette.contrastedOptions, //
          top: "5em",
          height: "100%",
          position: "fixed",
          overflowY: "auto",
          paddingBottom: "10em",
        }}
      >
        <List
          sx={{
            paddingTop: "4em",
            overflowY: "auto",
          }}
        >
          {props.displaySpells
            .sort((a, b) => a.spellName > b.spellName)
            .map((s, i) => (
              <ListItemButton
                onClick={() => {
                  props.setSelectedSpell(s);
                }}
                key={i}
              >
                <ListItemText
                  sx={{ width: "8em", minWidth: "8em" }} //
                  primary={<Typography variant="body1">{s.spellName}</Typography>}
                />
                <ListItemText
                  primary={
                    <Typography variant="body1">
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
    </>
  );
};

export default SpellList;
