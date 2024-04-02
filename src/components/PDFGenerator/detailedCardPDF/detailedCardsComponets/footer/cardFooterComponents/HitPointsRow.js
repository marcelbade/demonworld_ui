// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// functions
import { generateHitPoints } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const HitPointsRow = (props) => {
  return (
    <View key={props.index} style={detailedStyles.footerRow}>
      <Text key={props.index}>{generateHitPoints(props.hitPoints)}</Text>
    </View>
  );
};
export default HitPointsRow;
