// React
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { Autocomplete } from "@material-ui/lab";
import { ALL_FACTIONS_ARRAY } from "../../constants/factions";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: { width: "300px" },
  textField: {
    "& .MuiAutocomplete-input": {
      fontSize :"40px", 
      fontFamily: "BreatheOfFire",
    },
  },
});

/**
 *Function creates the army selection Autocomplete element used by all pages.
 * @param {*} props 
 * @returns 
 */
const ArmySelection = (props) => {
  const classes = useStyles();

  return (
    <Autocomplete
      id="arymSelection"
      className={classes.root}
      options={ALL_FACTIONS_ARRAY}
      // ALL_FACTIONS_ARRAY already is an array, so: array => array
      getOptionLabel={(ALL_FACTIONS_ARRAY) => ALL_FACTIONS_ARRAY}
      //select a faction
      onChange={(event, value) => props.filterData(value)}
      renderInput={(params) => (
        <TextField
          className={classes.textField}
          {...params}
          label="Fraktion"
          variant="standard"
        />
      )}
    />
  );
};

export default ArmySelection;
