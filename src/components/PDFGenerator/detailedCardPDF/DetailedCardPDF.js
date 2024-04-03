// react
import React from "react";
// react-pdf
import { Page, View, Document, Font, Text } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// styles
import { detailedStyles } from "../pdfStyles/detailedCardPdfStyles";
import { commonStyles } from "../pdfStyles/commonStyles";
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
      <Page style={detailedStyles.pageTopMargin}>
        <View style={commonStyles.armyName}>
          <Text> {props.armyName} </Text>
        </View>
        <View>
          {props.pdfData
            .filter((subFaction) => subFaction.units.length > 0)
            .map((obj, i) => (
              <View>
                <SubfactionSubtitle index={i} key={i} subFaction={obj.subFaction} />
                {obj.units.map((u, i) => (
                  <View index={i} key={i} style={detailedStyles.cardBox} wrap={false}>
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
        <Text style={detailedStyles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber}/${totalPages} `} fixed />
      </Page>
    </Document>
  );
};
export default ListPDF;
