//  react
import { useTheme } from "@emotion/react";
// material ui
import {
  FormControl, //
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// constants
import { LOAD_ARMY_LIST_DIALOG } from "../../../constants/textsAndMessages";
import { ALL_FACTIONS_ARRAY } from "../../../constants/factions";

const ListFactionFilter = (props) => {
  const theme = useTheme();

  const createFactionSelectOptions = () => {
    const result = [];
    result.push(LOAD_ARMY_LIST_DIALOG.SHOW_ALL_FACTIONS);
    ALL_FACTIONS_ARRAY.sort((a, b) => a > b).forEach((f) => result.push(f));

    return result;
  };

  const emphaziseFactionsWithLists = (faction, allListObjects) => {
    const presentFactions = allListObjects.map((l) => l.faction);
    presentFactions.push(LOAD_ARMY_LIST_DIALOG.SHOW_ALL_FACTIONS);

    return presentFactions.includes(faction) //
      ? null
      : { color: theme.palette.disabled };
  };

  return (
    <FormControl
      variant="standard"
      sx={{
        minWidth: "15em", //
      }}
    >
      <InputLabel>{LOAD_ARMY_LIST_DIALOG.FILTER_FOR_FACTION}</InputLabel>
      <Select
        value={props.filteredFaction} //
        defaultValue={props.filteredFaction} //
        onChange={props.handleFilteredFactionInput}
        label="Faction"
      >
        {createFactionSelectOptions().map((f, i) => (
          <MenuItem
            key={i} //
            value={f}
            sx={emphaziseFactionsWithLists(f, props.allLists)}
          >
            {f}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ListFactionFilter;
