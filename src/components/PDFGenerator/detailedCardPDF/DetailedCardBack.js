// react
import React from "react";
// react-pdf
import { Document } from "@react-pdf/renderer";
// styles
import styles from "../pdfStyles/detailedCardPdfStyles";
import BackSideTitleRow from "./detailedCardsComponets/cardBackSide/BackSideTitleRow";
// pdf components
 
// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const DetailedCardBack = (props) => {
  return (
    <Document style={styles.entireCard}>
      <BackSideTitleRow  unit={props.u} />
    </Document>
  );
};
export default DetailedCardBack;
