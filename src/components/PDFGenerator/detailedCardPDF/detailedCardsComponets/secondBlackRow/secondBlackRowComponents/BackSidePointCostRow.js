// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSidePointCostRow = (props) => {
  const POINTS = props.unit.points;

  return (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <Text key={props.index}>{POINTS}</Text>
    </View>
  );
};
export default BackSidePointCostRow;
