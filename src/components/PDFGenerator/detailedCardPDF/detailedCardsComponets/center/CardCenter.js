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

const CardCenter = (props) => {
  return (
    <View style={styles.cardCenter}>
      <View style={styles.leftSide}>
        {props.unit.weapon2 === 0 ? null : (
          <RangeWeaponRow
            weaponName={props.unit.rangedWeapon} //
            rangedAttackStats={props.unit.rangedAttackStats}
          />
        )}
        <MeleeWeaponRow weaponName={"Waffe1"} weapon={props.unit.weapon1} />
        {props.unit.weapon2 === 0 ? null : (
          <MeleeWeaponRow
            weaponName={"Waffe2"} //
            weapon={props.unit.weapon2}
          />
        )} 
        
        {props.unit.weapon3 === 0 ? null : (
          <MeleeWeaponRow
            weaponName={"Waffe3"} //
            weapon={props.unit.weapon3}
          />
        )}
        <SizeArmorSkill unit={props.unit} />
      </View>
      <Text style={styles.separator}></Text>
      <BackSideRulesRow unit={props.unit} />
    </View>
  );
};
export default CardCenter;
