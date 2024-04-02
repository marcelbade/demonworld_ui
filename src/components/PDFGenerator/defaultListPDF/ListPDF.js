// react
import React from "react";
// react-pdf
import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// styles
import { listStyles } from "../pdfStyles/listPdfStyles";
import { commonStyles } from "../pdfStyles/commonStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

//TODO: refactor this into smaller parts like you did for the detailed list!
// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const ListPDF = (props) => {
  return (
    <Document>
      <Page style={listStyles.body}>
        <View style={listStyles.table}>
          <View style={commonStyles.armyName}>
            <Text> {props.armyName} </Text>
          </View>

          {props.pdfData
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj, i) => (
              <View style={listStyles.table}>
                {/* SUBFACTION NAME */}
                <View key={i} style={listStyles.tableRowSubFactionName}>
                  <View key={i} style={listStyles.tableColSubFactionName}>
                    <Text style={listStyles.tableCellSubFactioName}>{obj.subFaction}</Text>
                  </View>
                </View>
                {obj.units.map((u, i) => (
                  //  UNIT
                  <View key={i} style={listStyles.table}>
                    <View key={i} style={listStyles.tableRow}>
                      <View key={i} style={listStyles.tableColUnit}>
                        <Text key={i} style={listStyles.tableCellUnit}>
                          {u.unitName}
                        </Text>
                      </View>
                      {u.secondSubFaction !== u.subFaction ? (
                        <View key={i} style={listStyles.tableColUnit}>
                          <Text key={i} style={listStyles.tableCellUnit}>
                            {u.secondSubFaction}
                          </Text>
                        </View>
                      ) : null}
                      <View key={i} style={listStyles.tableColUnit}>
                        <Text key={i} style={listStyles.tableCellUnit}>
                          {u.points}
                        </Text>
                      </View>
                      <View key={i} style={listStyles.tableColUnitFiller}></View>
                    </View>
                    {/* EQUIPMENT */}
                    <View key={i} style={listStyles.tableRow}>
                      {u.equipment.length > 0 ? <Text key={i} style={listStyles.equipmentLineStyle}></Text> : null}
                    </View>
                    {u.equipment.length > 0
                      ? u.equipment.map((e) => (
                          <View key={i} style={listStyles.tableRow}>
                            <View key={i} style={listStyles.tableColEquipment}>
                              <Text key={i} style={listStyles.tableCellEquipment}>
                                {e.name}
                              </Text>
                            </View>
                            <View key={i} style={listStyles.tableColUnit}>
                              <Text key={i} style={listStyles.tableCellEquipment}>
                                {e.points}
                              </Text>
                            </View>
                            <View style={listStyles.tableColEquipmentFiller}></View>
                          </View>
                        ))
                      : null}
                  </View>
                ))}
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};
export default ListPDF;
