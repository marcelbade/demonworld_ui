// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
import notMaryKate from "../../../assets/fonts/notMaryKate.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// styles
import { commonUnitStyles } from "../pdfStyles/commonUnitStyles";

/**
 * React-pdf component that renders the header for every sub faction in the army list. The header
 * contains the suv factions's name, the point total and the minand max points that can be spent on it.
 * If only a single custom card is printed, then only the name is printed and the rest is omitted.
 * @param {obj} props
 * @returns
 */
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
        <View style={commonUnitStyles.subFactionNameBox}>
          <Text style={commonUnitStyles.subFactionTitleAndStats}>{props.data.subFaction}</Text>
        </View>
        <View style={commonUnitStyles.subFactionStatBox}>
          {props.data.subFactionTotal === null ? null : (
            <Text style={commonUnitStyles.subFactionTitleAndStats}>{props.data.subFactionTotal}</Text>
          )}
          {props.data.subFactionPercentage === null ? null : (
            <Text style={commonUnitStyles.subFactionTitleAndStats}>{`${props.data.subFactionPercentage}%`}</Text>
          )}
          {props.data.minSubFactionPercentage === null ? null : (
            <Text style={commonUnitStyles.subFactionTitleAndStats}>{renderMinMaxPercentageString()}</Text>
          )}
        </View>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
