// react
import React from "react";
// react-pdf
import { Page, View, Document, Font, Text } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
 import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// styles
import styles from "../pdfStyles/detailedCardPdfStyles";
// pdf components
import CardCenter from "./detailedCardsComponets/center/CardCenter";
import FirstBlackRow from "./detailedCardsComponets/firstBlackRow/FirstBlackRow";
import CardHeader from "./detailedCardsComponets/header/Header";
import SecondBlackRow from "./detailedCardsComponets/secondBlackRow/SecondBlackRow";
import CardFooter from "./detailedCardsComponets/footer/CardFooter";
import SubfactionSubtitle from "./detailedCardsComponets/SubfactionSubtitle";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
 Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const ListPDF = (props) => {
  return (
    <Document>
      <Page style={styles.pageTopMargin}>
        <View style={styles.armyName}>
          <Text> {props.armyName} </Text>
        </View>
        <View>
          {props.pdfData
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj) => (
              <View>
                <SubfactionSubtitle subFaction={obj.subFaction} />
                {obj.units.map((u, i) => (
                  <View style={styles.cardBox} wrap={false}>
                    <CardHeader unit={u} index={i} />
                    <FirstBlackRow unit={u} index={i} />
                    <CardCenter unit={u} index={i} />
                    <SecondBlackRow unit={u} index={i} />
                    <CardFooter unit={u} index={i} />
                  </View>
                ))}
              </View>
            ))}
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages} `} fixed />
      </Page>
    </Document>
  );
};
export default ListPDF;
