// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
import { displayUnitElements } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const BackSideElementsRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.cardBlackRow}>
        <Text key={uuidGenerator()}>{displayUnitElements(props.unit)}</Text>
      </View>
    </Document>
  );
};
export default BackSideElementsRow;
