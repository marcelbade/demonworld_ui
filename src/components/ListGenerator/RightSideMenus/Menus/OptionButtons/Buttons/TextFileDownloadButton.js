// react
import { useContext } from "react";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";
import calculateScoutingFactor from "../../../../../../gameLogic/scoutFactorCalculator/scoutingFactorCalculator";
import CustomIcon from "../../../../../shared/CustomIcon";
import { simpleListTextFileGenerator } from "../../../../../../util/simpleListTextFileGenerator";
import { statCardsTextFileGenerator } from "../../../../../../util/statCardsTextFileGenerator";
// context
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// icons
import downloadIcon from "../../../../../../assets/icons/downloadIcon.png";
// constants
import { OPTIONS, PDF } from "../../../../../../constants/textsAndMessages";

const TextFileDownloadButton = () => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const stats = useSubFactionStats();

  /**
   * Function adds the missing cards for multi state units to the array
   * of selected cards.
   * If a unit has multiple stat cards, then only one is displayed by the
   * app and can be selected for the list.
   * The function puts those card objects back to ensure that the
   * detailed PDF contains all cards needed.
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

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createTextFileData = () => {
    let armyList = [];
    let selectedUnits = [...SEC.selectedUnits];

    const allSelectedCards = addCardsForMultiStateUnits(selectedUnits);

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

    // TODO: remove hard coding once the prototype stands!
    let isSimpleFileSelected = false; 

    const textGeneratorFunction = isSimpleFileSelected //
      ? simpleListTextFileGenerator
      : statCardsTextFileGenerator;

    const blob = new Blob(
      [textGeneratorFunction(textFileData)], //
      { type: "text/txt" }
    );

    return URL.createObjectURL(blob);
  };

  const downloadListTextFile = () => {
    const link = document.createElement("a");
    link.download = `${AC.armyName}.txt`;
    link.href = createTextFileData();
    link.click();
  };

  return (
    <>
      <Tooltip title={PDF.TEXTFILE_DOWNLOAD}>
        <span>
          <IconButton
            disabled={SEC.selectedUnits.length === 0} //
            onClick={() => {
              downloadListTextFile();
            }}
          >
            <CustomIcon
              icon={downloadIcon} //
              altText={OPTIONS.TEXTFILE_DOWNLOAD}
              height={"65px"}
              width={"65px"}
              boxHeight={"70px"}
              boxWidth={"62px"}
            />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
};

export default TextFileDownloadButton;
