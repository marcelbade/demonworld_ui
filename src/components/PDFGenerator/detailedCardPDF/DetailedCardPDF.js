// react
import React from "react";
// react-pdf
import { Page, View, Document, Font, Text } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../fonts/Beryliumbold.ttf";
import jaapokkiRegular from "../../../fonts/jaapokkiRegular.ttf";
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
Font.register({ family: "Beryliumbold", src: Beryliumbold });
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const ListPDF = (props) => {
  return (
    <Document>
      <Page style={styles.pageTopMargin}>
        <View style={styles.armyName}>
          <Text> {props.armyName} </Text>
        </View>
        <View>
          {props.pdfMasterList
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj) => (
              <View>
                <SubfactionSubtitle subFaction={obj.subFaction} />
                {obj.units.map((u) => (
                  <View style={styles.cardBox} wrap={false}>
                    <CardHeader unit={u} />
                    <FirstBlackRow unit={u} />
                    <CardCenter unit={u} />
                    <SecondBlackRow unit={u} />
                    <CardFooter unit={u} />
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
