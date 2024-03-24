// React
import React from "react";
//Material UI
import { Typography, Grid } from "@mui/material";

const ListElementName = (props) => {
  return (
    <Grid item>
      <Typography
        variant="h6"
        sx={
          props.unitDestroyed //
            ? {
                paddingLeft: "1em",
                color: "red",
                textDecorationLine: "line-through",
                textDecorationThickness: "0.2em",
              }
            : { paddingLeft: "1em" }
        }
      >
        {props.unitName}
      </Typography>
    </Grid>
  );
};

export default ListElementName;
