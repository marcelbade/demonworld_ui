// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const RangeWeaponRow = (props) => {
  return (
    <View key={props.index} style={styles.cardCenterContent}>
      <Text key={props.index}>
        {props.rangedWeapon} {props.rangedAttackStats}
      </Text>
    </View>
  );
};
export default RangeWeaponRow;
