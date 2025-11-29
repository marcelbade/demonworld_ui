// react
import { useEffect, useState } from "react";
// react-pdf
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
// components
import SpellListPdf from "./SpellListPdf";
import { commonStyles } from "../commonPdfStyles/commonStyles";
// components and functions

// styles

// Shows the PDF inside the broswer, in a new tab.
// Uses the browser's build in PDF viewer to render the document.
const SpellCardPdfBox = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const transportObj = JSON.parse(localStorage.getItem("transportObj"));

    setData(transportObj.list);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return data.length > 0 ? (
    <PDFViewer style={commonStyles.viewport}>
      <Document>
        <Page wrap={true} style={null}>
          {/* <TitleAndStats data={data} /> */}
          <SpellListPdf data={data} />
        </Page>
      </Document>
    </PDFViewer>
  ) : null;
};

export default SpellCardPdfBox;
