// react
import React from "react";
// react-pdf
import { View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../pdfStyles/detailedCardPdfStyles";
import { commonStyles } from "../../../pdfStyles/commonStyles";

// pdf components
import RangeWeaponRow from "./cardCenterComponents/RangedWeaponRow";
import MeleeWeaponRow from "./cardCenterComponents/MeleeWeaponRow";
import SizeArmorSkill from "./cardCenterComponents/SizeArmorSkillRow";
import BackSideRulesRow from "./cardCenterComponents/BackSideRulesRow";
// constants
import { NO_RANGE_WEAPON } from "../../../../../constants/textsAndMessages";

const CardCenter = (props) => {
  return (
    <View style={commonStyles.table}>
      <View style={commonStyles.tableRow}>
        <View style={detailedStyles.cell}>
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
        <View style={detailedStyles.whiteCell}></View>
        <View style={detailedStyles.cell}>
          <BackSideRulesRow
            unit={props.unit} //
            index={props.index}
          />
        </View>
      </View>
    </View>
  );
};
export default CardCenter;
