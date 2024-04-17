// React
import React from "react";
//Material UI
import { Typography, Grid } from "@mui/material";

const ListElementName = (props) => {
  const STYLES = {
    paddingLeft: "1em", //
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const setStyles = () => {
    return props.unitDestroyed
      ? {
          ...STYLES,
          color: "red",
          textDecorationLine: "line-through",
          textDecorationThickness: "0.2em",
        }
      : STYLES;
  };

  return (
    <Grid item>
      <Typography variant="h6" sx={setStyles()}>
        {props.unitName}
      </Typography>
    </Grid>
  );
};

export default ListElementName;
