// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
// components and functions
import StandardListPDF from "./standardListPDF/StandardListPDF";
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
      options: transportObj.options,
      armyName: transportObj.armyName,
      list: transportObj.list,
      totalArmyPoints: transportObj.totalArmyPoints,
      scoutingFactor: transportObj.scoutingFactor,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return data.list.length > 0 ? (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      {data.options.printDefaultList ? <StandardListPDF data={data} /> : <DetailedCardPDF armyName={data.armyName} list={data.list} />}
    </PDFViewer>
  ) : null;
};

export default PdfBox;
