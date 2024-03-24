// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import { StateCardContext } from "../../../../../contexts/statCardContext";

const CardBackTitle = () => {
  const SC = useContext(StateCardContext);

  return (
    <Grid container justifyContent="center">
      <Typography
        variant="h6"
        align="center"
        sx={{
          wordSpacing: "100vw", //
          flexWrap: "nowrap",
          fontWeight: "normal",
          fontSize: "30px",
          color: "red",
        }}
      >
        {SC.unit.faction}
      </Typography>
    </Grid>
  );
};

export default CardBackTitle;
