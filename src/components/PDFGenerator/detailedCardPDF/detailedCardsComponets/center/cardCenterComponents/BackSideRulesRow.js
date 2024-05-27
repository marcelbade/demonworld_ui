// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideRulesRow = (props) => {
  const SPECIAL_RULES = props.unit.specialRules;

  return (
    <View
      key={props.index} //
      style={detailedStyles.cardRules}
    >
      <Text key={props.index}>{SPECIAL_RULES}</Text>
    </View>
  );
};
export default BackSideRulesRow;
