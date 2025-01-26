// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// functions and components
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
// contants
import { WEAPON_1 } from "../../../../../../constants/stats";

const MeleeWeaponRow = (props) => {
  //  weapon={props.unit.weapon1}
  const weaponOneProperties = setUnitStat(props.unit, WEAPON_1);

  const weapons = [
    {
      // weapon one can be replaced by a magical item
      weaponString:
        props.unit.weapon1 === 0 //
          ? null
          : `${weaponOneProperties.name}: ${weaponOneProperties.value}`,
    },
    {
      weaponString:
        props.unit.weapon2 === 0 //
          ? null
          : `${props.unit.weapon2Name}: ${props.unit.weapon2}`,
    },
    {
      weaponString:
        props.unit.weapon3 === 0 //
          ? null
          : `${props.unit.weapon3Name}: ${props.unit.weapon3}`,
    },
  ];

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
