// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import FearAndMoralRow from "./secondBlackRowComponents/FearAndMoralRow";
import BackSidePointCostRow from "./secondBlackRowComponents/BackSidePointCostRow";

const SecondBlackRow = (props) => {
  return (
    <View style={detailedStyles.blackRowBox}>
      <FearAndMoralRow
        unit={props.unit} //
        index={props.index}
      />
      <Text style={detailedStyles.separator}></Text>
      <BackSidePointCostRow
        unit={props.unit} //
        index={props.index}
      />
    </View>
  );
};
export default SecondBlackRow;
