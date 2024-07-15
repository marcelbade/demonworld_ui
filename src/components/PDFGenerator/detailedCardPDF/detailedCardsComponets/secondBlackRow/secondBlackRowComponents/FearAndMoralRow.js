// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard } from "../../../../../../util/utilityFunctions";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const FearAndMoralRow = (props) => {
  const FEAR = `${CARD_TEXT.FEAR} ${props.unit.fear}`;
  const MORAL = `${CARD_TEXT.MORAL} ${props.unit.moral1 ? props.unit.moral1 : "-"} / ${props.unit.moral2 ? props.unit.moral2 : "-"}`;

  return (
    <View
      key={props.index} //
      style={isSingleElementCard(props.unit) ? detailedStyles.cardBlackRow : detailedStyles.cardBlackRowFearMoral}
    >
      <Text key={props.index}>{FEAR}</Text>
      <Text key={props.index}>{MORAL}</Text>
    </View>
  );
};
export default FearAndMoralRow;
