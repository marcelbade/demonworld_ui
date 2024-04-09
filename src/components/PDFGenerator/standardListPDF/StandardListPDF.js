// react
import React from "react";
// react-pdf
import { View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// pdf components
import Unit from "./standardListComponents/Unit";
import Equipment from "./standardListComponents/Equipment";
import SubfactionSubtitle from "../sharedPDFComponents/SubfactionSubtitle";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

const StandardListPDF = (props) => {
  return (
    <Document>
      {props.data.list
        .filter((subFaction) => subFaction.units.length > 0)
        .map((obj, i) => (
          <View key={i}>
            <SubfactionSubtitle data={obj} />
            {obj.units.map((u, i) => (
              <View key={i}>
                <Unit unit={u} />
                <Equipment equipment={u.equipment} />
              </View>
            ))}
          </View>
        ))}
    </Document>
  );
};
export default StandardListPDF;
