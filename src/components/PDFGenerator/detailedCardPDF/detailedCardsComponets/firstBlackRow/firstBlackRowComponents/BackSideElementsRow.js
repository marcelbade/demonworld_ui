// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const BackSideElementsRow = (props) => {
  /**
   * Function creates the string that contains the numbe of "normal" elements.
   * Since special elements are mentioned separately,
   * they have to be substracted from the total count.
   * @param {unitCard} unit
   * @returns A String with the correct number of elements and the correct phrasing.
   */
  const numberOfElements = (unit) => {
    let specialElements = 0;

    if (unit.leader) {
      ++specialElements;
    }
    if (unit.standardBearer) {
      ++specialElements;
    }
    if (unit.musician) {
      ++specialElements;
    }

    let number = `${unit.numberOfElements - specialElements}`;
    let ending =
      unit.numberOfElements === 1 //
        ? ` ${CARD_PREVIEW.SINGLE_ELEMENT}`
        : ` ${CARD_PREVIEW.ELEMENTS}`;

    return number + ending;
  };

  const hasNoSpecialElements =
    !props.unit.leader && //
    !props.unit.standardBearer &&
    !props.unit.musician;

  const LEADER = props.unit.leader ? `${CARD_PREVIEW.LEADER} ` : null;
  const STANDARD_BEARER = props.unit.standardBearer ? `/ ${CARD_PREVIEW.STANDARD_BEARER}` : null;
  const MUSICIAN = props.unit.musician ? `/ ${CARD_PREVIEW.MUSICIAN}` : null;

  return (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <View style={hasNoSpecialElements ? detailedStyles.firstBlackRowBackOneElement : detailedStyles.firstBlackRowBackTwoElements}>
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
