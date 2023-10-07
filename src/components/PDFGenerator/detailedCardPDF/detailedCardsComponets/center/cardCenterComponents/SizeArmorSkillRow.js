import React from "react";
// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
//  icons
import rangeArmorIcon from "../../../../../../icons/range-armor.png";
import meleeArmorIcon from "../../../../../../icons/melee-armor.png";
import blackSwordIcon from "../../../../../../icons/sword2.png";
import blackBowIcon from "../../../../../../icons/bow2.png";

const SizeArmorSkillRow = (props) => {
  return (
    <View key={props.index} style={styles.sizeArmorSkillBox}>
      <Text key={props.index}>Größe: {props.unit.unitSize}</Text>

      <View style={styles.armorIconValueGroup}>
        <View style={styles.iconValueGroup}>
          <Image src={rangeArmorIcon} style={styles.icon} />
          <Text key={props.index}>{props.unit.armourRange}</Text>
        </View>
        <View style={styles.iconValueGroup}>
          <Image src={meleeArmorIcon} style={styles.icon} />
          <Text key={props.index}>{props.unit.armourMelee}</Text>
        </View>
      </View>
      <View style={styles.skillGroup}>
        {props.unit.skillMelee !== 0 ? (
          <View style={styles.iconValueGroup}>
            <Image src={blackSwordIcon} style={styles.icon} />
            <Text key={props.index}>{props.unit.skillMelee}</Text>
          </View>
        ) : null}
        {props.unit.skillRange !== 0 ? (
          <View style={styles.iconValueGroup}>
            <Image src={blackBowIcon} style={styles.icon} />
            <Text key={props.index}>{props.unit.skillRange}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default SizeArmorSkillRow;
