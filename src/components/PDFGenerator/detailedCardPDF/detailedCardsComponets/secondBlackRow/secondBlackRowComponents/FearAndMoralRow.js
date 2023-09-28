// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard, uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const FearAndMoralRow = (props) => {
  return isSingleElementCard(props.unit) ? (
    <View key={uuidGenerator()} style={styles.cardBlackRow}>
      <Text key={uuidGenerator()}>Furchtfaktor: {props.unit.fear}</Text>
    </View>
  ) : (
    <View key={uuidGenerator()} style={styles.cardBlackRowFearMoral}>
      <Text key={uuidGenerator()}>Furchtfaktor: {props.unit.fear}</Text>
      <Text key={uuidGenerator()}>
        Moral: {props.unit.moral1 ? props.unit.moral1 : "-"} / {props.unit.moral2 ? props.unit.moral2 : "-"}
      </Text>
    </View>
  );
};
export default FearAndMoralRow;
