// react
import { useState } from "react";
// constants
import { PDF } from "../../constants/textsAndMessages";
import { SPELL_CARD_PDF_URL } from "../../constants/URLs";
import SpellPrintDialog from "./SpellPrintDialog";
import CreatePdfButton from "../shared/CreatePdfButton";

const CreateSpellListPdfButton = (props) => {
  const [showSpellDialog, setShowSpellDialog] = useState(false);

  /**
   * Function opens the pdf generator in a
   * new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = () => {
    const URL = SPELL_CARD_PDF_URL;
    const transportObj = createSpellListData();

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createSpellListData = () => {
    const list = props.displaySpells.filter((s) => s.isSelected === true);

    return { list: list };
  };

  return (
    <CreatePdfButton
      data={props.displaySpells}
      toolTipTitle={PDF.CREATE_PDF}
      disabledIf={false}
      openDialog={setShowSpellDialog}
      marginLeft={"1em"}
      color={props.color}
      size={props.size}
    >
      <SpellPrintDialog
        displaySpells={props.displaySpells}
        setDisplaySpells={props.setDisplaySpells}
        showListTypeDialog={showSpellDialog}
        createPrintableFile={openPDfInNewTab}
        setShowPrintTypeDialog={setShowSpellDialog}
      />
    </CreatePdfButton>
  );
};

export default CreateSpellListPdfButton;
