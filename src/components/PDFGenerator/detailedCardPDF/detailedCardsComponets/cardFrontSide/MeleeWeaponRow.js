// react
import React from "react";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../../../fonts/Beryliumbold.ttf";
// functions and components
import { uuidGenerator } from "../../../../shared/sharedFunctions";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });

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
