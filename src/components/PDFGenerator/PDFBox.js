// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import ListPDF from "./defaultListPDF/ListPDF";
import DetailedCardPDF from "./detailedCardPDF/DetailedCardPDF";

// Create styles
const useStyles = makeStyles((theme) => ({
  pdfTab: {
    position: "fixed",
    width: "100%",
    height: " 100%",
  },
}));

// Create the PDF Document. The browser's pdf view will open in a new tab.
const PdfBox = () => {
  const classes = useStyles();

  const [pdfData, setPdfData] = useState([]);
  const [armyName, setArmyName] = useState([]);

  useEffect(() => {
    const transportObj = JSON.parse(localStorage.getItem("transportObj"));
    setPdfData(transportObj.pdfData);
    setArmyName(transportObj.armyName);
  }, []);

  return pdfData.length > 0 ? (
    <PDFViewer className={classes.pdfTab}>
      {/* TODO: add the logic to pick one! */}
      {false ? ( //
        <ListPDF armyName={armyName} pdfData={pdfData} />
      ) : (
        <DetailedCardPDF armyName={armyName} pdfData={pdfData} />
      )}
    </PDFViewer>
  ) : null;
};

export default PdfBox;
