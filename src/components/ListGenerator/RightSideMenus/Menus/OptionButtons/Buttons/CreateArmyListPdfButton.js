// react
import { useContext, useState } from "react";

// components and functions
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";
import calculateScoutingFactor from "../../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import SelectPrintTypeDialog from "../../../../../Dialogs/SelectPdfTypeDialog/SelectPrintTypeDialog";
// context
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../../contexts/selectionContext";

// constants
import { PDF } from "../../../../../../constants/textsAndMessages";
import { UNIT_CARD_PDF_URL } from "../../../../../../constants/URLs";
import { addCardsForMultiStateUnits } from "../../../../../../util/utilityFunctions";
import CreatePdfButton from "../../../../../shared/CreatePdfButton";

const CreateArmyListPdfButton = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const stats = useSubFactionStats();

  const [showListTypeDialog, setShowListTypeDialog] = useState(false);

  /**
   * Function opens the pdf generator in a
   * new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = (options) => {
    const URL = UNIT_CARD_PDF_URL;
    const transportObj = createUnitListPDFData(options);

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createUnitListPDFData = (options) => {
    let list = [];
    let selectedUnits = [...SEC.selectedUnits];

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

  return (
    <CreatePdfButton
      toolTipTitle={PDF.CREATE_PDF} //
      disabledIf={SEC.selectedUnits.length === 0}
      openDialog={setShowListTypeDialog}
       marginLeft={"0em"}
    >
      <SelectPrintTypeDialog
        createPrintableFile={openPDfInNewTab}
        setShowPrintTypeDialog={setShowListTypeDialog}
        showListTypeDialog={showListTypeDialog}
      />
    </CreatePdfButton>
  );
};

export default CreateArmyListPdfButton;
