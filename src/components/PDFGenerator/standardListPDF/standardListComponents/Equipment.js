// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// styles
import { listStyles } from "../../pdfStyles/listPdfStyles";

const Equipment = (props) => {
  return (
    <Document style={listStyles.equipmentBox}>
      {props.equipment.length > 0
        ? props.equipment.map((e) => (
            <View style={listStyles.equipmentInnerBox}>
              <View style={listStyles.tableRowEquipment}>
                <Text style={listStyles.tableCellEquipment}>{e.name}</Text>
              </View>
              <View style={listStyles.tableRowEquipment}>
                <Text style={listStyles.tableCellEquipment}>{e.points}</Text>
              </View>
            </View>
          ))
        : null}
    </Document>
  );
};
export default Equipment;
