// React
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Material UI
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: { width: "600px", marginLeft: "40px" },
  armySelector: {
    "& .MuiAutocomplete-input": {
      fontSize: "40px",
      fontFamily: "BreatheOfFire",
    },
  },
  AlternativeList:{
    "& .MuiAutocomplete-input": {
      fontSize: "14px",
      fontFamily: "notMaryKate",
    },
  }
});

/**
 *Function creates the army selection Autocomplete element used by all pages.
 * @param {*} props
 * @returns
 */
const SelectionInput = (props) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id="arymSelection"
      className={classes.root}
      options={props.options}
      onChange={(event, value, reason) => {
        if (reason === "clear") {
          props.clearFunction();
        }
        if (value) props.filterFunction(value);
      }}
      renderInput={(params) => (
        <TextField className={props.isArmySelector ? classes.armySelector : classes.AlternativeList} {...params} label={props.label} variant="standard" />
      )}
    />
  );
};

export default SelectionInput;
