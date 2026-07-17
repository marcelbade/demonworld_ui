// react
import { useContext, useState } from "react";
// components and functions
import SelectPrintTypeDialog from "../../../../../Dialogs/SelectPdfTypeDialog/SelectPrintTypeDialog";
// context
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// constants
import { PDF } from "../../../../../../constants/textsAndMessages";
import CreatePdfButton from "../../../../../shared/CreatePdfButton";
import { PDF_IS_LIST } from "../../../../../../constants/pdfCreation";

// custom hooks
import usePdfCreator from "../../../../../../customHooks/UsePdfCreator";

const CreateArmyListPdfButton = () => {
  const SEC = useContext(SelectionContext);

  const [showListTypeDialog, setShowListTypeDialog] = useState(false);

  const pdfCreator = usePdfCreator(SEC.selectedUnits, PDF_IS_LIST);

  const ICON_SIZE = "60px";
  const ICON_BOX_SIZE = "65px";

  return (
    <CreatePdfButton
      data={SEC.selectedUnits}
      toolTipTitle={PDF.CREATE_PDF} //
      openDialog={setShowListTypeDialog}
      marginLeft={"0em"}
      size={ICON_SIZE}
      boxSize={ICON_BOX_SIZE}
    >
      <SelectPrintTypeDialog
        createPrintableFile={pdfCreator.openPDfInNewTab}
        setShowPrintTypeDialog={setShowListTypeDialog}
        showListTypeDialog={showListTypeDialog}
      />
    </CreatePdfButton>
  );
};

export default CreateArmyListPdfButton;
