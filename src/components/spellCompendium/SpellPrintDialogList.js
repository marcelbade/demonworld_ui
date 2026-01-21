// material ui
import { List, ListItemText, Typography, ListItem, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
// components and functions
import { spellTierIsText } from "./spellUtil";

const SpellPrintDialogList = (props) => {
  const markForPrint = (selectedSpell) => {
    selectedSpell.isSelected = !selectedSpell.isSelected;
    props.setDisplaySpells([...props.displaySpells]);
  };

  return (
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
  );
};

export default SpellPrintDialogList;
