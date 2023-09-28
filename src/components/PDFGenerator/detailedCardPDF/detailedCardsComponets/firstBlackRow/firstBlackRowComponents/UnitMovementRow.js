// react
import React from "react";
// react-pdf
import { Text, View } from "@react-pdf/renderer";
// functions and components
import { isSingleElementCard, uuidGenerator } from "../../../../../shared/sharedFunctions";
import { displayFormations } from "../../../../../compendiums/factionTable/depencies/factionTableFunctions";
// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const UnitMovementRow = (props) => {
  /**
   * Function decides whether the fotmation mut be displayed by checking if one of the properties is not null.
   * @returns true, if any of the formation properties is not null
   */
  const areFormationsNull = () => {
    return props.unit.wedgeFormation || props.unit.horde || props.unit.squareFormation || props.unit.skirmishFormation;
  };

  //unitOrCmdCard
  return isSingleElementCard(props.unit) ? (
    <View key={uuidGenerator()} style={styles.cardBlackRow}>
      <Text key={uuidGenerator()}>{props.unit.move} Bewegungspunkte</Text>
    </View>
  ) : (
    <View key={uuidGenerator()} style={styles.cardBlackRow}>
      <Text key={uuidGenerator()}>
        B: {props.unit.move} / A: {props.unit.charge} / P:{props.unit.skirmish}
      </Text>
      <Text key={uuidGenerator()}>{props.unit.hold_maneuvers} Manöver</Text>
      {areFormationsNull() ? <Text>{displayFormations(props.unit)}</Text> : null}
    </View>
  );
};
export default UnitMovementRow;
