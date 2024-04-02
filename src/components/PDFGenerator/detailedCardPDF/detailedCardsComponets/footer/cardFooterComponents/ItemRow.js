// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

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
    <View key={props.index} style={detailedStyles.footerRow}>
      {props.items.length === 0 ? ( //
        <Text>Keine Gegenstände</Text>
      ) : (
        <Text>{generateItemNameList()}</Text>
      )}
    </View>
  );
};
export default ItemRow;
