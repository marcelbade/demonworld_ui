// react
import { useContext, useState } from "react";
import { useTheme } from "@emotion/react";
// mui
import { Button, Grid2 as Grid, List, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
// context
import { SpellContext } from "../../contexts/spellContext";
// custom components and functions
import SpellProperty from "./SpellProperty";
import SpellSelector from "./SpellSelector";
import { NO_SELECTION, spellTierIsText } from "./spellUtil";
import TierIcon from "./TierIcon";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";

const SpellCompendium = () => {
  const theme = useTheme();

  const SC = useContext(SpellContext);

  const [selectedSpell, setSelectedSpell] = useState(NO_SELECTION);
  const [propertyToEdit, setPropertyToEdit] = useState(NO_SELECTION);

  const editText = (event, propertyToEdit) => {
    let newText = event.target.value;
    const tempObj = { ...selectedSpell };

    setSelectedSpell({
      ...tempObj,
      propertyToEdit: newText,
    });
  };

  const saveChanges = () => {};

  return (
    <>
      <Grid
        container //
        direction="row"
        size={12}
      >
        <Grid
          size={2}
          sx={{
            paddingTop: "2em",
            backgroundColor: theme.palette.contrastedOptions, //
            position: "fixed",
          }}
        >
          <SpellSelector
            setSelectedSpell={setSelectedSpell}
            allSpells={SC.allSpells} //
            selectedFactionForSpell={SC.selectedFactionForSpell} //
            setSelectedFactionForSpell={SC.setSelectedFactionForSpell}
            displaySpells={SC.displaySpells}
            setDisplaySpells={SC.setDisplaySpells}
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
            {SC.displaySpells
              .sort((a, b) => a.spellName > b.spellName)
              .map((s, i) => (
                <ListItemButton
                  onClick={() => {
                    setSelectedSpell(s);
                  }}
                  key={i}
                >
                  <ListItemText
                    sx={{ width: "8em", minWidth: "8em" }} //
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
            position: "fixed", //
            left: "26.5em",
          }}
        >
          <Grid
            container //
            direction="column"
            alignItems="center"
            size={12}
          >
            <CollapsableTopMenuDrawer
              displayPageTitle={true}
              title={""} //
              displayNaviBttn={true}
              displayListBttns={true}
            />
            <TopDrawerButton />
          </Grid>

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

          <Typography
            variant="body1" //
            align="center"
            sx={{
              width: "100%", //
              paddingBottom: "3em",
            }}
          >
            {spellTierIsText(selectedSpell.spellTier) ? selectedSpell.spellTier : " "}
          </Typography>

          <SpellProperty
            title={"Ziel:"} //
            content={selectedSpell.target}
            property={"target"}
            setPropertyToEdit={setPropertyToEdit}
          />
          <SpellProperty
            title={"Voraussetzung:"}
            content={selectedSpell.requirements}
            property={"requirements"}
            setPropertyToEdit={setPropertyToEdit}
          />
          <SpellProperty
            title={"Dauer:"} //
            content={selectedSpell.duration}
            property={"duration"}
            setPropertyToEdit={setPropertyToEdit}
          />
          <SpellProperty
            title={"Auswirkungen:"} //
            content={selectedSpell.effect}
            property={"effect"}
            setPropertyToEdit={setPropertyToEdit}
          />

          {/* TODO ### */}
          <Grid
            container //
            direction="column"
            size={12}
            spacing={2}
            justifyContent="center"
            alignContent="center"
          >
            <TextField
              sx={{
                width: "80%", //
              }}
              id="outlined-multiline-flexible" //
              label="Multiline"
              multiline
              minRows={20}
              maxRows={30}
              value={selectedSpell[propertyToEdit]}
              onChange={() => {
                editText(propertyToEdit);
              }}
            />
            <Button variant="outlined" onClick={saveChanges()}>
              {"Speichern"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SpellCompendium;
