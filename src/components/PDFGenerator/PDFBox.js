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

  return props.pdfMasterList.length > 0 ? (
    <PDFViewer className={classes.pdfModal}>
      <ListPDF pdfMasterList={props.pdfMasterList} />
    </PDFViewer>
  ) : null;
};

export default PdfBox;
