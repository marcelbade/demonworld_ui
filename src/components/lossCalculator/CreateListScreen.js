// React
import React from "react";
//Material UI
import { Button, Grid, IconButton } from "@mui/material";
import {makeStyles} from "@material-ui/core";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// constants
import { LOSS_CALCULATOR } from "../../constants/textsAndMessages";

const useStyles = makeStyles({
  typographyFont: {},
  pointsTotal: {
    marginLeft: "2em",
  },
  BackBttn: {
    width: "2em",
    height: "2em",
  },
  noListButtons: {
    margin: "2em",
    width: "30em",
    height: "3em",
  },
});

const CreateListScreen = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid>
        <IconButton
          onClick={() => {
            // navigate to landing page
            props.navigateToPage("");
          }}
          size="large"
        >
          <ChevronLeftIcon className={classes.BackBttn} />
        </IconButton>
      </Grid>
      <Grid container direction="column" alignContent="center" justifyContent="center">
        <Button
          variant="outlined"
          className={classes.noListButtons}
          onClick={() => {
            props.navigateToPage("ListGenerator");
          }}
        >
          {LOSS_CALCULATOR.CREATE_LIST}
        </Button>
        <Button
          variant="outlined"
          className={classes.noListButtons}
          onClick={() => {
            //TODO open login prompt
          }}
        >
          {LOSS_CALCULATOR.LOG_INTO_ACCOUNT}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
