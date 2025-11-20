// react
import { useEffect, useState } from "react";
// react-pdf
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
// components and functions

// styles

// Shows the PDF inside the broswer, in a new tab.
// Uses the browser's build in PDF viewer to render the document.
const SpellCardPdfBox = () => {
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
    <PDFViewer style={null}>
      <Document>
        <Page wrap={true} style={null}>
          {/* <TitleAndStats data={data} /> */}
          {/* TODO */}
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};

export default SpellCardPdfBox;
