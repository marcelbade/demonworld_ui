// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
// constants
import { OPTIONS } from "../../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    width: "30vw",
    padding: "2em",
  },

  button: {
    width: "15em",
    padding: "2em",
    height: "5em",
  },
  cardTest: {
    width: "100%",
  },
  errorIcon: {
    color: "red",
  },
  warningBox: {
    border: "red 0.2em solid ",
    borderRadius: "1em",
    marginBottom: "0.2em",
  },
});

const OptionButtons = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const history = useHistory();

  /**
   * Function graps the current army list as an object, stores it in the history object and naviagat3s to the LossCalculator component.
   */
  const navigateToLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "listGenerator",
        selectedArmy: AC.selectedUnits,
      },
    });
  };

  /**
   * Function opens the pdf generator in a new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = () => {
    //TODO: replace in production!!
    const URL = "http://localhost:3000/PdfBox";

    let transportObj = { armyName: AC.armyName, pdfData: AC.pdfMasterList };

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  // TODO STUD. Replace with REST Call once DB and BE are parts are done.
  const storeList = () => {
    // Call REST
  };

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={AC.disableOptionButtons}
          onClick={() => {
            openPDfInNewTab();
          }}
        >
          {OPTIONS.CREATE_PDF}
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={AC.disableOptionButtons}
          onClick={() => {
            storeList();
          }}
        >
          {OPTIONS.SAVE_LIST}
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={AC.disableOptionButtons}
          onClick={() => {
            navigateToLossCalculator();
          }}
        >
          {OPTIONS.TO_LOSS_CALCULATOR}
        </Button>
      </Grid>
      <Grid item>
        <Button
          className={classes.button}
          variant="outlined"
          disabled={false}
          onClick={() => {
            AC.setShowTournamentRulesMenu(true);
          }}
        >
          {OPTIONS.CHANGE_TOURNAMENT_RULES}
        </Button>
      </Grid>
    </Grid>
  );
};

export default OptionButtons;
