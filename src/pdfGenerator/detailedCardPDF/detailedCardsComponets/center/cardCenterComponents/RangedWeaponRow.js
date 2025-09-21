// react-pdf
import { Text, View } from "@react-pdf/renderer";
// components & functions
import { rangedWeaponSetter } from "../../../../../gameLogic/unitStatSetters";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const RangedWeaponRow = (props) => {
  return props.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
    <View
      key={props.index} //
      style={detailedStyles.cardCenterContent}
    >
      <Text key={props.index}>{rangedWeaponSetter(props.unit)}</Text>
    </View>
  ) : null;
};
export default RangedWeaponRow;
