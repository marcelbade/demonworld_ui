import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const ChargeBonusRow = (props) => {
  return props.unit.chargeBonus > 0 ? (
    <View key={props.index} style={detailedStyles.sizeArmorSkillBox}>
      <Text key={props.index}>
        {CARD_PREVIEW.CHARGE_BONUS} {props.unit.chargeBonus}
      </Text>
    </View>
  ) : null;
};
export default ChargeBonusRow;
