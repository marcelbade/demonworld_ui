// react
import React from "react";
// react-pdf
import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../fonts/Beryliumbold.ttf";
// functions and components
import { uuidGenerator } from "../shared/sharedFunctions";
// styles
import styles from "./pdfStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });

// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const ListPDF = (props) => {
  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.table}>
          {/* row */}

          {props.pdfMasterList
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj) => (
              <View style={styles.table}>
                {/* SUBFACTION NAME */}
                <View key={uuidGenerator()} style={styles.tableRowSubFactionName}>
                  <View key={uuidGenerator()} style={styles.tableColSubFactionName}>
                    <Text style={styles.tableCellSubFactioName}>{obj.subFaction}</Text>
                  </View>
                </View>
                {obj.units.map((u) => (
                  //  UNIT
                  <View key={uuidGenerator()} style={styles.table}>
                    <View key={uuidGenerator()} style={styles.tableRow}>
                      <View key={uuidGenerator()} style={styles.tableColUnit}>
                        <Text key={uuidGenerator()} style={styles.tableCellUnit}>
                          {u.unitName}
                        </Text>
                      </View>
                      { u.secondSubFaction !== u.subFaction?
                        <View key={uuidGenerator()} style={styles.tableColUnit}>
                          <Text key={uuidGenerator()} style={styles.tableCellUnit}>
                            {u.secondSubFaction}
                          </Text>
                        </View>
                        : null
                      }

                      <View key={uuidGenerator()} style={styles.tableColUnit}>
                        <Text key={uuidGenerator()} style={styles.tableCellUnit}>
                          {u.points}
                        </Text>
                      </View>
                      <View key={uuidGenerator()} style={styles.tableColUnitFiller}></View>
                    </View>
                    {/* EQUIPMENT */}
                    <View key={uuidGenerator()} style={styles.tableRow}>
                      {u.equipment.length > 0 ? <Text key={uuidGenerator()} style={styles.equipmentLineStyle}></Text> : null}
                    </View>
                    {u.equipment.length > 0
                      ? u.equipment.map((e) => (
                          <View key={uuidGenerator()} style={styles.tableRow}>
                            <View key={uuidGenerator()} style={styles.tableColEquipment}>
                              <Text key={uuidGenerator()} style={styles.tableCellEquipment}>
                                {e.name}
                              </Text>
                            </View>
                            <View key={uuidGenerator()} style={styles.tableColUnit}>
                              <Text key={uuidGenerator()} style={styles.tableCellEquipment}>
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
