// React
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid, Button, Fade } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { TournamentRulesContext } from "../../../../../contexts/tournamentRulesContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// constants
import { OPTIONS } from "../../../../../constants/textsAndMessages";
// components and functions
import { filterForSubFaction } from "../../../ListGeneratorFunctions";
import LightSwitch from "../../../../shared/LightSwitch";
import ChoosePdfType from "./ChoosePdfType";

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

  const history = useHistory();
  const [showPdfVariantButtons, setShowPdfVariantButtons] = useState(false);

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
  const openPDfInNewTab = (options) => {
    //TODO: replace in production!!

    let list = [];

    AC.subFactionDTOs
      .map((sF) => sF.name)
      .forEach((name) => {
        list.push({ subFaction: name, units: filterForSubFaction(SEC.selectedUnits, name) });
      });

    const URL = "http://localhost:3000/PdfBox";
    const transportObj = {
      armyName: AC.armyName,
      pdfData: list,
      options: options,
    };

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  // TODO STUD. Replace with REST Call once DB and BE are parts are done.
  const storeList = () => {
    // Call REST
  };

  const disablePdfButton = () => {
    return AC.disableOptionButtons || !showPdfVariantButtons;
  };

  console.log("showPdfVariantButtons");
  console.log(showPdfVariantButtons);

  const buttons = [
    {
      display: disablePdfButton(),
      action: () => {
        setShowPdfVariantButtons(true);
      },
      text: OPTIONS.CREATE_PDF,
    },
    {
      isComplexElement: true,
      display: showPdfVariantButtons,
    },

    {
      // TODO VERSION 2.0 -> addd this
      disabled: true,
      action: () => {
        storeList();
      },
      text: OPTIONS.SAVE_LIST,
      display: true,
    },
    {
      disabled: AC.disableOptionButtons,
      action: () => {
        navigateToLossCalculator();
      },
      text: OPTIONS.TO_LOSS_CALCULATOR,
      display: true,
    },
    {
      disabled: false,
      action: () => {
        TC.setShowTournamentRulesMenu(true);
      },
      text: OPTIONS.CHANGE_TOURNAMENT_RULES,
      display: true,
    },
  ];

  return (
    <Grid container direction="column" alignItems="flex-start" spacing={4} className={classes.overlay}>
      <LightSwitch />

      {buttons.map((bttn, i) => (
        <Grid item key={i}>
          {bttn.display ? (
            // <Fade in={true}>
              <Button
                variant="outlined" //
                disabled={bttn.disabled}
                onClick={bttn.action}
              >
                {bttn.text}
              </Button>
            // </Fade>
          ) : null}
          {bttn.isComplexElement ? (
            <ChoosePdfType
              openPDfInNewTab={openPDfInNewTab} //
              setShowPdfVariantButtons={setShowPdfVariantButtons}
              display={bttn.display}
            />
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
};

export default OptionButtons;
