// react
import React from "react";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../../fonts/Beryliumbold.ttf";
// functions and components
import { uuidGenerator } from "../../../shared/sharedFunctions";
import { displayFormations } from "../../../compendiums/factionTable/depencies/factionTableFunctions";
// styles
import styles from "../../pdfStyles/detailedCardPdfStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });

// Create the dynamic PDF content. Due to the limitations of react-pdf, this has to be done via a jerryrigged CSS table.
const UnitMovementRow = (props) => {
  return (
    <Document>
      <View key={uuidGenerator()} style={styles.CardRow}>
        <View key={uuidGenerator()} style={styles.CardCol}>
          <Text key={uuidGenerator()} style={styles.CardCell}>
            B: {props.unit.move} / A: {props.unit.charge} / P:{props.unit.skirmish}
          </Text>
        </View>

        <View key={uuidGenerator()} style={styles.CardCol}>
          <Text key={uuidGenerator()} style={styles.CardCell}>
            {props.unit.hold_maneuvers} Manöver
          </Text>
        </View>

        <View key={uuidGenerator()} style={styles.CardCol}>
          <Text key={uuidGenerator()} style={styles.CardCell}>
            {displayFormations(props.unit)}
          </Text>
        </View>

        <View key={uuidGenerator()} style={styles.tableColFiller}></View>
      </View>
    </Document>
  );
};
export default UnitMovementRow;
