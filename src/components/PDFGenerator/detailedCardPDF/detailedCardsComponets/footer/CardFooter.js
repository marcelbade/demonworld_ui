// react
import React from "react";
// react-pdf
import { View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import HitPointsRow from "./cardFooterComponents/HitPointsRow";
import ItemRow from "./cardFooterComponents/ItemRow";

const CardFooter = (props) => {
  return (
    <View style={detailedStyles.cardFooterBox}>
      <HitPointsRow
        hitPoints={props.unit.hitpoints} //
        index={props.index}
      />
      <ItemRow
        items={props.unit.equipment} //
        index={props.index}
      />
    </View>
  );
};
export default CardFooter;
