// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const MeleeWeaponRow = (props) => {
  return (
    <View key={props.index} style={styles.cardRow}>
      <Text key={props.index}>
        {props.weaponName}: {props.weapon}
      </Text>
    </View>
  );
};
export default MeleeWeaponRow;
