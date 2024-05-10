import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const InitiativeRow = (props) => {
  return (
    <View key={props.index} style={detailedStyles.sizeArmorSkillBox}>
      <Text key={props.index}>
        {CARD_PREVIEW.INITIATIVE} {props.unit.initiative}
      </Text>
    </View>
  );
};
export default InitiativeRow;
