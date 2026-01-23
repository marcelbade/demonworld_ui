//  react
import { useTheme } from "@emotion/react";
// material ui
import {
  FormControl, //
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// context
import { GameDataContext } from "../../../contexts/gameDataContext";
// constants
import { LOAD_ARMY_LIST_DIALOG } from "../../../constants/textsAndMessages";
import { useContext } from "react";

const ListFactionFilter = (props) => {
  const theme = useTheme();

  const GDC = useContext(GameDataContext);

  const createFactionSelectOptions = () => {
    const result = [];
    result.push(LOAD_ARMY_LIST_DIALOG.SHOW_ALL_FACTIONS);
    GDC.allFactionNames.sort((a, b) => a > b).forEach((f) => result.push(f));

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
        defaultValue={""} //
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
