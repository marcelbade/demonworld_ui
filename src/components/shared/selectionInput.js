// React
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { Autocomplete } from "@material-ui/lab";
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";
import { TextField } from "@material-ui/core";
import { getByLabelText } from "@testing-library/react";

const useStyles = makeStyles({
  root: { width: "600px", marginLeft: "40px" },
  textField: {
    "& .MuiAutocomplete-input": {
      fontSize: "40px",
      fontFamily: "BreatheOfFire",
    },
  },
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
      onChange={(event, value) => {
        if (value) props.filterData(value);
      }}
      renderInput={(params) => <TextField className={classes.textField} {...params} label={props.label} variant="standard" />}
    />
  );
};

export default SelectionInput;
