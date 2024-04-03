// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import UnitMovementRow from "./firstBlackRowComponents/UnitMovementRow";
import BackSideElementsRow from "./firstBlackRowComponents/BackSideElementsRow";

const FirstBlackRow = (props) => {
  return (
    <View style={detailedStyles.blackRowBox}>
      <UnitMovementRow unit={props.unit} index={props.index} />
      <BackSideElementsRow unit={props.unit} index={props.index} />
    </View>
  );
};
export default FirstBlackRow;
