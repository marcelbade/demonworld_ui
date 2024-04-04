// react
import React from "react";
// react-pdf
import { Page, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// styles
import { listStyles } from "../pdfStyles/listPdfStyles";

// pdf components
import SubfactionName from "./standardListComponents/SubfactionName";
import TitleAndStats from "./standardListComponents/TitleAndStats";
import Unit from "./standardListComponents/Unit";
import Equipment from "./standardListComponents/Equipment";
import EquipmentLine from "./standardListComponents/EquipmentLine";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

const StandardListPDF = (props) => {
  return (
    <Document>
      <Page style={listStyles.body}>
        <View style={listStyles.table}>
          <TitleAndStats armyName={props.armyName} />
          {props.pdfData
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj, i) => (
              <View key={i} style={listStyles.table}>
                <SubfactionName name={obj.subFaction} />
                {obj.units.map((u, i) => (
                  <View key={i} style={listStyles.table}>
                    <Unit unit={u} />
                    <EquipmentLine equipment={u.equipment} />
                    <Equipment equipment={u.equipment} />
                  </View>
                ))}
              </View>
            ))}
        </View>
      </Page>
    </Document>
  );
};
export default StandardListPDF;
