// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const NameRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.titleRow}>
        <Text key={uuidGenerator()}> </Text>
        <Text key={uuidGenerator()}>{props.unitName}</Text>
        <Text key={uuidGenerator()}> </Text>
      </View>
    </Document>
  );
};
export default NameRow;
