// Reac
import React from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import ListPDF from "./ListPDF";

// Create styles
const useStyles = makeStyles((theme) => ({
  pdfModal: {
    position: "fixed",
    background: "lightblue",
    width: "90%",
    height: " 100%",
  },
}));

// Create Document Component
const PdfBox = (props) => {
  const classes = useStyles();

  return (
    <PDFViewer className={classes.pdfModal}>
      <ListPDF units={props.units} distinctSubFactions={props.distinctSubFactions} />
    </PDFViewer>
  );
};

export default PdfBox;
