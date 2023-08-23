// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const MeleeWeaponRow = (props) => {
  return (
    <Document>
      <View key={uuidGenerator()} style={styles.cardRow}>
        <Text key={uuidGenerator()}>
          {props.weaponName}: {props.weapon}
        </Text>
      </View>
    </Document>
  );
};
export default MeleeWeaponRow;
