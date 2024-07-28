// react
import React from "react";
// material ui
import { InputAdornment, TextField, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const CreatorTextInput = (props) => {
  const theme = useTheme();

  return (
    <TextField
      id={props.id}
      label={""}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      autoComplete="off"
      type="search"
      required
      variant="filled"
      // Since multiline takes no values, all fields are multiline with 1 line
      //  unless a the maxRows props is used.
      multiline
      rows={props.maxRows === undefined ? 1 : props.maxRows}
      // padding and background of the entire element
      sx={{
        paddingLeft:
          props.paddingLeft === undefined //
            ? 0
            : props.paddingLeft,

        backgroundColor:
          props.backgroundColor === undefined //
            ? theme.palette.statCards.backGround
            : props.backgroundColor,
      }}
      InputProps={{
        //  descpription
        startAdornment: (
          <InputAdornment position="start">
            <Typography sx={{ color: "white" }}>{props.adornment}</Typography>
          </InputAdornment>
        ),
        // Style of text typed into field
        style: {
          fontFamily: "NotMaryKate",
          fontSize: "20px",
          color: props.valueColor === undefined ? "black" : props.valueColor,
          width: props.width,
        },
      }}
    />
  );
};

export default CreatorTextInput;
