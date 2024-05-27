// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const MeleeWeaponRow = (props) => {
  const MELEE_WEAPON = `${props.weaponName}: ${props.weapon}`;

  return (
    <View
      key={props.index} //
      style={detailedStyles.cardRow}
    >
      <Text key={props.index}>{MELEE_WEAPON}</Text>
    </View>
  );
};
export default MeleeWeaponRow;
