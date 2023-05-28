// React
import React from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
// components and functions
import ListPDF from "./ListPDF";

// Create styles

const useStyles = makeStyles((theme) => ({}));

// Create Document Component
const PDFView = () => {
  const classes = useStyles();

  return (
    <PDFViewer>
      <ListPDF />
    </PDFViewer>
  );
};

export default PDFView;
