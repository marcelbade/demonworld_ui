// React
import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, IconButton, Typography } from "@mui/material";

// icons
import HelpIcon from "@mui/icons-material/Help";
// components and functions
import { ValidationContext } from "../../../../../../contexts/validationContext";

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
  const VC = useContext(ValidationContext);

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
          <IconButton
            onClick={() => {
              VC.setValidationMessage(props.message);
              VC.setShowToastMessage(true);
            }}
            size="large"
          >
            <HelpIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

export default ArmyListSubFactionHeader;
