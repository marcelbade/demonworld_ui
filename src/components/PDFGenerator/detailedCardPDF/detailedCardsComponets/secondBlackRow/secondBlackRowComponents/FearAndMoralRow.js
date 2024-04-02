// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard } from "../../../../../../util/utilityFunctions";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const FearAndMoralRow = (props) => {
  return isSingleElementCard(props.unit) ? (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <Text key={props.index}>Furchtfaktor: {props.unit.fear}</Text>
    </View>
  ) : (
    <View key={props.index} style={detailedStyles.cardBlackRowFearMoral}>
      <Text key={props.index}>Furchtfaktor: {props.unit.fear}</Text>
      <Text key={props.index}>
        Moral: {props.unit.moral1 ? props.unit.moral1 : "-"} / {props.unit.moral2 ? props.unit.moral2 : "-"}
      </Text>
    </View>
  );
};
export default FearAndMoralRow;
