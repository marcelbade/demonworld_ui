// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../shared/sharedFunctions";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";

const FearAndMoralRow = (props) => {
  return (
    <Document style={styles.rowBorders}>
      <View key={uuidGenerator()} style={styles.cardBlackRow}>
        <Text key={uuidGenerator()}>Furchtfaktor: {props.unit.fear}</Text>
        <Text key={uuidGenerator()}>
          Moral: {props.unit.moral1 ? props.unit.moral1 : "-"} / {props.unit.moral2 ? props.unit.moral2 : "-"}
        </Text>
      </View>
    </Document>
  );
};
export default FearAndMoralRow;
