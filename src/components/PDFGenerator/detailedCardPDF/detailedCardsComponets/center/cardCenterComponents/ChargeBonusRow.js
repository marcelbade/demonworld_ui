import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";

const ChargeBonusRow = (props) => {
  const CHARGE_BONUS = `${CARD_TEXT.CHARGE_BONUS} ${props.unit.chargeBonus}`;

  return props.unit.chargeBonus > 0 ? (
    <View
      key={props.index} //
      style={detailedStyles.sizeArmorSkillBox}
    >
      <Text key={props.index}>{CHARGE_BONUS}</Text>
    </View>
  ) : null;
};
export default ChargeBonusRow;
