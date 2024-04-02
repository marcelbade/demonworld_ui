// react
import React from "react";
// react-pdf
import { View, Text } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
// pdf components
import RangeWeaponRow from "./cardCenterComponents/RangedWeaponRow";
import MeleeWeaponRow from "./cardCenterComponents/MeleeWeaponRow";
import SizeArmorSkill from "./cardCenterComponents/SizeArmorSkillRow";
import BackSideRulesRow from "./cardCenterComponents/BackSideRulesRow";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const CardCenter = (props) => {
  return (
    <View style={detailedStyles.cardCenterBox}>
      <View style={detailedStyles.centerLeftSide}>
        {props.unit.rangedWeapon === NO_RANGE_WEAPON ? null : (
          <RangeWeaponRow
            weaponName={props.unit.rangedWeapon} //
            rangedAttackStats={props.unit.rangedAttackStats}
            index={props.index}
          />
        )}
        <MeleeWeaponRow
          weaponName={props.unit.weapon1Name} //
          weapon={props.unit.weapon1}
          index={props.index}
        />
        {props.unit.weapon2 === 0 ? null : (
          <MeleeWeaponRow
            weaponName={props.unit.weapon2Name} //
            weapon={props.unit.weapon2}
            index={props.index}
          />
        )}

        {props.unit.weapon3 === 0 ? null : (
          <MeleeWeaponRow
            weaponName={props.unit.weapon3Name} //
            weapon={props.unit.weapon3}
            index={props.index}
          />
        )}
        <SizeArmorSkill
          unit={props.unit} //
          index={props.index}
        />
      </View>
      <Text style={detailedStyles.separator}></Text>
      <View style={detailedStyles.cardCenterRightSide}>
        <BackSideRulesRow
          unit={props.unit} //
          index={props.index}
        />
      </View>
    </View>
  );
};
export default CardCenter;
