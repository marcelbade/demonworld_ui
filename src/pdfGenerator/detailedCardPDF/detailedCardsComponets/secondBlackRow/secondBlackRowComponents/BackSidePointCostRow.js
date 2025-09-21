// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// components and functions
import usePointCostCalculator from "../../../../../customHooks/UsePointCostCalculator";
// constants
import { STATS } from "../../../../../constants/textsAndMessages";

const BackSidePointCostRow = (props) => {
  const calculator = usePointCostCalculator();

  const totalPoints = `${calculator.calculateTotalUnitCost(props.unit)} ${STATS.POINTS}`;

  return (
    <View key={props.index} style={detailedStyles.cardBlackRow}>
      <Text key={props.index}>{totalPoints}</Text>
    </View>
  );
};
export default BackSidePointCostRow;
