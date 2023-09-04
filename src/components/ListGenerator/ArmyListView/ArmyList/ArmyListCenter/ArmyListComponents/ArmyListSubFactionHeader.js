// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Typography } from "@material-ui/core";
// components and functions
import { uuidGenerator } from "../../../shared/sharedFunctions";
// constants

// TODO: remove unneeded styles
const useStyles = makeStyles((theme) => ({
  HeaderValidStyle: {
    fontSize: "20px",
    fontWeight: "bold",
    width: "60%",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
  },
  HeaderInvalidStyle: {
    fontSize: "20px",
    fontWeight: "bold",
    width: "60%",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
    color: "red",
  },
}));

const ArmyListSubFactionHeader = (props) => {
  const classes = useStyles();

  return props.valid ? (
    <Typography key={uuidGenerator()} className={classes.HeaderValidStyle}>
      {props.subFaction}
    </Typography>
  ) : (
    <Tooltip title={props.message}>
      <div>
        <Typography key={uuidGenerator()} className={classes.HeaderInvalidStyle}>
          {props.subFaction}
        </Typography>
      </div>
    </Tooltip>
  );
};

export default ArmyListSubFactionHeader;
