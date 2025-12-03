// React
import React from "react";
//Material UI
import { Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";

const ListElementName = (props) => {
  const theme = useTheme();

  const STYLES = {
    padding: "1em", //
    wordWrap: "break-word",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    xs: "subtitle1",
    sm: "subtitle1",
    md: "h6",
  };

  const setStyles = () => {
    return props.unitDestroyed
      ? {
          ...STYLES,
          color: theme.palette.errorColor,
          textDecorationLine: "line-through",
          textDecorationThickness: "0.1em",
        }
      : STYLES;
  };

  return (
    <Grid>
      <Typography sx={setStyles()}>{props.unitName}</Typography>
    </Grid>
  );
};

export default ListElementName;
