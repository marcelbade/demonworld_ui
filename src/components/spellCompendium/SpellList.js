// react
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
// material ui
import { Drawer, List, ListItemButton, IconButton, ListItemText, Typography, Grid2 as Grid } from "@mui/material";
import SpellSelector from "./SpellSelector";
// custom components and functions
import { spellTierIsText } from "./spellUtil";
import CreateSpellListPdfButton from "./CreateSpellListPdfButton";
// icons
import { ChevronLeft } from "@mui/icons-material";

const SpellList = (props) => {
  const theme = useTheme();

  useEffect(
    () => {}, //
    [JSON.stringify(props.displaySpells)] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <Drawer
      variant={"persistent"}
      open={props.openSpellList}
      onClose={() => {
        props.toggleDrawer();
      }}
      sx={{
        "& .MuiPaper-root": {
          paddingTop: "0.5em",
          backgroundColor: theme.palette.contrastedOptions, //
          position: "fixed",
          overflowY: "auto",
          width: "20em",
        },
      }}
    >
      <Grid
        container //
        justifyContent="right"
        justifyItems="right"
      >
        <IconButton
          onClick={() => {
            props.toggleDrawer();
          }}
        >
          <CreateSpellListPdfButton
            selectedSpell={props.selectedSpell} //
            displaySpells={props.displaySpells}
            setDisplaySpells={props.setDisplaySpells}
            color="white"
          />

          <ChevronLeft
            sx={{
              width: "3em", //
              height: "3em",
              color: "white",
              marginRight: "1em",
            }}
          />
        </IconButton>
      </Grid>
      <SpellSelector
        setSelectedSpell={props.setSelectedSpell}
        allSpells={props.allSpells} //
        selectedFactionForSpell={props.selectedFactionForSpell} //
        setSelectedFactionForSpell={props.setSelectedFactionForSpell}
        displaySpells={props.displaySpells}
        setDisplaySpells={props.setDisplaySpells}
      />

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
                sx={{
                  width: "8em", //
                  minWidth: "8em",
                  paddingRight: "1em",
                }} //
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
    </Drawer>
  );
};

export default SpellList;
