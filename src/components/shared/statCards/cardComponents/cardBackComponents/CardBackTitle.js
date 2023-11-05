// React
import React, { useContext } from "react";
// Material UI
import { Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { StateCardContext } from "../../../../../contexts/statCardContext";

const useStyles = makeStyles({
  cardTitle: {
    wordSpacing: "100vw",
    flexWrap: "nowrap",
    fontWeight: "normal",
    fontSize: "30px",
    color: "red",
  },
});

const CardBackTitle = () => {
  const classes = useStyles();

  const SC = useContext(StateCardContext);

  return (
    <Grid container justifyContent="center">
      <Typography variant="h6" align="center" className={classes.cardTitle}>
        {SC.unit.faction}
      </Typography>
    </Grid>
  );
};

export default CardBackTitle;
