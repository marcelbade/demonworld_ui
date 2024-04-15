// react
import React from "react";
// react-pdf
import { View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// styles
import { detailedStyles } from "../pdfStyles/detailedCardPdfStyles";
// pdf components
import CardCenter from "./detailedCardsComponets/center/CardCenter";
import FirstBlackRow from "./detailedCardsComponets/firstBlackRow/FirstBlackRow";
import CardHeader from "./detailedCardsComponets/header/Header";
import SecondBlackRow from "./detailedCardsComponets/secondBlackRow/SecondBlackRow";
import CardFooter from "./detailedCardsComponets/footer/CardFooter";
import SubfactionSubtitle from "../sharedPDFComponents/SubfactionSubtitle";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const ListPDF = (props) => {
  return (
    <Document>
      {props.data.list
        .filter((subFaction) => subFaction.units.length > 0)
        .map((obj, i) => (
          <View wrap={false}>
            <SubfactionSubtitle key={i} data={obj} />
            {obj.units.map((u, i) => (
              <View key={i} style={detailedStyles.cardBox} wrap={false}>
                <CardHeader unit={u} />
                <FirstBlackRow unit={u} />
                <CardCenter unit={u} />
                <SecondBlackRow unit={u} />
                <CardFooter unit={u} />
              </View>
            ))}
          </View>
        ))}
    </Document>
  );
};
export default ListPDF;
