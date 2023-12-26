// React
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, IconButton, Typography } from "@mui/material";
// icons
import HelpIcon from "@mui/icons-material/Help";
// components and functions
import usePushMessages from "../../../../../../customHooks/UsePushMessages";

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
  const pushMessages = usePushMessages();

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
              console.log("props.message");
              console.log(props.message);

              pushMessages.showSnackBar("props.message");
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
