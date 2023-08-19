// react
import React from "react";
// react-pdf
import { Document } from "@react-pdf/renderer";
// styles
import styles from "../pdfStyles/detailedCardPdfStyles";
// pdf components

import BackSideTitleRow from "./detailedCardsComponets/cardBackSide/BackSideTitleRow";
import BackSideElementsRow from "./detailedCardsComponets/cardBackSide/BackSideElementsRow";
import BackSideRulesRow from "./detailedCardsComponets/cardBackSide/BackSideRulesRow";
import BackSidePointCostRow from "./detailedCardsComponets/cardBackSide/BackSidePointCostRow";

// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const DetailedCardBack = (props) => {
  return (
    <Document style={styles.entireCard}>
      <BackSideTitleRow unit={props.u} />
      <BackSideElementsRow unit={props.u} />
      <BackSideRulesRow unit={props.u} />
      <BackSidePointCostRow unit={props.u} />
    </Document>
  );
};
export default DetailedCardBack;
