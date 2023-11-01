// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";

// icons
import HelpIcon from "@material-ui/icons/Help";
// components and functions
import { ValidationContext } from "../../../../../../contexts/validationContext";

const useStyles = makeStyles(() => ({
  HeaderValidStyle: {
    fontSize: "20px",
    fontWeight: "bold",
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
  const VC = useContext(ValidationContext);

  return (
    <Grid container>
      {props.valid ? (
        <Typography key={props.subFaction} className={classes.HeaderValidStyle}>
          {props.subFaction}
        </Typography>
      ) : (
        <Grid
          container //
          direction="row"
          className={classes.HeaderInvalidStyle}
          alignItems="center"
        >
          <Typography key={props.subFaction} className={classes.invalidText}>
            {props.subFaction}
          </Typography>
          <IconButton
            onClick={() => {
              VC.setValidationMessage(props.message);
              VC.setShowToastMessage(true);
            }}
          >
            <HelpIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default ArmyListSubFactionHeader;
