// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// components & functions
import { setUnitStat } from "../../../../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
// constants
import { RANGED_WEAPON_STATS } from "../../../../../../constants/stats";
import { NO_RANGE_WEAPON } from "../../../../../../constants/textsAndMessages";

const RangedWeaponRow = (props) => {
  const rangedWeaponProperties = setUnitStat(props.unit, RANGED_WEAPON_STATS);

  const RANGED_WEAPON_STAT = `${rangedWeaponProperties.name} ${rangedWeaponProperties.value}`;

  return props.unit.rangedWeapon !== NO_RANGE_WEAPON ? (
    <View
      key={props.index} //
      style={detailedStyles.cardCenterContent}
    >
      <Text key={props.index}>{RANGED_WEAPON_STAT}</Text>
    </View>
  ) : null;
};
export default RangedWeaponRow;
