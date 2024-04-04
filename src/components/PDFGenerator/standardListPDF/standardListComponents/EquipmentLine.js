// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../../pdfStyles/commonStyles";
import { listStyles } from "../../pdfStyles/listPdfStyles";

const EquipmentLine = (props) => {
  return (
    <Document>
      <View style={commonStyles.tableRow}>
        {props.equipment.length > 0 ? ( //
          <Text style={listStyles.equipmentLineStyle}></Text>
        ) : null}
      </View>
    </Document>
  );
};
export default EquipmentLine;
