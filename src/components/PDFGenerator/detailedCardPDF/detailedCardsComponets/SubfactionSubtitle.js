// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../pdfStyles/detailedCardPdfStyles";

const SubfactionSubtitle = (props) => {
  return (
    <Document>
      <View key={props.subFaction}>
        <Text style={detailedStyles.subFactionName}>{props.data.subFaction}</Text>
        <Text style={detailedStyles.subFactionName}>{props.data.subFactionTotal}</Text>
        <Text style={detailedStyles.subFactionName}>{props.data.subFactionPercentage}</Text>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
