// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const NameRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.titleRow}>
      <Text key={uuidGenerator()}> </Text>
      <Text key={uuidGenerator()}>{props.unitName}</Text>
      <Text key={uuidGenerator()}> </Text>
    </View>
  );
};
export default NameRow;
