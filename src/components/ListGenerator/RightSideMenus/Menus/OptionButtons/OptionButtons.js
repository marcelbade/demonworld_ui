// React
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { Grid2 as Grid, Button } from "@mui/material";
// context
import { ArmyContext } from "../../../../../contexts/armyContext";
import { TournamentRulesContext } from "../../../../../contexts/tournamentRulesContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { UserContext } from "../../../../../contexts/userContext";
// components and functions
import calculateScoutingFactor from "../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import useSubFactionStats from "../../../../../customHooks/UseSubFactionStats";
// constants
import { OPTIONS, PDF } from "../../../../../constants/textsAndMessages";
import { PDF_URL } from "../../../../../constants/URLs";
import LoginPrompt from "../../../../Login/LogInPrompt";
import SelectPdfTypePrompt from "./SelectPdfTypePrompt";
import StoreArmyListPrompt from "./StoreArmyListPrompt";
import LoadArmyListPrompt from "./LoadArmyListPrompt";

const OptionButtons = () => {
  const AC = useContext(ArmyContext);
  const TC = useContext(TournamentRulesContext);
  const SEC = useContext(SelectionContext);
  const UC = useContext(UserContext);

  const history = useHistory();
  const stats = useSubFactionStats();

  const [showPdfTypePrompt, setShowPdfTypePrompt] = useState(false);
  const [showArmySavePrompt, setShowArmySavePrompt] = useState(false);
  const [showArmyLoadPrompt, setShowArmyLoadPrompt] = useState(false);

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

    const URL = PDF_URL;
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

  const storeList = () => {
    UC.userLoggedIn ? setShowArmySavePrompt(true) : UC.setDisplayLogInPrompt(true);
  };

  const showLoadListPrompt = () => {
    setShowArmyLoadPrompt(true);
  };

  const buttons = [
    {
      disabled: SEC.selectedUnits.length === 0,
      action: () => {
        setShowPdfTypePrompt(true);
      },
      text: PDF.CREATE_PDF,
    },

    {
      disabled: SEC.selectedUnits.length === 0,
      action: () => {
        storeList();
      },
      text: OPTIONS.STORE_LIST,
    },
    {
      disabled: !UC.userLoggedIn,
      action: () => {
        showLoadListPrompt();
      },
      text: OPTIONS.LOAD_LIST,
    },

    {
      disabled: SEC.selectedUnits.length === 0,
      action: () => {
        navigateToLossCalculator();
      },
      text: OPTIONS.TO_LOSS_CALCULATOR,
    },
    {
      disabled: false, // always switched on
      action: () => {
        TC.setShowTournamentRulesMenu(true);
      },
      text: OPTIONS.CHANGE_TOURNAMENT_RULES,
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
      <LoginPrompt />
      <SelectPdfTypePrompt
        openPDfInNewTab={openPDfInNewTab} //
        setShowPdfTypePrompt={setShowPdfTypePrompt}
        showPdfTypePrompt={showPdfTypePrompt}
      />
      <StoreArmyListPrompt
        showArmySavePrompt={showArmySavePrompt} //
        setShowArmySavePrompt={setShowArmySavePrompt} //
      />
      <LoadArmyListPrompt
        listSetter={SEC.setSelectedUnits}
        showArmyLoadPrompt={showArmyLoadPrompt} //
        setShowArmyLoadPrompt={setShowArmyLoadPrompt} //
      />
      {buttons.map((bttn, i) => (
        <Grid key={i}>
          <Button
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
