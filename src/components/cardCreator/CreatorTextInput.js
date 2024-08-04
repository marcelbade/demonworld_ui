// react
import React from "react";
// material ui
import { InputAdornment, TextField, Typography } from "@mui/material";
// import { useTheme } from "@emotion/react";
import CustomIcon from "../shared/statCards/CustomIcon";

const   CreatorTextInput = (props) => {
  // const theme = useTheme();

  const ICON_SIZE = 25;

  return (
    <TextField
      id={props.id}
      label={props.label}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      autoComplete="off"
      variant="filled"
      disabled={props.disabled}
      type={props.type}
      // Since multiline takes no values, all fields are multiline with 1 line
      //  unless a the maxRows props is used.
      multiline
      rows={props.maxRows === undefined ? 1 : props.maxRows}
      // padding and background of the entire element
      sx={{
        width: props.width,
        paddingLeft:
          props.paddingLeft === undefined //
            ? 0
            : props.paddingLeft,

        marginLeft:
          props.marginSides === undefined //
            ? 0
            : props.marginSides,

        marginRight:
          props.marginSides === undefined //
            ? 0
            : props.marginSides,

        backgroundColor:
          props.backgroundColor === undefined //
            ? null
            : props.backgroundColor,

        "& .MuiFormLabel-root": {
          color: "black",
          fontFamily: "notMaryKate",
        },

        "& .MuiFilledInput-root": {
          background: "orange",
        },
      }}
      InputProps={{
        //  descpription text or icon
        startAdornment: (
          <InputAdornment
            position={
              props.adornmentPosition === undefined //
                ? "start"
                : props.adornmentPosition
            }
          >
            {props.statIcon === undefined ? ( //
              <Typography>{props.adornment}</Typography>
            ) : (
              <CustomIcon //
                icon={props.statIcon}
                altText={props.adornment}
                height={ICON_SIZE}
                width={ICON_SIZE}
                boxHeight={ICON_SIZE}
                boxWidth={ICON_SIZE}
              />
            )}
          </InputAdornment>
        ),
        // Style of text typed into field
        style: {
          fontFamily: "jaapokkiRegular",
          fontSize: "20px",
          color: props.valueColor === undefined ? "black" : props.valueColor,
          width: props.width,
        },
      }}
    />
  );
};

export default CreatorTextInput;
