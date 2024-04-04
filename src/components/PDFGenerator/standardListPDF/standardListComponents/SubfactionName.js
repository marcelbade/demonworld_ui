// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../../assets/fonts/jaapokkiRegular.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
import { listStyles } from "../../pdfStyles/listPdfStyles";
// styles

// Register font
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const SubfactionName = (props) => {
  return (
    <Document>
      <View style={listStyles.tableRowSubFactionName}>
        <View style={listStyles.tableColSubFactionName}>
          <Text style={listStyles.tableCellSubFactioStats}>{props.data.subFaction}</Text>
          <Text style={listStyles.tableCellSubFactioStats}>{props.data.subFactionTotal}</Text>
          <Text style={listStyles.tableCellSubFactioStats}>{props.data.subFactionPercentage}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionName;
