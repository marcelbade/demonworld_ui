// React
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Typography } from "@mui/material";
 // components and functions
import ContextHelpButton from "../../../../../shared/ContextHelpButton";

const useStyles = makeStyles(() => ({
  HeaderValidStyle: {
    width: "60%",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
  },
  HeaderInvalidStyle: {
    width: "60%",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
    color: "red",
  },
  invalidText: { fontSize: "20px", fontWeight: "bold" },
}));

const ArmyListSubFactionHeader = (props) => {
  const classes = useStyles();
 
  return (
    <Grid container>
      {props.valid ? (
        <Typography
          key={props.subFaction} //
          variant="subtitle1"
          className={classes.HeaderValidStyle}
        >
          {props.subFaction}
        </Typography>
      ) : (
        <Grid
          container //
          direction="row"
          className={classes.HeaderInvalidStyle}
          alignItems="center"
        >
          <Typography
            key={props.subFaction} //
            className={classes.invalidText}
            variant="subtitle1"
          >
            {props.subFaction}
          </Typography>
          <ContextHelpButton message={props.message} />
        </Grid>
      )}
    </Grid>
  );
};

export default ArmyListSubFactionHeader;
