// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
//Material UI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
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

  const [pdfMasterList, setPdfMasterList] = useState([]);

  let units = props.units;
  let distinctSubFactions = props.distinctSubFactions;

  useEffect(() => {
    let tempArray = [];

    distinctSubFactions.forEach((sF) => {
      tempArray.push({ subFaction: sF, units: filterForSubFaction(sF) });
      setPdfMasterList([...tempArray]);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filterForSubFaction = (subFaction) => {
    return units.filter((u) => u.subFaction === subFaction);
  };

  return pdfMasterList.length > 0 ? (
    <PDFViewer className={classes.pdfModal}>
      <ListPDF pdfMasterList={pdfMasterList} units={props.units} distinctSubFactions={props.distinctSubFactions} />
    </PDFViewer>
  ) : null;
};

export default PdfBox;
