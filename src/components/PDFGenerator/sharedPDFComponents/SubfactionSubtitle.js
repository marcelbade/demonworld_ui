// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// react-pdf
import { Text, View, Document,Font } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../pdfStyles/commonStyles";

const SubfactionSubtitle = (props) => {

  // Register font
  Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

  return (
    <Document>
      <View key={props.subFaction}>
        <Text style={commonStyles.subFactioStats}>{props.data.subFaction}</Text>
        <Text style={commonStyles.subFactioStats}>{props.data.subFactionTotal}</Text>
        <Text style={commonStyles.subFactioStats}>{props.data.subFactionPercentage}</Text>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;

 