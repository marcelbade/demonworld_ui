// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideRulesRow = (props) => {
  return (
    <View key={props.index} style={styles.cardRules}>
      <Text key={props.index}>{props.unit.specialRules}</Text>
    </View>
  );
};
export default BackSideRulesRow;
