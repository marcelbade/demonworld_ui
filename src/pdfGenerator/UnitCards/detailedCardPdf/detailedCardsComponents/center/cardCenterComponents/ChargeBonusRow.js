import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// components & functions
import { chargeBonusSetter } from "../../../../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const ChargeBonusRow = (props) => {
  return props.unit.chargeBonus > 0 ? (
    <View
      key={props.index} //
      style={detailedStyles.sizeArmorSkillBox}
    >
      <Text key={props.index}>{chargeBonusSetter(props.unit)}</Text>
    </View>
  ) : null;
};
export default ChargeBonusRow;
