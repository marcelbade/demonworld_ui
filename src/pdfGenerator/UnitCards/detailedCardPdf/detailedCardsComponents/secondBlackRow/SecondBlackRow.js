// react-pdf
import { View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import FearAndMoralRow from "../secondBlackRow/secondBlackRowComponents/FearAndMoralRow";
import BackSidePointCostRow from "../secondBlackRow/secondBlackRowComponents/BackSidePointCostRow";

const SecondBlackRow = (props) => {
  return (
    <View style={detailedStyles.blackRowBox}>
      <FearAndMoralRow
        unit={props.unit} //
        index={props.index}
      />
      <BackSidePointCostRow
        unit={props.unit} //
        index={props.index}
      />
    </View>
  );
};
export default SecondBlackRow;
