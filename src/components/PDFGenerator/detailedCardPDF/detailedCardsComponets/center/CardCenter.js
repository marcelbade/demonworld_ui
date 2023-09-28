// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import styles from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import RangeWeaponRow from "./cardCenterComponents/RangedWeaponRow";
import MeleeWeaponRow from "./cardCenterComponents/MeleeWeaponRow";
import SizeArmorSkill from "./cardCenterComponents/SizeArmorSkillRow";
import BackSideRulesRow from "./cardCenterComponents/BackSideRulesRow";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const CardCenter = (props) => {
  return (
    <View style={styles.cardCenterBox}>
      <View style={styles.centerLeftSide}>
        {props.unit.rangedWeapon === NO_RANGE_WEAPON ? null : (
          <RangeWeaponRow
            weaponName={props.unit.rangedWeapon} //
            rangedAttackStats={props.unit.rangedAttackStats}
          />
        )}
        <MeleeWeaponRow weaponName={props.unit.weapon1Name} weapon={props.unit.weapon1} />
        {props.unit.weapon2 === 0 ? null : (
          <MeleeWeaponRow
            weaponName={props.unit.weapon2Name} //
            weapon={props.unit.weapon2}
          />
        )}

        {props.unit.weapon3 === 0 ? null : (
          <MeleeWeaponRow
            weaponName={props.unit.weapon3Name} //
            weapon={props.unit.weapon3}
          />
        )}
        <SizeArmorSkill unit={props.unit} />
      </View>
      <Text style={styles.separator}></Text>
      <View style={styles.cardCenterRightSide}>
        <BackSideRulesRow unit={props.unit} />
      </View>
    </View>
  );
};
export default CardCenter;
