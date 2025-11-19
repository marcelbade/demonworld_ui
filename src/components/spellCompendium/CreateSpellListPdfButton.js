// react
import { useState } from "react";

// components and functions
// context

// constants
import { PDF } from "../../constants/textsAndMessages";
import { PDF_URL } from "../../constants/URLs";
import SelectSpellsDialog from "./SelectSpellsDialog";
import CreatePdfButton from "../shared/CreatePdfButton";

const CreateSpellListPdfButton = (props) => {
  const [showSpellDialog, setShowSpellDialog] = useState(false);
  const [spellsSelectedForPrint, setSpellsSelectedForPrint] = useState([]);

  /**
   * Function opens the pdf generator in a
   * new tab and sends all data needed via the window object.
   */
  const openPDfInNewTab = (options) => {
    const URL = PDF_URL;
    const transportObj = createSpellListData(options);

    window.localStorage.setItem("transportObj", JSON.stringify(transportObj));
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  /**
   * Function creates the data structure for the PDF view.
   * @returns an array of objects eacdh containing all data for one subFaction of the army list.
   */
  const createSpellListData = (options) => {
    // let list = [];

    return {};
  };

  return (
    <CreatePdfButton
      toolTipTitle={PDF.CREATE_PDF} // TODO replace!
      disabledIf={false} // TODO parameterize!
      openDialog={setShowSpellDialog}
      marginLeft={"1em"}
    >
      <SelectSpellsDialog
        displaySpells={props.displaySpells}
        showListTypeDialog={showSpellDialog}
        spellsSelectedForPrint={spellsSelectedForPrint}
        createPrintableFile={openPDfInNewTab}
        setShowPrintTypeDialog={setShowSpellDialog}
        setSpellsSelectedForPrint={setSpellsSelectedForPrint}
      />
    </CreatePdfButton>
  );
};

export default CreateSpellListPdfButton;
