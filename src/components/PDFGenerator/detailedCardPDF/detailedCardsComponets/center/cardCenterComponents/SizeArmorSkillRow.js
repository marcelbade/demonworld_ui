import React from "react";
// react-pdf
import { Text, View,   Image } from "@react-pdf/renderer";
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
    <View key={uuidGenerator()} style={styles.cardRow}>
      <Text key={uuidGenerator()}>Größe: {props.unit.unitSize}</Text>

      <View key={uuidGenerator()} style={styles.icons}>
        <Text key={uuidGenerator()} style={styles.rightPadding}>
          <Image src={rangeArmorIcon} />
          {props.unit.armourRange}
        </Text>
        <Text key={uuidGenerator()}>
          <Image src={meleeArmorIcon} />
          {props.unit.armourMelee}
        </Text>
      </View>
      <View key={uuidGenerator()} style={styles.icons}>
        {props.unit.meleeSkill !== 0 ? (
          <Text key={uuidGenerator()} style={styles.rightPadding}>
            <Image src={blackSwordIcon} />
            {props.unit.skillMelee}
          </Text>
        ) : null}

        {props.unit.meleeSkill !== 0 ? (
          <Text key={uuidGenerator()}>
            <Image src={blackBowIcon} />
            {props.unit.skillRange}
          </Text>
        ) : null}
      </View>
    </View>
  );
};
export default SizeArmorSkillRow;
