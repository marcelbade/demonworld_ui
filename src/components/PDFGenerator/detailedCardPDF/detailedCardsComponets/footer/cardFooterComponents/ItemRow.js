// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const ItemRow = (props) => {
  const generateItemNameList = () => {
    let result = "";

    props.items.forEach((e) => {
      result = result + e.itemName + ", ";
    });

    result = result.slice(0, -2);
    return result;
  };

  const ITEMS = props.items.length === 0 ? CARD_PREVIEW.NO_ITEMS : generateItemNameList();

  return (
    <View
      key={props.index} //
      style={detailedStyles.footerRow}
    >
      <Text>{ITEMS}</Text>
    </View>
  );
};
export default ItemRow;
