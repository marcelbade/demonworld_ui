// React
import React from "react";
import { useLocation } from "react-router-dom";
//Material UI
import { Grid, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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
        size="large">
        <ChevronLeftIcon className={classes.BackBttn} />
      </IconButton>
    </Grid>
  );
};

export default ReturnButton;
