// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { uuidGenerator } from "../../shared/sharedFunctions";
// constants

// TODO: remove unneeded styles
const useStyles = makeStyles((theme) => ({
  HeaderBoxValid: {
    fontSize: "20px",
    fontWeight: "bold",
    width: "60%",
    borderBottom: "solid 4px black",
    marginBottom: "1em",
  },
}));

const ValidHeader = (props) => {
  const classes = useStyles();

  return (
    <Typography key={uuidGenerator()} className={classes.HeaderBoxValid}>
      {props.subFaction}
    </Typography>
  );
};

export default ValidHeader;
