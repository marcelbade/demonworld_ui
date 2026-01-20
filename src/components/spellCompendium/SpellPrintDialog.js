// material ui
import {
  Dialog,
  List,
  ListItemText,
  Typography,
  ListItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid2 as Grid,
} from "@mui/material";
// components and functions
import { spellTierIsText } from "./spellUtil";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import { useState } from "react";

const SpellPrintDialog = (props) => {
  const [allBoxesChecked, setAllBoxesChecked] = useState(false);
  // options
  const [showEffectChecked, setShowEffectChecked] = useState(true);
  const [showRequirementsChecked, setShowRequirementsChecked] = useState(true);
  const [ShowDurationChecked, setShowDurationChecked] = useState(true);
  const [showTierchecked, setShowTierchecked] = useState(true);
  const [showTargetchecked, setShowTargetchecked] = useState(true);
  // use abbreviated effect text?
  const [showAbbreviationchecked, setShowAbbreviationchecked] = useState(false);

  const handleClose = () => {
    props.setShowPrintTypeDialog(false);
  };

  const markForPrint = (selectedSpell) => {
    selectedSpell.isSelected = !selectedSpell.isSelected;
    props.setDisplaySpells([...props.displaySpells]);
  };

  const checkAllBoxes = () => {
    let allChecked = false;

    props.displaySpells.forEach((s) => {
      if (s.isSelected) {
        allChecked = true;
      }
    });

    if (allChecked) {
      props.displaySpells.forEach((s) => {
        s.isSelected = false;
      });
    } else if (!allChecked) {
      props.displaySpells.forEach((s) => {
        s.isSelected = true;
      });
    }

    props.setDisplaySpells([...props.displaySpells]);
  };

  const optionsTable = [
    {
      labelText: SPELL_COMPENDIUM.PRINT_ABBREVIATED_EFFECT,
      checked: showAbbreviationchecked,
      controlFunction: setShowAbbreviationchecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_EFFECT,
      checked: showEffectChecked,
      controlFunction: setShowEffectChecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_REQUIREMENTS,
      checked: showRequirementsChecked,
      controlFunction: setShowRequirementsChecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_DURATION,
      checked: ShowDurationChecked,
      controlFunction: setShowDurationChecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_TIER,
      checked: showTierchecked,
      controlFunction: setShowTierchecked,
    },
    {
      labelText: SPELL_COMPENDIUM.PRINT_TARGET,
      checked: showTargetchecked,
      controlFunction: setShowTargetchecked,
    },
  ];

  return (
    <Dialog
      open={props.showListTypeDialog} //
      onClose={handleClose}
      maxWidth="md"
      fullWidth={true}
    >
      <FormControlLabel
        sx={{ marginBottom: "2em", marginTop: "2em" }}
        control={
          <Checkbox
            checked={allBoxesChecked}
            onChange={() => {
              setAllBoxesChecked((prevState) => !prevState);
              checkAllBoxes();
            }}
            sx={{ marginLeft: "16px" }}
          />
        }
        label={"Alles Drucken"}
        labelPlacement="end"
      />
      <Grid
        container //
        direction="row"
      >
        <Grid
          size={6} //
        >
          <List>
            {props.displaySpells
              .sort((a, b) => a.spellName > b.spellName)
              .map((s, i) => (
                <ListItem
                  key={i} //
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={s.isSelected}
                          onClick={() => {
                            markForPrint(s);
                          }}
                        />
                      }
                    />
                  </FormGroup>
                  <ListItemText
                    sx={{ width: "8em", minWidth: "8em" }} //
                    primary={<Typography variant="body1">{s.spellName}</Typography>}
                  />
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1" //
                      >
                        {spellTierIsText(s.spellTier) ? "*" : s.spellTier}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Grid>
        <Grid
          size={3} //
          alignContent="start"
          justifyContent="center"
        >
          {optionsTable.map((o, i) => (
            <FormControlLabel
              key={i}
              sx={{
                ".MuiGrid-root": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                marginBottom: "1em",
              }}
              control={
                <Checkbox
                  checked={o.checked} //
                  onChange={() => {
                    o.controlFunction((prevState) => !prevState);
                  }}
                />
              }
              label={o.labelText}
              labelPlacement="end"
            />
          ))}
        </Grid>
      </Grid>
      <Grid
        container //
        width="100%"
        height="6em"
        justifyContent="center"
      >
        <Button
          variant="outlined" //
          onClick={() => {
            props.createPrintableFile();
            handleClose();
          }}
        >
          {SPELL_COMPENDIUM.PRINT_LIST}
        </Button>
      </Grid>
    </Dialog>
  );
};

export default SpellPrintDialog;
