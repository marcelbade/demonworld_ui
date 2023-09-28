// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideElementsRow = (props) => {
  //
  const numberOfElements = (unit) => {
    let specialElements = 0;

    if (unit.leader) {
      ++specialElements;
    }
    if (unit.standardBearer) {
      ++specialElements;
    }
    if (unit.musician) {
      ++specialElements;
    }

    let number = `${unit.numberOfElements - specialElements}`;
    let ending = unit.numberOfElements === 1 ? " Element" : " Elemente";

    return number + ending;
  };

  return (
    <View key={uuidGenerator()} style={styles.cardBlackRow}>
      {!props.unit.leader && !props.unit.standardBearer && !props.unit.musician ? (
        <View style={styles.firstBlackRowBackOneElement}>
          <Text> {numberOfElements(props.unit)} </Text>
        </View>
      ) : (
        <View style={styles.firstBlackRowBackTwoElements}>
          <Text>
            {props.unit.leader ? "Anführer " : null}
            {props.unit.standardBearer ? "/ Standarte" : null}
            {props.unit.musician ? "/ Musiker" : null}{" "}
          </Text>
          <Text> {numberOfElements(props.unit)} </Text>
        </View>
      )}
    </View>
  );
};
export default BackSideElementsRow;
