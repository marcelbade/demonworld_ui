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

  const renderMinMaxPercentageString = () => {
    return `(${props.data.minSubFactionPercentage}% - ${props.data.maxSubFactionPercentage}%)`;
  };

  return (
    <Document>
      <View style={commonStyles.subFactionTitleBox}>
        <View  style={commonStyles.subFactionNameBox}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFaction}</Text>
        </View>
        <View   style={commonStyles.subFactionStatBox}>
          <Text style={commonStyles.subFactionTitleAndStats}>{props.data.subFactionTotal}</Text>
          <Text style={commonStyles.subFactionTitleAndStats}>{`${props.data.subFactionPercentage}%`}</Text>
          <Text style={commonStyles.subFactionTitleAndStats}>{renderMinMaxPercentageString()}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
