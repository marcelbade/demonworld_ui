// react
import React from "react";
// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard } from "../../../../../../util/utilityFunctions";
// icons
import squareFormationWhite from "../../../../../../assets/icons/squareFormationWhite.png";
import skirmishFormation from "../../../../../../assets/icons/skirmishFormation.png";
import wedgeFormation from "../../../../../../assets/icons/wedgeFormation.png";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const UnitMovementRow = (props) => {
  /**
   * Function decides whether the fotmation mut be displayed by checking if one of the properties is not null.
   * @returns true, if any of the formation properties is not null
   */

  //unitOrCmdCard
  return isSingleElementCard(props.unit) ? (
    <View key={props.index} style={styles.cardUpperBlackRow}>
      <Text key={props.index}>{props.unit.move} Bewegungspunkte</Text>
    </View>
  ) : (
    <View key={props.index} style={styles.cardUpperBlackRow}>
      <Text key={props.index}>
        B: {props.unit.move} / A: {props.unit.charge} / P:{props.unit.skirmish}
      </Text>
      <Text key={props.index}>{props.unit.hold_maneuvers} Manöver</Text>
      <View key={props.index} style={styles.formations}>
        {props.unit.skirmishFormation ? <Image src={skirmishFormation} style={styles.icon} /> : null}
        {props.unit.squareFormation ? <Image src={squareFormationWhite} style={styles.squareFormationIcon} /> : null}
        {props.unit.wedgeFormation ? <Image src={wedgeFormation} style={styles.icon} /> : null}
        {<Text key={props.index}> {props.unit.horde ? <Text>Horde</Text> : null}</Text>}
      </View>
    </View>
  );
};
export default UnitMovementRow;
