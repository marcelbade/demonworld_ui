// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
import makeStyles from "@mui/styles/makeStyles";
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

  const [data, setData] = useState({
    list: [],
    armyName: [],
    options: {},
  });

  useEffect(() => {
    const transportObj = JSON.parse(localStorage.getItem("transportObj"));
    setData({
      ...data, //
      list: transportObj.pdfData,
      armyName: transportObj.armyName,
      options: transportObj.options,
    });
  }, []);

  return data.list.length > 0 ? (
    <PDFViewer className={classes.pdfTab}>
      {data.options.printDefaultList ? (
        <ListPDF armyName={data.armyName} pdfData={data.list} />
      ) : (
        <DetailedCardPDF armyName={data.armyName} pdfData={data.list} />
      )}
    </PDFViewer>
  ) : null;
};

export default PdfBox;
