// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const RangeWeaponRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.cardCenterContent}>
      <Text key={uuidGenerator()}>
        {props.rangedWeapon} {props.rangedAttackStats}
      </Text>
    </View>
  );
};
export default RangeWeaponRow;
