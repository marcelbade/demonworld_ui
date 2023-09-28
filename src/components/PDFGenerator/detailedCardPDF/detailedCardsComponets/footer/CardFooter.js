// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import HitPointsRow from "./cardFooterComponents/HitPointsRow";
import ItemRow from "./cardFooterComponents/ItemRow";



const CardFooter = (props) => {
  return (
    <View style={styles.cardFooterBox}>
      <HitPointsRow hitPoints={props.unit.hitpoints} />
      <Text style={styles.separator}></Text>
      <ItemRow items={props.unit.equipment} />
    </View>
  );
};
export default CardFooter;
