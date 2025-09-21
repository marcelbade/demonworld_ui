// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideTitleRow = (props) => {
  const SUB_FACTION =
    props.unit.subFaction !== props.unit.secondSubFaction //
      ? props.unit.secondSubFaction
      : props.unit.subFaction;

  const FACTION = props.unit.faction;

  return (
    <View key={props.index} style={detailedStyles.headerRow}>
      <View key={props.index} style={detailedStyles.paddingTopHeader}></View>
      <View key={props.index} style={detailedStyles.commandAndMagicRow}>
        <View key={props.index} style={detailedStyles.headerPaddingRow}>
          <Text key={props.index}>{SUB_FACTION}</Text>
        </View>
      </View>
      <Text key={props.index}>{FACTION}</Text>
      <Text key={props.index}> </Text>
    </View>
  );
};
export default BackSideTitleRow;
