// React
import React from "react";
import { useLocation } from "react-router-dom";
//Material UI
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles({
  BackBttn: {
    width: "2em",
    height: "2em",
  },
});

const ReturnButton = (props) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid item>
      <IconButton
        onClick={() => {
          props.navigateToPage(location.state.lastPage);
        }}
      >
        <ChevronLeftIcon className={classes.BackBttn} />
      </IconButton>
    </Grid>
  );
};

export default ReturnButton;
