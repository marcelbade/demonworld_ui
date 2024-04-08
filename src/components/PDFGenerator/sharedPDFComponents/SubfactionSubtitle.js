// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../pdfStyles/commonStyles";

const SubfactionSubtitle = (props) => {
  // Register font
  Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });
  Font.register({ family: "notMaryKate", src: notMaryKate });

  return (
    <Document>
      <View style={commonStyles.subFactionTitleBox}>
        <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFaction}</Text>
        <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionTotal}</Text>
        <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionPercentage}</Text>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
