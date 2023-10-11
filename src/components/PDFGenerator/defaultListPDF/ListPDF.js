// react
import React from "react";
// react-pdf
import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../fonts/Beryliumbold.ttf";
 // styles
import styles from "../pdfStyles/listPdfStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });


//TODO: refactor this into smaller parts like you did for the detailed list!
// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const ListPDF = (props) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
          {/* row */}

          {props.pdfData
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj, i) => (
              <View style={styles.table}>
                {/* SUBFACTION NAME */}
                <View key={i} style={styles.tableRowSubFactionName}>
                  <View key={i} style={styles.tableColSubFactionName}>
                    <Text style={styles.tableCellSubFactioName}>{obj.subFaction}</Text>
                  </View>
                </View>
                {obj.units.map((u, i) => (
                  //  UNIT
                  <View key={i} style={styles.table}>
                    <View key={i} style={styles.tableRow}>
                      <View key={i} style={styles.tableColUnit}>
                        <Text key={i} style={styles.tableCellUnit}>
                          {u.unitName}
                        </Text>
                      </View>
                      { u.secondSubFaction !== u.subFaction?
                        <View key={i} style={styles.tableColUnit}>
                          <Text key={i} style={styles.tableCellUnit}>
                            {u.secondSubFaction}
                          </Text>
                        </View>
                        : null
                      }
                      <View key={i} style={styles.tableColUnit}>
                        <Text key={i} style={styles.tableCellUnit}>
                          {u.points}
                        </Text>
                      </View>
                      <View key={i} style={styles.tableColUnitFiller}></View>
                    </View>
                    {/* EQUIPMENT */}
                    <View key={i} style={styles.tableRow}>
                      {u.equipment.length > 0 ? <Text key={i} style={styles.equipmentLineStyle}></Text> : null}
                    </View>
                    {u.equipment.length > 0
                      ? u.equipment.map((e) => (
                          <View key={i} style={styles.tableRow}>
                            <View key={i} style={styles.tableColEquipment}>
                              <Text key={i} style={styles.tableCellEquipment}>
                                {e.name}
                              </Text>
                            </View>
                            <View key={i} style={styles.tableColUnit}>
                              <Text key={i} style={styles.tableCellEquipment}>
                                {e.points}
                              </Text>
                            </View>
                            <View style={styles.tableColEquipmentFiller}></View>
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
