// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
import { renderCommandPoints, renderMagicPoints } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const NameRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.headerRow}>
      <View style={styles.commandAndMagicRow}>
        <Text key={uuidGenerator()}>{renderCommandPoints(props.unit.commandStars)}</Text>
        <Text key={uuidGenerator()}> {renderMagicPoints(props.unit.magic)} </Text>
      </View>
      <Text key={uuidGenerator()}>{props.unit.unitName}</Text>
      <Text key={uuidGenerator()}> </Text>
    </View>
  );
};
export default NameRow;
