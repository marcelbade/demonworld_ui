// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
import { renderCommandPoints, renderMagicPoints } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const NameRow = (props) => {
  return (
    <View key={props.index} style={styles.headerRow}>
      <View key={props.index} style={styles.paddingTopHeader}></View>
      <View key={props.index} style={styles.commandAndMagicRow}>
        <View key={props.index} style={styles.commandMagicContent}>
          <Text key={props.index}>{renderCommandPoints(props.unit.commandStars)}</Text>
        </View>
        <View key={props.index} style={styles.headerPaddingRow}>
          <Text key={props.index}> </Text>
        </View>
        <View key={props.index} style={styles.commandMagicContent}>
          <Text key={props.index}> {renderMagicPoints(props.unit.magic)} </Text>
        </View>
      </View>
      <Text key={props.index}>{props.unit.unitName}</Text>
      <Text key={props.index}> </Text>
    </View>
  );
};
export default NameRow;
