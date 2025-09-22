// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// components and functions
import { initiativeSetter } from "../../../../../gameLogic/cardStatRenderFunctions/unitStatSetters";

const InitiativeRow = (props) => {
  const intiative = initiativeSetter(props.unit);

  return (
    <View
      key={props.index} //
      style={detailedStyles.sizeArmorSkillBox}
    >
      <Text key={props.index}>{intiative}</Text>
    </View>
  );
};
export default InitiativeRow;
