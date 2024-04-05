// react
import React from "react";
// react-pdf
import { Page, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// styles
import { listStyles } from "../pdfStyles/listPdfStyles";
// pdf components
import TitleAndStats from "../sharedPDFComponents/TitleAndStats";
import Unit from "./standardListComponents/Unit";
import Equipment from "./standardListComponents/Equipment";
import SubfactionSubtitle from "../sharedPDFComponents/SubfactionSubtitle";
import PageNumber from "../sharedPDFComponents/PageNumber";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

const StandardListPDF = (props) => {
  return (
    <Document>
      <Page>
        <View style={listStyles.test}>
          <TitleAndStats data={props.data} />
          {props.data.list
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj, i) => (
              <View key={i}>
                <SubfactionSubtitle data={obj} displaySeparator= {props.displaySeparator} />
                {obj.units.map((u, i) => (
                  <View key={i}>
                    <Unit unit={u} />
                    <Equipment equipment={u.equipment} />
                  </View>
                ))}
              </View>
            ))}
        </View>
        <PageNumber />
      </Page>
    </Document>
  );
};
export default StandardListPDF;
