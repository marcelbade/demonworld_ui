// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// contants
import { meleeWeaponSetter } from "../../../../../gameLogic/unitStatSetters";

const MeleeWeaponRow = (props) => {
  const weapons = meleeWeaponSetter(props.unit);

  return weapons.map((w, i) => {
    return (
      <View
        key={i} //
        style={detailedStyles.cardRow}
      >
        <Text key={props.index}>{w.weaponString}</Text>
      </View>
    );
  });
};
export default MeleeWeaponRow;
