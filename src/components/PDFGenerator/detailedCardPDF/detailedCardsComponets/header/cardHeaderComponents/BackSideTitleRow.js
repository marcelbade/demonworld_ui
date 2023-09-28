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
      {props.unit.subFaction !== props.unit.secondSubFaction ? ( //
        <View style={styles.headerBacksideSecondSubFaction}>
          <Text> </Text>
          <Text>{props.unit.secondSubFaction}</Text>
        </View>
      ) : (
        <Text key={uuidGenerator()}> </Text>
      )}
      <Text> {props.unit.faction}</Text>
      <Text key={uuidGenerator()}> </Text>
    </View>
  );
};
export default BackSideTitleRow;
