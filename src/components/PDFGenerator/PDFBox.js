// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import ListPDF from "./ListPDF";

// Create styles
const useStyles = makeStyles((theme) => ({
  pdfTab: {
    position: "fixed",
    width: "100%",
    height: " 100%",
  },
}));

// Create the PDF Document. The browser's pdf view opens in a new tab.
const PdfBox = () => {
  const classes = useStyles();

  const [pdfData, setPdfData] = useState([]);

  useEffect(() => {
    const transportObj = JSON.parse(localStorage.getItem("transportObj"));
    setPdfData(transportObj.pdfData);
  }, []);

  return pdfData.length > 0 ? (
    <PDFViewer className={classes.pdfTab}>
      <ListPDF pdfMasterList={pdfData} />
    </PDFViewer>
  ) : null;
};

export default PdfBox;
