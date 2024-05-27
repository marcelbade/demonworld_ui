// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../../pdfStyles/commonStyles";
import { listStyles } from "../../pdfStyles/listPdfStyles";

const Unit = (props) => {
  return (
    <Document>
      <View style={commonStyles.tableRow}>
        <View style={listStyles.tableColUnit}>
          <Text style={listStyles.tableCellUnit}>{props.unit.name}</Text>
        </View>
        {props.unit.secondSubFaction !== props.unit.subFaction ? (
          <View style={listStyles.tableColSecondSubFaction}>
            <Text style={listStyles.tableCellUnit}>{props.unit.secondSubFaction}</Text>
          </View>
        ) : (
          // no null is returned, so the layout stays consistent
          <View style={listStyles.tableColSecondSubFaction}></View>
        )}
        <View style={listStyles.tableColPoints}>
          <Text style={listStyles.tableCellPoints}>{props.unit.points}</Text>
        </View>
      </View>
    </Document>
  );
};
export default Unit;
