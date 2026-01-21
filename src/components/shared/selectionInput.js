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
      multiple={props.allowsMultiple}
      disabled={props.disabled === undefined ? false : props.disabled}
      sx={{
        color:
          props.textColor === null //
            ? "theme.palette.color"
            : props.textColor,

        marginLeft: "2em",

        width:
          props.width === undefined //
            ? null
            : props.width,

        "& .MuiInput-input": {
          color:
            props.textColor === null //
              ? "theme.palette.color"
              : props.textColor,
        },

        "& .MuiFormLabel-root": {
          fontFamily: "NotMaryKate",

          color:
            props.textColor === null //
              ? "theme.palette.color"
              : props.textColor,

          fontSize: props.isArmySelector //
            ? "30px"
            : "1em",
        },
      }}
      id="arymSelection"
      options={props.alternatives}
      // event is necessary!!
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
