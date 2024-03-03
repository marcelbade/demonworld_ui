// React
import React from "react";
// material ui
import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  inputDimensions: {
    width: "25em",
  },
}));

/**
 *Component for the army selection Autocomplete input element used by all pages.
 * @param {*} props
 * @returns
 */
const SelectionInput = (props) => {
  const classes = useStyles();

  return (
    <Autocomplete
      className={classes.inputDimensions}
      id="arymSelection"
      options={props.alternatives}
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
