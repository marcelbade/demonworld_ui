// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const MeleeWeaponRow = (props) => {
  return (
    <View key={props.index} style={detailedStyles.cardRow}>
      <Text key={props.index}>
        {props.weaponName}: {props.weapon}
      </Text>
    </View>
  );
};
export default MeleeWeaponRow;
