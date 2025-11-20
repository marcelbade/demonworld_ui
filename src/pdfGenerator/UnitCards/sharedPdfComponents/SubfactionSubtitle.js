// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// styles
import { commonUnitStyles } from "../pdfStyles/commonUnitStyles";

const SubfactionSubtitle = (props) => {
  // Register font
  Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });
  Font.register({ family: "notMaryKate", src: notMaryKate });

  const renderMinMaxPercentageString = () => {
    return `(${props.data.minSubFactionPercentage}% - ${props.data.maxSubFactionPercentage}%)`;
  };

  return (
    <Document>
      <View style={commonUnitStyles.subFactionTitleBox}>
        <View  style={commonUnitStyles.subFactionNameBox}>
          <Text style={commonUnitStyles.subFactionTitleAndStats}>{props.data.subFaction}</Text>
        </View>
        <View   style={commonUnitStyles.subFactionStatBox}>
          <Text style={commonUnitStyles.subFactionTitleAndStats}>{props.data.subFactionTotal}</Text>
          <Text style={commonUnitStyles.subFactionTitleAndStats}>{`${props.data.subFactionPercentage}%`}</Text>
          <Text style={commonUnitStyles.subFactionTitleAndStats}>{renderMinMaxPercentageString()}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
