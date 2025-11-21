// material ui
import { Dialog, List, ListItemText, Typography, ListItem, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
// components and functions
import { spellTierIsText } from "./spellUtil";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
import { useState } from "react";

const SelectSpellsDialog = (props) => {
  const [allBoxesChecked, setAllBoxesChecked] = useState(false);

  const handleClose = () => {
    props.setShowPrintTypeDialog(false);
  };

  const markForPrint = (selectedSpell) => {
    selectedSpell.isSelected = !selectedSpell.isSelected;
    props.setDisplaySpells([...props.displaySpells]);
  };

  const checkAllBoxes = () => {
    let allChecked =  false;

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

  return (
    <Dialog
      open={props.showListTypeDialog} //
      onClose={handleClose}
      sx={{
        minWidth: "100em",
      }}
    >
      <FormGroup>
        <FormControlLabel
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
        />
      </FormGroup>
      <Typography />

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
            </ListItem>
          ))}
      </List>
      <Button
        variant="outlined" //
        onClick={props.createPrintableFile}
        sx={{
          marginLeft: "10em", //
          marginRight: "10em",
          marginBottom: "5em",
        }}
      >
        {SPELL_COMPENDIUM.PRINT_LIST}
      </Button>
    </Dialog>
  );
};

export default SelectSpellsDialog;
