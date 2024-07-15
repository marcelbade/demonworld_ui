// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";
//  components and functions
import { numberOfElements } from "../../../../../../util/utilityFunctions";

const BackSideElementsRow = (props) => {
  const hasNoSpecialElements =
    !props.unit.leader && //
    !props.unit.standardBearer &&
    !props.unit.musician;

  const LEADER = props.unit.leader ? `${CARD_TEXT.LEADER} ` : null;
  const STANDARD_BEARER = props.unit.standardBearer ? `/ ${CARD_TEXT.STANDARD_BEARER}` : null;
  const MUSICIAN = props.unit.musician ? `/ ${CARD_TEXT.MUSICIAN}` : null;

  return (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <View
        style={
          hasNoSpecialElements //
            ? detailedStyles.firstBlackRowBackOneElement
            : detailedStyles.firstBlackRowBackTwoElements
        }
      >
        <Text>
          {LEADER}
          {STANDARD_BEARER}
          {MUSICIAN}
        </Text>
        <Text> {numberOfElements(props.unit)} </Text>
      </View>
    </View>
  );
};
export default BackSideElementsRow;
