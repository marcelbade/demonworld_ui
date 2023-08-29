// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
import { NO_RANGE_WEAPON } from "../../../../../../constants/textsAndMessages";

const RangeWeaponRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.cardRow}>
      {props.rangedWeapon !== NO_RANGE_WEAPON ? (
        <Text key={uuidGenerator()}>
          {props.rangedWeapon} {props.rangedAttackStats}
        </Text>
      ) : null}
    </View>
  );
};
export default RangeWeaponRow;
