// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
//  components and functions
import { numberOfElements, renderSpecialElements } from "../../../../../../util/utilityFunctions";

const BackSideElementsRow = (props) => {
  const hasNoSpecialElements =
    !props.unit.leader && //
    !props.unit.standardBearer &&
    !props.unit.musician;

  return (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <View
        style={
          hasNoSpecialElements //
            ? detailedStyles.firstBlackRowBackOneElement
            : detailedStyles.firstBlackRowBackTwoElements
        }
      >
        <Text>{renderSpecialElements(props.unit)}</Text>
        <Text> {numberOfElements(props.unit)} </Text>
      </View>
    </View>
  );
};
export default BackSideElementsRow;
