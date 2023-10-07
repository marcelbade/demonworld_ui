// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSidePointCostRow = (props) => {
  return (
    <View key={props.index} style={styles.cardBlackRow}>
      <Text key={props.index}>{props.unit.points}</Text>
    </View>
  );
};
export default BackSidePointCostRow;
