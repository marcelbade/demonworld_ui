import { Dialog, List, ListItemText, Typography, ListItem, FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { spellTierIsText } from "./spellUtil";
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";

const SelectSpellsDialog = (props) => {
  const handleClose = () => {
    props.setShowPrintTypeDialog(false);
  };

  const markForPrint = (selectedSpell) => {
    selectedSpell.isSelected = true;
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
              checked={false} //
              onChange={null}
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
                      onChange={() => {
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
      >
            {SPELL_COMPENDIUM.PRINT_LIST} 
      </Button>
    </Dialog>
  );
};

export default SelectSpellsDialog;
