// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../shared/sharedFunctions";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";
import { generateHitPoints } from "../../../../compendiums/factionTable/depencies/factionTableFunctions";

const HitPointsRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.cardRow}>
        <Text key={uuidGenerator()}>{generateHitPoints(props.hitPoints)}</Text>
      </View>
    </Document>
  );
};
export default HitPointsRow;
