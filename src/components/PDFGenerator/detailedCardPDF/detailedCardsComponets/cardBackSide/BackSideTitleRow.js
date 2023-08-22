// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../shared/sharedFunctions";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";

const BackSideTitleRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.titleRow}>
        <Text key={uuidGenerator()}>{props.unit.faction}</Text>
        <Text key={uuidGenerator()}>{props.unit.unitName}</Text>
        <Text key={uuidGenerator()}>
          {props.unit.subFaction === props.unit.secondSubFaction //
            ? props.unit.subFaction
            : props.unit.secondSubFaction}
        </Text>
      </View>
    </Document>
  );
};
export default BackSideTitleRow;
