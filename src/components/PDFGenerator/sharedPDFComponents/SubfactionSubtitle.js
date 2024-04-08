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
      <View
        style={
          props.displaySeparator // dashed line is only shown for the default list
            ? commonStyles.subFactionTitleBox
            : commonStyles.subFactionTitleBoxNoSeparator
        }
      >
        <View style={commonStyles.subFactionTitleCol}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFaction}</Text>
        </View>
        <View style={commonStyles.subFactionStatCol}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionTotal}</Text>
        </View>
        <View style={commonStyles.subFactionStatCol}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionPercentage}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
