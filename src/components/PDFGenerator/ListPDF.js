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

// Create the dynamic PDF content.
const ListPDF = (props) => {
  const DynamicList = () => {
    return props.pdfMasterList
      .filter((obj) => obj.units.length > 0)
      .map((obj) => (
        <View key={uuidGenerator()} style={styles.globalMargin}>
          <Text key={uuidGenerator()} style={styles.subFactionNameStyle}>
            {/* SUBFACTION */}
            {obj.subFaction}
          </Text>
          {obj.units.map((u) => (
            <Text key={uuidGenerator()} style={styles.unitEntryStyle}>
              {/* UNIT */}
              {u.unitName} - {u.points}
              {u.equipment.length > 0 ? <Text key={uuidGenerator()} style={styles.equipmentLineStyle}></Text> : null}
              {u.equipment.length > 0
                ? u.equipment.map((e) => (
                    <View key={uuidGenerator()} style={styles.equipmentListMargin}>
                      <Text key={uuidGenerator()} style={styles.equipmentEntryStyle}>
                        {/* EQUIPMENT */}
                        {e.name} - {e.points}
                      </Text>
                    </View>
                  ))
                : null}
            </Text>
          ))}
        </View>
      ));
  };

  return (
    <Document>
      <Page>
        <View style={{ marginTop: 15 }}></View>
        <View children={<DynamicList />} />
      </Page>
    </Document>
  );
};
export default ListPDF;
