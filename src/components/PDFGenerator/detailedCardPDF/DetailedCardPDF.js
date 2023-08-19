// react
import React from "react";
// react-pdf
import { Page, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../fonts/Beryliumbold.ttf";
// styles
import styles from "../pdfStyles/detailedCardPdfStyles";
// pdf components
import SubfactionSubtitle from "./detailedCardsComponets/SubfactionSubtitle";
import DetailedCardFront from "./DetailedCardFront";
import DetailedCardBack from "./DetailedCardBack";
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
              <View>
                {/* SUBFACTION NAME */}
                <SubfactionSubtitle subFaction={obj.subFaction} />
                {obj.units.map((u) => (
                  <View style ={styles.arrangeCardSides}>
                    <DetailedCardFront u={u} />
                    <DetailedCardBack u={u} />
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
