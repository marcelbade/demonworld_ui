import React from "react";
import { Page, Text, View, Document, Font } from "@react-pdf/renderer";
import notMaryKate from "../../fonts/notMaryKate.ttf";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

// Create Document Component
const ListPDF = (props) => {
  let units = props.units;
  // let distinctSubFactions = props.distinctSubFactions;

  const DynamicList = () => {
    return units.map((u) => (
      <View style={{ marginLeft: 15, marginTop: 8 }}>
        <Text style={{ textAlign: "left", fontFamily: "notMaryKate", fontSize: 10 }}>
          {u.unitName} - {u.points}
        </Text>
        {u.equipment.length > 0 ? (
          <Text
            style={{
              marginRight: 400,
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginBorder: 2,
            }}
          ></Text>
        ) : null}
        {u.equipment.length > 0
          ? u.equipment.map((e) => (
              <View style={{ marginLeft: 35 }}>
                <Text style={{ textAlign: "left", fontFamily: "notMaryKate", fontSize: 10 }}>
                  {e.name} - {e.points}
                </Text>
              </View>
            ))
          : null}
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
