// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
import { displayUnitElements } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const BackSideElementsRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.cardBlackRow}>
      <Text key={uuidGenerator()}>{displayUnitElements(props.unit)}</Text>
    </View>
  );
};
export default BackSideElementsRow;
