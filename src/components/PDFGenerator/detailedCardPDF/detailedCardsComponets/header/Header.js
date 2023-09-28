// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import NameRow from "./cardHeaderComponents/NameRow";
import BackSideTitleRow from "./cardHeaderComponents/BackSideTitleRow";

const CardHeader = (props) => {
  return (
    <View style={styles.cardHeaderBox}>
      <NameRow unit={props.unit} />
      <Text style={styles.separator}></Text>
      <BackSideTitleRow unit={props.unit} />
    </View>
  );
};
export default CardHeader;
