// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../../pdfStyles/commonStyles";
import { listStyles } from "../../pdfStyles/listPdfStyles";

const Equipment = (props) => {
  return (
    <Document>
      {props.equipment.length > 0
        ? props.equipment.map((e) => (
            <View style={commonStyles.tableRow}>
              <View style={listStyles.tableColEquipment}>
                <Text style={listStyles.tableCellEquipment}>{e.name}</Text>
              </View>
              <View style={listStyles.tableColUnit}>
                <Text style={listStyles.tableCellEquipment}>{e.points}</Text>
              </View>
              <View style={listStyles.tableColEquipmentFiller}></View>
            </View>
          ))
        : null}
    </Document>
  );
};
export default Equipment;
