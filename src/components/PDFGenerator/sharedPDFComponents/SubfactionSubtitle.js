// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../pdfStyles/commonStyles";
import { listStyles } from "../pdfStyles/listPdfStyles";

const SubfactionSubtitle = (props) => {
  // Register font
  Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });
  Font.register({ family: "notMaryKate", src: notMaryKate });

  return (
    <Document>
      <View style={commonStyles.subFactionTitleBox}>
        <View style={listStyles.subFactionTitleCol}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFaction}</Text>
        </View>
        <View style={listStyles.subFactionStatCol}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionTotal}</Text>
        </View>
        <View style={listStyles.subFactionStatCol}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionPercentage}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
