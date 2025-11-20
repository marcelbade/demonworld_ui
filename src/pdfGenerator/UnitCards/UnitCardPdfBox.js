// Reac
import { useEffect, useState } from "react";
// react-pdf
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
// components and functions
import TitleAndStats from "./sharedPdfComponents/TitleAndStats";
import StandardListPDF from "./standardListPdf/StandardListPDF";
import DetailedCardPDF from "./detailedCardPdf/DetailedCardPDF";
// styles
import { commonUnitStyles } from "./pdfStyles/commonUnitStyles";
import { commonStyles } from "../commonPdfStyles/commonStyles";


// Shows the PDF inside the broswer, in a new tab. 
// Uses the browser's build in PDF viewer to render the document.
const UnitCardPdfBox = () => {
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
      playerName: transportObj.playerName,
      teamName: transportObj.teamName,
      armyName: transportObj.armyName,
      list: transportObj.list,
      totalArmyPoints: transportObj.totalArmyPoints,
      scoutingFactor: transportObj.scoutingFactor,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return data.list.length > 0 ? (
    <PDFViewer style={commonStyles.viewport}>
      <Document>
        <Page wrap={true} style={commonUnitStyles.pageLayout}>
          <TitleAndStats data={data} />
          {data.options.printDefaultList ? ( //
            <StandardListPDF data={data} />
          ) : (
            <DetailedCardPDF data={data} />
          )}
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};

export default UnitCardPdfBox;
