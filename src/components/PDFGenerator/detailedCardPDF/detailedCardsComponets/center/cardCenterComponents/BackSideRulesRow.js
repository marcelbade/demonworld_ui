// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideRulesRow = (props) => {
  return (
    <View key={props.index} style={detailedStyles.cardRules}>
      <Text key={props.index}>{props.unit.specialRules}</Text>
    </View>
  );
};
export default BackSideRulesRow;
