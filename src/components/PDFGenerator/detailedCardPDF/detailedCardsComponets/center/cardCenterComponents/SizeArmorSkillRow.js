import React from "react";
// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
//  icons
import rangeArmorIcon from "../../../../../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../../../../../assets/icons/melee-armor.png";
import blackSwordIcon from "../../../../../../assets/icons/sword2.png";
import blackBowIcon from "../../../../../../assets/icons/bow2.png";
// constants
import { CARD_PREVIEW } from "../../../../../../constants/textsAndMessages";

const SizeArmorSkillRow = (props) => {
  const iconValueStyle = detailedStyles.iconValueGroup;
  const iconStyle = detailedStyles.icon;

  const SIZE = `${CARD_PREVIEW.SIZE} ${props.unit.unitSize}`;

  const ARMOUR_RANGE = props.unit.armourRange;
  const ARMOUR_MELEE = props.unit.armourMelee;
  const MELEE_SKILL = props.unit.skillMelee;
  const RANGE_SKILL = props.unit.skillRange;

  return (
    <View key={props.index} style={detailedStyles.sizeArmorSkillBox}>
      <Text key={props.index}>{SIZE}</Text>
      <View style={detailedStyles.armorIconValueGroup}>
        <View style={iconValueStyle}>
          <Image src={rangeArmorIcon} style={iconStyle} />
          <Text key={props.index}>{ARMOUR_RANGE}</Text>
        </View>
        <View style={iconValueStyle}>
          <Image src={meleeArmorIcon} style={iconStyle} />
          <Text key={props.index}>{ARMOUR_MELEE}</Text>
        </View>
      </View>
      <View style={detailedStyles.skillGroup}>
        {props.unit.skillMelee !== 0 ? (
          <View style={iconValueStyle}>
            <Image src={blackSwordIcon} style={iconStyle} />
            <Text key={props.index}>{MELEE_SKILL}</Text>
          </View>
        ) : null}
        {props.unit.skillRange !== 0 ? (
          <View style={iconValueStyle}>
            <Image src={blackBowIcon} style={iconStyle} />
            <Text key={props.index}>{RANGE_SKILL}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default SizeArmorSkillRow;
