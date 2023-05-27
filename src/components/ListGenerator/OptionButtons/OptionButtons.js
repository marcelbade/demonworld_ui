// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions

import { ArmyContext } from "../../../contexts/armyContext";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",

    padding: "2em",
  },
  bttnGroup: {},
  button: {
    width: "15em",
    fontFamily: "notMaryKate",
    padding: "2em",

    height: "5em",
    "&:hover": {
      backgroundColor: "grey",
      color: "red",
    },
  },
});

const OptionButtons = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);
  const history = useHistory();

  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    contextArmy.selectedUnits.length === 0 ? setDisableButton(true) : setDisableButton(false);
  }, [contextArmy.selectedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function graps the current army list as an object, stores it in the history object and naviagat3s to the LossCalculator component.
   */
  const navigateToLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "listGenerator",
        selectedArmy: contextArmy.selectedUnits,
      },
    });
  };
  const navigateToPDFGenerator = () => {
    history.push({
      pathname: "/PDFGenerator",
      state: {
        selectedArmy: contextArmy.selectedUnits,
      },
    });
  };
  const storeList = () => {
    // Call REST
  };

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButton}
          onClick={() => {
            contextArmy.clearList();
          }}
        >
          Liste löschen
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButton}
          onClick={() => {
            navigateToPDFGenerator();
          }}
        >
          PDF Erzeugen
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButton}
          onClick={() => {
            storeList();
          }}
        >
          Liste Speichern
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={disableButton}
          onClick={() => {
            navigateToLossCalculator();
          }}
        >
          Zum Verlustrechner
        </Button>
      </Grid>
    </Grid>
  );
};

export default OptionButtons;