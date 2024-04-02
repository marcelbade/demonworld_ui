// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import NameRow from "./cardHeaderComponents/NameRow";
import BackSideTitleRow from "./cardHeaderComponents/BackSideTitleRow";

const CardHeader = (props) => {
  return (
    <View style={detailedStyles.cardHeaderBox}>
      <NameRow unit={props.unit} index ={props.index}  />
      <Text style={detailedStyles.separator}></Text>
      <BackSideTitleRow unit={props.unit} index ={props.index} />
    </View>
  );
};
export default CardHeader;
