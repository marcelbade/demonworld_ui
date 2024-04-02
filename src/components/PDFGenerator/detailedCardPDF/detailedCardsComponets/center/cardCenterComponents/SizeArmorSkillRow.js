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

const SizeArmorSkillRow = (props) => {
  return (
    <View key={props.index} style={detailedStyles.sizeArmorSkillBox}>
      <Text key={props.index}>Größe: {props.unit.unitSize}</Text>

      <View style={detailedStyles.armorIconValueGroup}>
        <View style={detailedStyles.iconValueGroup}>
          <Image src={rangeArmorIcon} style={detailedStyles.icon} />
          <Text key={props.index}>{props.unit.armourRange}</Text>
        </View>
        <View style={detailedStyles.iconValueGroup}>
          <Image src={meleeArmorIcon} style={detailedStyles.icon} />
          <Text key={props.index}>{props.unit.armourMelee}</Text>
        </View>
      </View>
      <View style={detailedStyles.skillGroup}>
        {props.unit.skillMelee !== 0 ? (
          <View style={detailedStyles.iconValueGroup}>
            <Image src={blackSwordIcon} style={detailedStyles.icon} />
            <Text key={props.index}>{props.unit.skillMelee}</Text>
          </View>
        ) : null}
        {props.unit.skillRange !== 0 ? (
          <View style={detailedStyles.iconValueGroup}>
            <Image src={blackBowIcon} style={detailedStyles.icon} />
            <Text key={props.index}>{props.unit.skillRange}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default SizeArmorSkillRow;
