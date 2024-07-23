// React
import React from "react";
// material ui
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";

/**
 *Component for the selection Autocomplete input element used by all pages.
 * @param {*} props
 * @returns
 */
const SelectionInput = (props) => {
  return (
    <Autocomplete
      sx={
        props.isArmySelector
          ? {
              marginLeft: "2em",
              "& .MuiFormLabel-root": {
                fontFamily: "NotMaryKate",
                color: "theme.palette.color",
                fontSize: "30px",
              },
            }
          : {
              marginLeft: "2em",
              "& .MuiFormLabel-root": {
                fontFamily: "NotMaryKate",
                color: "theme.palette.color",
                fontSize: "15px",
              },
            }
      }
      id="arymSelection"
      options={props.alternatives}
      onChange={(event, value, reason) => {
        if (reason === "clear") {
          props.clearFunction(props.selectorNumber);
        }
        if (value) {
          props.filterFunction(value, props.selectorNumber);
        }
      }}
      renderInput={(params) => <TextField {...params} label={props.label} variant="standard" />}
    />
  );
};

export default SelectionInput;
