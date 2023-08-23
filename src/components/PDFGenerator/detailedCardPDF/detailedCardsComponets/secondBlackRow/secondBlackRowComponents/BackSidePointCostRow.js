// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSidePointCostRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.cardBlackRow}>
        <Text key={uuidGenerator()}>{props.unit.points}</Text>
      </View>
    </Document>
  );
};
export default BackSidePointCostRow;
