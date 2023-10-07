// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideTitleRow = (props) => {
  return (
    <View key={props.index} style={styles.headerRow}>
      <View key={props.index} style={styles.paddingTopHeader}></View>
      <View key={props.index} style={styles.commandAndMagicRow}>
        <View key={props.index} style={styles.headerPaddingRow}>
          <Text key={props.index}>
            {props.unit.subFaction !== props.unit.secondSubFaction //
              ? props.unit.secondSubFaction
              : props.unit.subFaction}
          </Text>
        </View>
      </View>
      <Text key={props.index}>{props.unit.faction}</Text>
      <Text key={props.index}> </Text>
    </View>
  );
};
export default BackSideTitleRow;
