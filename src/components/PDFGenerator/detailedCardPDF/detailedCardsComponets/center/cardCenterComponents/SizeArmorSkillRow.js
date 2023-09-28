import React from "react";
// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";
//  icons
import rangeArmorIcon from "../../../../../../icons/range-armor.png";
import meleeArmorIcon from "../../../../../../icons/melee-armor.png";
import blackSwordIcon from "../../../../../../icons/sword2.png";
import blackBowIcon from "../../../../../../icons/bow2.png";

const SizeArmorSkillRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.sizeArmorSkillBox}>
      <Text key={uuidGenerator()}>Größe: {props.unit.unitSize}</Text>

      <View  style={styles.iconValueGroup}>
        <Image src={rangeArmorIcon} style={styles.icon} />
        <Text key={uuidGenerator()}>
          {props.unit.armourRange}
        </Text>
        <Image src={meleeArmorIcon} style={styles.icon} />
        <Text key={uuidGenerator()}>{props.unit.armourMelee}</Text>
      </View>

      {props.unit.meleeSkill !== 0 ? (
        <View style={styles.iconValueGroup}>
          <Image src={blackSwordIcon} style={styles.icon} />
          <Text key={uuidGenerator()}>{props.unit.skillMelee}</Text>
        </View>
      ) : null}

      {props.unit.meleeSkill !== 0 ? (
        <View style={styles.iconValueGroup}>
          <Image src={blackBowIcon} style={styles.icon} />
          <Text key={uuidGenerator()}>{props.unit.skillRange}</Text>
        </View>
      ) : null}
    </View>
  );
};
export default SizeArmorSkillRow;
