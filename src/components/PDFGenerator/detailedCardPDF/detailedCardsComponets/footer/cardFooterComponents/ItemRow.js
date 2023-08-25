// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const ItemRow = (props) => {
  const generateItemNameList = () => {
    let result = "";

    props.items.forEach((e) => {
      result = result + e.itemName + ", ";
    });

    result = result.slice(0, -2);

    return result;
  };

  return (
    <View key={uuidGenerator()} style={styles.footerRow}>
      <Text>{generateItemNameList()}</Text>
    </View>
  );
};
export default ItemRow;
