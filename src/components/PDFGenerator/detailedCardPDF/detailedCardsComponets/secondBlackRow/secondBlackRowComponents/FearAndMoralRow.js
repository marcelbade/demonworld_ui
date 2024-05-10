// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard } from "../../../../../../util/utilityFunctions";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const FearAndMoralRow = (props) => {
  return isSingleElementCard(props.unit) ? (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <Text key={props.index}>
        {CARD_PREVIEW.FEAR} {props.unit.fear}
      </Text>
    </View>
  ) : (
    <View key={props.index} style={detailedStyles.cardBlackRowFearMoral}>
      <Text key={props.index}>
        {CARD_PREVIEW.FEAR} {props.unit.fear}
      </Text>
      <Text key={props.index}>
        {CARD_PREVIEW.MORAL} {props.unit.moral1 ? props.unit.moral1 : "-"} / {props.unit.moral2 ? props.unit.moral2 : "-"}
      </Text>
    </View>
  );
};
export default FearAndMoralRow;
