import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const InitiativeRow = (props) => {
  const INITIATIVE = `${CARD_TEXT.INITIATIVE} ${props.unit.initiative}`;

  return (
    <View
      key={props.index} //
      style={detailedStyles.sizeArmorSkillBox}
    >
      <Text key={props.index}>{INITIATIVE}</Text>
    </View>
  );
};
export default InitiativeRow;
