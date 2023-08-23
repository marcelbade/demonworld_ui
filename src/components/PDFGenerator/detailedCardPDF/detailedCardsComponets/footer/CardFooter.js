// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import HitPointsRow from "./HitPointsRow";
 
const CardFooter = (props) => {
  return (
    <View style={styles.cardPart}>
      <HitPointsRow hitPoints={props.unit.hitpoints} />
      <Text style={styles.separator}></Text>
      <HitPointsRow hitPoints={props.unit.hitpoints} />
    </View>
  );
};
export default CardFooter;
