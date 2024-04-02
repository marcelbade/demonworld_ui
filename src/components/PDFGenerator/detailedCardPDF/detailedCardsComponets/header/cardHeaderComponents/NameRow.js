// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
import { renderCommandPoints, renderMagicPoints } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";

const NameRow = (props) => {
  return (
    <View key={props.index} style={detailedStyles.headerRow}>
      <View key={props.index} style={detailedStyles.paddingTopHeader}></View>
      <View key={props.index} style={detailedStyles.commandAndMagicRow}>
        <View key={props.index} style={detailedStyles.commandMagicContent}>
          <Text key={props.index}>{renderCommandPoints(props.unit.commandStars)}</Text>
        </View>
        <View key={props.index} style={detailedStyles.headerPaddingRow}>
          <Text key={props.index}> </Text>
        </View>
        <View key={props.index} style={detailedStyles.commandMagicContent}>
          <Text key={props.index}> {renderMagicPoints(props.unit.magic)} </Text>
        </View>
      </View>
      <Text key={props.index}>{props.unit.unitName}</Text>
      <Text key={props.index}> </Text>
    </View>
  );
};
export default NameRow;
