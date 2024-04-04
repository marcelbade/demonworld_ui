// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
import { listStyles } from "../../pdfStyles/listPdfStyles";
// styles
 
const SubfactionName = (props) => {
  return (
    <Document>
      <View style={listStyles.tableRowSubFactionName}>
        <View style={listStyles.tableColSubFactionName}>
          <Text style={listStyles.tableCellSubFactioName}>{props.name}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionName;
