import React from "react";
// react-pdf
import { Text, View, Document, Font, Image } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../../fonts/Beryliumbold.ttf";
// functions and components
import { uuidGenerator } from "../../../shared/sharedFunctions";
// styles
import styles from "../../pdfStyles/detailedCardPdfStyles";
//  icons
import rangeArmorIcon from "../../../../icons/range-armor.png";
import meleeArmorIcon from "../../../../icons/melee-armor.png";
import blackSwordIcon from "../../../../icons/sword2.png";
import blackBowIcon from "../../../../icons/bow2.png";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });

// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const SizeArmorSkill = (props) => {
  return (
    <Document>
      <View key={uuidGenerator()} style={styles.CardRow}>
        <View key={uuidGenerator()} style={styles.CardCol}>
          <Text key={uuidGenerator()} style={styles.CardCell}>
            Größe: {props.unit.unitSize}
          </Text>
        </View>

        <View key={uuidGenerator()} style={styles.CardCol}>
          <Text key={uuidGenerator()} style={styles.CardCell}>
            <Image src={rangeArmorIcon} />
            {props.unit.armourRange}
          </Text>
        </View>
        <View key={uuidGenerator()} style={styles.CardCol}>
          <Text key={uuidGenerator()} style={styles.CardCell}>
            <Image src={meleeArmorIcon} />
            {props.unit.armourMelee}
          </Text>
        </View>
        {props.unit.meleeSkill !== 0 ? (
          <View key={uuidGenerator()} style={styles.CardCol}>
            <Text key={uuidGenerator()} style={styles.CardCell}>
              <Image src={blackSwordIcon} />
              {props.unit.skillMelee}
            </Text>
          </View>
        ) : null}
        {props.unit.meleeSkill !== 0 ? (
          <View key={uuidGenerator()} style={styles.CardCol}>
            <Text key={uuidGenerator()} style={styles.CardCell}>
              <Image src={blackBowIcon} />
              {props.unit.skillRange}
            </Text>
          </View>
        ) : null}
      </View>
    </Document>
  );
};
export default SizeArmorSkill;
