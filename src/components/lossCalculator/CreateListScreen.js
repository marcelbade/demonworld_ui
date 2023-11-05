// React
import React from "react";
//Material UI
import { Button, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// icons
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

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
          Liste Erstellen
        </Button>
        <Button
          variant="outlined"
          className={classes.noListButtons}
          onClick={() => {
            //TODO open login prompt
          }}
        >
          Ins Konto einloggen und Liste Laden.
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
