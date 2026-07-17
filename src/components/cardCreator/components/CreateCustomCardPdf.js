// react
import { useContext, useState } from "react";
// functions and components
import SelectPrintTypeDialog from "../../Dialogs/SelectPdfTypeDialog/SelectPrintTypeDialog";
import CreatePdfButton from "../../shared/CreatePdfButton";
// context
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { PDF } from "../../../constants/textsAndMessages";
import { PDF_IS_CUSTOM_CARD } from "../../../constants/pdfCreation";
// custom hooks
import usePdfCreator from "../../../customHooks/UsePdfCreator";

const CreateCustomCardPdf = () => {
  const CCC = useContext(CardCreationContext);

  const [showListTypeDialog, setShowListTypeDialog] = useState(false);

  const ICON_SIZE = "60px";
  const ICON_BOX_SIZE = "65px";

  let list = [];
  list.push(CCC.unit);

  const pdfCreator = usePdfCreator(list, PDF_IS_CUSTOM_CARD);

  return (
    <CreatePdfButton
      data={CCC.unit}
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

export default CreateCustomCardPdf;
