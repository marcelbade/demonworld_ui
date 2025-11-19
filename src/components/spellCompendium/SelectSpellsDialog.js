import { Dialog, List, ListItemText, Typography, ListItem, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { spellTierIsText } from "./spellUtil";
import { AutoAwesomeMosaicOutlined } from "@mui/icons-material";

const SelectSpellsDialog = (props) => {
  const handleClose = () => {
    props.setShowPrintTypeDialog(false);
  };

  const updatePrintList = (selectedSpell) => {
    const tempArray = [...props.spellsSelectedForPrint];
    let spellIsIncluded = false;

    for (let i = 0; i < tempArray.length; i++) {
      const spell = tempArray[i];

      if (spell.spellName === selectedSpell.spellName) {
        spellIsIncluded = true;
        tempArray.splice(i, 1);
      }
    }

    if (!spellIsIncluded) {
      tempArray.push(selectedSpell);
    }

    props.setSpellsSelectedForPrint(tempArray);
  };

  const isInPrintlist = (spell) => {
    console.log(AutoAwesomeMosaicOutlined);

    return props.spellsSelectedForPrint.includes(spell);
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
                      checked={() => {
                        isInPrintlist(s);
                      }}
                      onChange={() => {
                        updatePrintList(s);
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
    </Dialog>
  );
};

export default SelectSpellsDialog;
