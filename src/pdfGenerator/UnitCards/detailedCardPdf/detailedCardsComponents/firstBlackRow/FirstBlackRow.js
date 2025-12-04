// react-pdf
import { View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import UnitMovementRow from "../firstBlackRow/firstBlackRowComponents/UnitMovementRow";
import BackSideElementsRow from "../firstBlackRow/firstBlackRowComponents/BackSideElementsRow";

const FirstBlackRow = (props) => {
  return (
    <View style={detailedStyles.blackRowBox}>
      <UnitMovementRow unit={props.unit} index={props.index} />
      <BackSideElementsRow unit={props.unit} index={props.index} />
    </View>
  );
};
export default FirstBlackRow;
