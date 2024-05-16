// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
import { renderDynamicIcons } from "../../../../../../util/utilityFunctions";

const NameRow = (props) => {
  const UNIT_NAME = props.unit.isMultiStateUnit ? props.unit.multiCardName : props.unit.unitName;

  return (
    <View key={props.index} style={detailedStyles.headerRow}>
      <View key={props.index} style={detailedStyles.paddingTopHeader}></View>
      <View key={props.index} style={detailedStyles.commandAndMagicRow}>
        <View key={props.index} style={detailedStyles.commandMagicContent}>
          <Text key={props.index}>
            {renderDynamicIcons({
              iconString: "*",
              iconNumber: props.unit.commandStars,
              showIfNone: false,
            })}
          </Text>
        </View>
        <View key={props.index} style={detailedStyles.headerPaddingRow}>
          <Text key={props.index}> </Text>
        </View>
        <View key={props.index} style={detailedStyles.commandMagicContent}>
          <Text key={props.index}>
            {renderDynamicIcons({
              iconString: "/",
              iconNumber: props.unit.magic,
              showIfNone: false,
            })}
          </Text>
        </View>
      </View>
      <Text key={props.index}> {UNIT_NAME} </Text>
      <Text key={props.index}> </Text>
    </View>
  );
};
export default NameRow;
