// react
import { useContext } from "react";
//  components and functions
import { addCardsForMultiStateUnits } from "../util/utilityFunctions";
import calculateScoutingFactor from "../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
//  context
import { ArmyContext } from "../contexts/armyContext";
import { SelectionContext } from "../contexts/selectionContext";
import { UserContext } from "../contexts/userContext";
// custom hooks
import useSubFactionStats from "./UseSubFactionStats";
// constants
import { UNIT_CARD_PDF_URL } from "../constants/URLs";
import { PDF_IS_CUSTOM_CARD, PDF_IS_LIST } from "../constants/pdfCreation";

const usePdfCreator = (unitPrintData, pdfType) => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);
  const UC = useContext(UserContext);

  const stats = useSubFactionStats();

  /**
   * Function opens the pdf generator in a
   * new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = (options) => {
    const URL = UNIT_CARD_PDF_URL;

    let transportObj;

    if (pdfType === PDF_IS_CUSTOM_CARD) {
      transportObj = createCustomUnitPdfData(options);
    }

    if (pdfType === PDF_IS_LIST) {
      transportObj = createUnitListPdfData(options);
    }

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  const createCustomUnitPdfData = (options) => {
    let list = [];
    const entry = unitPrintData[0];
    list.push({
      subFaction: entry.subFaction,
      units: unitPrintData,
      subFactionTotal: null,
      subFactionPercentage: null,
      minSubFactionPercentage: null,
      maxSubFactionPercentage: null,
    });

    // TODO MultiStateCards!

    return {
      playerName: UC.user,
      teamName: null,
      armyName: entry.faction,
      list: list,
      scoutingFactor: null,
      totalArmyPoints: null,
      options: options,
    };
  };

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createUnitListPdfData = (options) => {
    let list = [];
    let selectedUnits = [...unitPrintData];

    const allSelectedCards = addCardsForMultiStateUnits(selectedUnits, AC.subFactionDTOs);

    AC.distinctSubFactions.forEach((distinctSubFaction) => {
      const subFactionUnits = allSelectedCards.filter((u) => u.subFaction === distinctSubFaction);
      list.push({
        subFaction: distinctSubFaction,
        units: subFactionUnits,
        subFactionTotal: stats.currentTotal(subFactionUnits),
        subFactionPercentage: stats.currentPercentage(subFactionUnits, SEC.maxPointsAllowance),
        minSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, distinctSubFaction).min,
        maxSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, distinctSubFaction).max,
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

  return {
    openPDfInNewTab: openPDfInNewTab,
  };
};

export default usePdfCreator;
