// material ui
import {
  FormControl, //
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
// constants
import { LOAD_ARMY_LIST_PROMPT } from "../../../constants/textsAndMessages";
import { NO_EVENT } from "../../../constants/eventConstants";

const ListEventFilter = (props) => {
  const createEventSelectOptions = () => {
    const events = props.allLists.map((l) => l.eventName); //

    const onlyDistinctEvents = events.reduce(
      (distinct, e) =>
        distinct.indexOf(e) !== -1 //
          ? distinct
          : [...distinct, e],
      []
    );

    return [
      LOAD_ARMY_LIST_PROMPT.SHOW_EVERYTHING_REGARDLESS_OF_EVENT, //
      ...onlyDistinctEvents,
    ];
  };

  return (
    <FormControl variant="standard" sx={{ minWidth: "15em" }}>
      <InputLabel>{LOAD_ARMY_LIST_PROMPT.FILTER_FOR_EVENT}</InputLabel>
      <Select
        value={props.filteredEvent} //
        defaultValue={props.filteredEvent}
        onChange={props.handleFilteredEventInput}
        label="Event"
      >
        {createEventSelectOptions().map((e, i) => (
          <MenuItem
            key={i} //
            value={e}
          >
            {
              // substitute constant for proper UI text snippet
              e !== NO_EVENT
                ? e //
                : LOAD_ARMY_LIST_PROMPT.NOT_PART_OF_EVENT
            }
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ListEventFilter;
