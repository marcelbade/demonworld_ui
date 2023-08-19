// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../shared/sharedFunctions";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";

const BackSideRulesRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.cardRow}>
        <Text key={uuidGenerator()}>{props.unit.specialRules}</Text>
      </View>
    </Document>
  );
};
export default BackSideRulesRow;
