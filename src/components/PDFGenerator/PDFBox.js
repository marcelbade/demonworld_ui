// Reac
import React, { useEffect, useState } from "react";
// react-pdf
import { PDFViewer } from "@react-pdf/renderer";
// components and functions
import StandardListPDF from "./standardListPDF/StandardListPDF";
import DetailedCardPDF from "./detailedCardPDF/DetailedCardPDF";
// styles
import { commonStyles } from "./pdfStyles/commonStyles";

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
    <PDFViewer style={commonStyles.viewport}>
      {data.options.printDefaultList ? ( //
        <StandardListPDF data={data} />
      ) : (
        <DetailedCardPDF data={data} />
      )}
    </PDFViewer>
  ) : null;
};

export default PdfBox;
