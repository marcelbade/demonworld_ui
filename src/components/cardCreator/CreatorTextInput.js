// react
import React from "react";
// material ui
import { InputAdornment, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";

const CreatorTextInput = (props) => {
  const theme = useTheme();

  return (
    <TextField
      sx={{
        paddingLeft:
          props.paddingLeft === undefined //
            ? 0
            : props.paddingLeft,

        backgroundColor:
          props.backgroundColor === undefined //
            ? theme.palette.statCards.backGround
            : props.backgroundColor,
        color: "white",
        "& .MuiFormLabel-root": {
          fontFamily: "NotMaryKate",
          color: "white",
          // props.backgroundColor === "black" //
          //   ? "white"
          //   : "black",
        },
        "& .MuiFilledInput-root": {
          background: theme.palette.statCards.backGround,
          color: "white",
        },
      }}
      id={props.id}
      label={""}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      autoComplete="off"
      type="search"
      required
      variant="filled"
      InputProps={{
        startAdornment: (
          <InputAdornment
            sx={{
              color: "white",
              backgroundColor:"hotpink"
            }}
            position="start"
          >
            {props.adornment}
          </InputAdornment>
        ),
        style: {
          fontFamily: "NotMaryKate",
          fontSize: "20px",
          color: props.valueColor === undefined ? "black" : props.valueColor,
          width: props.width,
        },
      }}
      multiline
      rows={props.maxRows === undefined ? 1 : props.maxRows}
    />
  );
};

export default CreatorTextInput;
