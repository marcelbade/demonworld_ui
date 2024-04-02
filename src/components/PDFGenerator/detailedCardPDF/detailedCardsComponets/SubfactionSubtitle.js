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
        <Text style={detailedStyles.subFactionName}>{props.subFaction}</Text>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
