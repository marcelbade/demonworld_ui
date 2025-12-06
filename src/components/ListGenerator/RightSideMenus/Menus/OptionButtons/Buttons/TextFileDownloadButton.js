// react
import { useContext, useState } from "react";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";
import calculateScoutingFactor from "../../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import CustomIcon from "../../../../../shared/CustomIcon";
import { simpleListTextFileGenerator } from "../../../../../../textFileGenerator/simpleListTextFileGenerator";
import { statCardsTextFileGenerator } from "../../../../../../textFileGenerator/statCardsTextFileGenerator";
// context
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// icons
import txtFileIcon from "../../../../../../assets/icons/txtFileIcon.png";
// constants
import { OPTIONS, PDF } from "../../../../../../constants/textsAndMessages";
import SelectPrintTypeDialog from "../../../../../Dialogs/SelectPdfTypeDialog/SelectPrintTypeDialog";
import { addCardsForMultiStateUnits } from "../../../../../../util/utilityFunctions";

const TextFileDownloadButton = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const stats = useSubFactionStats();
  const ICON_SIZE = "55px";
  const ICON_BOX_SIZE = "60px";

  const [showListTypeDialog, setShowListTypeDialog] = useState(false);

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects each containing all data for one subFaction of the army list.
   */
  const createTextFileData = (options) => {
    let armyList = [];
    let selectedUnits = [...SEC.selectedUnits];

    const allSelectedCards = addCardsForMultiStateUnits(selectedUnits, AC.subFactionDTOs);

    AC.distinctSubFactions.forEach((subFaction) => {
      const subFactionUnits = allSelectedCards.filter((u) => u.subFaction === subFaction);
      armyList.push({
        subFaction: subFaction,
        units: subFactionUnits,
        subFactionTotal: stats.currentTotal(subFactionUnits),
        subFactionPercentage: stats.currentPercentage(subFactionUnits, SEC.maxPointsAllowance),
        minSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, subFaction).min,
        maxSubFactionPercentage: stats.minAndMaxAllowance(AC.selectedFactionName, subFaction).max,
      });
    });

    const textFileData = {
      playerName: AC.playerName,
      teamName: AC.teamName,
      armyName: AC.armyName,
      list: armyList,
      scoutingFactor: calculateScoutingFactor(selectedUnits),
      totalArmyPoints: SEC.maxPointsAllowance,
    };

    const textGeneratorFunction = options.printDefaultList //
      ? simpleListTextFileGenerator
      : statCardsTextFileGenerator;

    const blob = new Blob(
      [textGeneratorFunction(textFileData)], //
      { type: "text/txt" }
    );

    return URL.createObjectURL(blob);
  };

  const downloadListTextFile = (options) => {
    const link = document.createElement("a");
    link.download = `${AC.armyName}.txt`;
    link.href = createTextFileData(options);
    link.click();
  };

  return (
    <>
      <Tooltip title={PDF.TEXTFILE_DOWNLOAD}>
        <span>
          <IconButton
            disabled={SEC.selectedUnits.length === 0} //
            onClick={() => {
              setShowListTypeDialog(true);
            }}
          >
            <CustomIcon
              icon={txtFileIcon} //
              altText={OPTIONS.TEXTFILE_DOWNLOAD}
              height={ICON_SIZE}
              width={ICON_SIZE}
              boxHeight={ICON_BOX_SIZE}
              boxWidth={ICON_BOX_SIZE}
            />
          </IconButton>
        </span>
      </Tooltip>
      {/* <SelectPrintTypeDialog // ### TODO  
        createPrintableFile={downloadListTextFile}
        setShowPrintTypeDialog={setShowListTypeDialog}
        showPdfTypeDialog={showListTypeDialog}
      /> */}
    </>
  );
};

export default TextFileDownloadButton;
