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
      <View key={uuidGenerator()} style={styles.cardRow}>
        <Text key={uuidGenerator()} style={styles.cardunitName}>
        {props.unit.faction}
        {props.unit.unitName}
        {props.unit.subFaction}
        </Text>
      </View>
    </Document>
  );
};
export default BackSideTitleRow;
