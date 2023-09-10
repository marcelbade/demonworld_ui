// React
import React, { useContext } from "react";
// Material UI
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
// Icons

// context
import { ArmyContext } from "../../../../../contexts/armyContext";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    padding: "2em",
  },

  button: {
    width: "15em",
    padding: "2em",
    height: "5em",
  },
  cardTest: {
    width: "100%",
  },
  errorIcon: {
    color: "red",
  },
  warningBox: {
    border: "red 0.2em solid ",
    borderRadius: "1em",
    marginBottom: "0.2em",
  },
});

const TournamentRulesMenu = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default TournamentRulesMenu;
