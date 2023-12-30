// React
import React from "react";
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

/**
 *Component for the army selection Autocomplete input element used by all pages.
 * @param {*} props
 * @returns
 */
const SelectionInput = (props) => {
  return (
    <Autocomplete
      id="arymSelection"
      options={props.options}
      onChange={(event, value, reason) => {
        if (reason === "clear") {
          props.clearFunction();
        }
        if (value) {
          props.filterFunction(value);
        }
      }}
      renderInput={(params) => <TextField {...params} label={props.label} variant="standard" />}
    />
  );
};

export default SelectionInput;
