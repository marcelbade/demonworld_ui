// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard } from "../../../../../../util/utilityFunctions";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { fearSetter, moralSetter } from "../../../../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const FearAndMoralRow = (props) => {
  return isSingleElementCard(props.unit) ? (
    <View
      key={props.index} //
      style={detailedStyles.cardBlackRow}
    >
      <Text key={props.index}>{fearSetter(props.unit)}</Text>
    </View>
  ) : (
    <View
      key={props.index} //
      style={detailedStyles.cardBlackRow}
    >
      <Text key={props.index}>{fearSetter(props.unit)}</Text>
      <Text key={props.index}>{moralSetter(props.unit)}</Text>
    </View>
  );
};
export default FearAndMoralRow;
