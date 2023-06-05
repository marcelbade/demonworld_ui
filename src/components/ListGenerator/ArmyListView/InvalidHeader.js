// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Typography } from "@material-ui/core";
// components and functions
import { uuidGenerator } from "../../shared/sharedFunctions";
// constants

// TODO: remove unneeded styles
const useStyles = makeStyles((theme) => ({
  HeaderBoxInvalid: {
    fontSize: "20px",
    fontWeight: "bold",
    width: "60%",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
    color: "red",
  },
}));

const InvalidHeader = (props) => {
  const classes = useStyles();

  return (
    <Tooltip title={props.message}>
      <div>
        <Typography key={uuidGenerator()} className={classes.HeaderBoxInvalid}>
          {props.subFaction}
        </Typography>
      </div>
    </Tooltip>
  );
};

export default InvalidHeader;
