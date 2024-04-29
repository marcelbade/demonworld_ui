// React
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid, Button, Fade } from "@mui/material";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { TournamentRulesContext } from "../../../../../contexts/tournamentRulesContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// components and functions
import LightSwitch from "../../../../shared/LightSwitch";
import ChoosePdfType from "./ChoosePdfType";
import calculateScoutingFactor from "../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import useSubFactionStats from "../../../../../customHooks/UseSubFactionStats";
 // constants
import { OPTIONS } from "../../../../../constants/textsAndMessages";

const OptionButtons = () => {
  const AC = useContext(ArmyContext);
  const TC = useContext(TournamentRulesContext);
  const SEC = useContext(SelectionContext);

  const history = useHistory();
  const stats = useSubFactionStats();
 
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
    //TODO: replace URL in production!!

    const URL = "http://localhost:3000/PdfBox";
    const transportObj = createPDFData(options);

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  /**
   * Function cresates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createPDFData = (options) => {
    let list = [];
    let selectedUnits = [...SEC.selectedUnits];

    const allSelectedCards = addCardsForMultiStateUnits(selectedUnits);

    AC.subFactionDTOs
      .map((sF) => sF.name)
      .forEach((name) => {
        const subFactionUnits = allSelectedCards.filter((u) => u.subFaction === name);
        list.push({
          subFaction: name, //
          units: subFactionUnits,
          subFactionTotal: stats.currentTotal(subFactionUnits),
          subFactionPercentage: stats.currentPercentage(subFactionUnits, SEC.maxPointsAllowance),
          minSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, name).min,
          maxSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, name).max,
        });
      });

    return {
      playerName: AC.playerName,
      teamName: AC.teamName,
      armyName: AC.armyName,
      list: list,
      scoutingFactor: calculateScoutingFactor(selectedUnits),
      totalArmyPoints: SEC.maxPointsAllowance,
      options: options,
    };
  };

  /**
   * Function adds the missing cards for multi state units to the array of selected cards.
   * If a unit has multiple stat cards, then only one is displayed by the app and can be selected for the list.
   * The function puts those card objects back to ensure that the detailed PDF contains all cards needed.
   * @param {[unitCards]} selectedUnits
   * @returns a unitCard array with the all cards for multi state units added.
   */
  const addCardsForMultiStateUnits = (selectedUnits) => {
    selectedUnits.forEach((u) => {
      if (u.isMultiStateUnit) {
        const subFaction = AC.subFactionDTOs.find((sF) => sF.name === u.subFaction);
        const cards = subFaction.units.filter(
          (subFactionUnit) =>
            subFactionUnit.unitName.includes(u.unitName) && //
            subFactionUnit.multiStateOrderNumber > 1
        );

        cards.forEach((c) => selectedUnits.push(c));
      }
    });

    return selectedUnits;
  };

  // TODO STUD. Replace with REST Call once DB and BE are parts are done.
  const storeList = () => {
    // Call REST
  };

  const disablePdfButton = () => {
    return AC.disableOptionButtons || !showPdfVariantButtons;
  };

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
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{
        height: "100vh",
        width: "30vw",
        padding: "2em",
      }}
    >
      <LightSwitch />
      {buttons.map((bttn, i) => (
        <Grid item key={i}>
          {bttn.display ? (
            <Fade in={true}>
              <Button
                variant="outlined" //
                disabled={bttn.disabled}
                onClick={bttn.action}
              >
                {bttn.text}
              </Button>
            </Fade>
          ) : null}
          {bttn.isComplexElement ? (
            <ChoosePdfType
              openPDfInNewTab={openPDfInNewTab} //
              setShowPdfVariantButtons={setShowPdfVariantButtons}
              display={showPdfVariantButtons}
            />
          ) : null}
        </Grid>
      ))}
    </Grid>
  );
};

export default OptionButtons;
