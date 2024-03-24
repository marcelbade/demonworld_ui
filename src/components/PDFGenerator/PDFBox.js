// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
// components and functions
import ListPDF from "./defaultListPDF/ListPDF";
import DetailedCardPDF from "./detailedCardPDF/DetailedCardPDF";

// Create the PDF Document. The browser's pdf view will open in a new tab.
const PdfBox = () => {
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return data.list.length > 0 ? (
    <PDFViewer
      sx={{
        position: "fixed",
        width: "100%",
        height: " 100%",
      }}
    >
      {data.options.printDefaultList ? (
        <ListPDF armyName={data.armyName} pdfData={data.list} />
      ) : (
        <DetailedCardPDF armyName={data.armyName} pdfData={data.list} />
      )}
    </PDFViewer>
  ) : null;
};

export default PdfBox;
