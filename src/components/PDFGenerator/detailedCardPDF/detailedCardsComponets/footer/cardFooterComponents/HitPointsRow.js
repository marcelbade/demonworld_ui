// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
import { generateHitPoints } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const HitPointsRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.footerRow}>
      <Text key={uuidGenerator()}>{generateHitPoints(props.hitPoints)}</Text>
    </View>
  );
};
export default HitPointsRow;
