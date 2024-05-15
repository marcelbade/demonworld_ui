// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const RangeWeaponRow = (props) => {
  const RANGE_WEAPON = `${props.rangedWeapon} ${props.rangedAttackStats}`;

  return (
    <View
      key={props.index} //
      style={detailedStyles.cardCenterContent}
    >
      <Text key={props.index}>{RANGE_WEAPON}</Text>
    </View>
  );
};
export default RangeWeaponRow;
