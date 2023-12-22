// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid, Button, IconButton, Tooltip, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { TournamentRulesContext } from "../../../../../contexts/tournamentRulesContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// constants
import { OPTIONS } from "../../../../../constants/textsAndMessages";
// components and functions
import { filterForSubFaction } from "../../../ListGeneratorFunctions";
import { LightSwitchContext } from "../../../../../contexts/lightSwitchContext";
// icons
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Brightness4Icon from "@mui/icons-material/Brightness4";

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
});

const OptionButtons = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);
  const TC = useContext(TournamentRulesContext);
  const SEC = useContext(SelectionContext);
  const LC = useContext(LightSwitchContext);

  const history = useHistory();

  /**
   * Function graps the current army list as an object, stores it in the history object and naviagat3s to the LossCalculator component.
   */
  const navigateToLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "listGenerator",
        selectedArmy: SEC.selectedUnits,
      },
    });
  };

  /**
   * Function opens the pdf generator in a new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = () => {
    //TODO: replace in production!!

    let list = [];

    AC.subFactionObjects.forEach((sF) => {
      list.push({ subFaction: sF, units: filterForSubFaction(SEC.selectedUnits, sF) });
    });

    const URL = "http://localhost:3000/PdfBox";
    const transportObj = { armyName: AC.armyName, pdfData: list };

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  // TODO STUD. Replace with REST Call once DB and BE are parts are done.
  const storeList = () => {
    // Call REST
  };

  const toggleDarkMode = () => {
    LC.setDarkModeOff((prevState) => !prevState);
  };

  const buttons = [
    {
      disabled: AC.disableOptionButtons,
      action: () => {
        openPDfInNewTab();
      },
      text: OPTIONS.CREATE_PDF,
    },
    {
      // TODO VERSION 2.0 -> addd this
      disabled: true,
      action: () => {
        storeList();
      },
      text: OPTIONS.SAVE_LIST,
    },
    {
      disabled: AC.disableOptionButtons,
      action: () => {
        navigateToLossCalculator();
      },
      text: OPTIONS.TO_LOSS_CALCULATOR,
    },
    {
      disabled: false,
      action: () => {
        TC.setShowTournamentRulesMenu(true);
      },
      text: OPTIONS.CHANGE_TOURNAMENT_RULES,
    },
  ];

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <Grid item>
        <Tooltip title={<Typography>{OPTIONS.LIGHT_SWITCH}</Typography>}>
          <IconButton
            onClick={() => {
              toggleDarkMode();
            }}
          >
            {LC.darkModeOff ? <Brightness4Icon /> : <BrightnessHighIcon />}
          </IconButton>
        </Tooltip>
      </Grid>

      {buttons.map((bttn, i) => (
        <Grid item key={i}>
          <Button
            // className={classes.button}
            variant="outlined" //
            disabled={bttn.disabled}
            onClick={bttn.action}
          >
            {bttn.text}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default OptionButtons;
