// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

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
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      {!props.unit.leader && !props.unit.standardBearer && !props.unit.musician ? (
        <View style={detailedStyles.firstBlackRowBackOneElement}>
          <Text> {numberOfElements(props.unit)} </Text>
        </View>
      ) : (
        <View style={detailedStyles.firstBlackRowBackTwoElements}>
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
