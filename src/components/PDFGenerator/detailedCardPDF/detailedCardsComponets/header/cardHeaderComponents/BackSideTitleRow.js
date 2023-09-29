// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideTitleRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.headerRow}>
      <View key={uuidGenerator()} style={styles.paddingTopHeader}></View>
      <View key={uuidGenerator()} style={styles.commandAndMagicRow}>
        <View key={uuidGenerator()} style={styles.headerPaddingRow}>
          <Text key={uuidGenerator()}>
            {props.unit.subFaction !== props.unit.secondSubFaction //
              ? props.unit.secondSubFaction
              : props.unit.subFaction}
          </Text>
        </View>
      </View>
      <Text key={uuidGenerator()}>{props.unit.faction}</Text>
      <Text key={uuidGenerator()}> </Text>
    </View>
  );
};
export default BackSideTitleRow;
