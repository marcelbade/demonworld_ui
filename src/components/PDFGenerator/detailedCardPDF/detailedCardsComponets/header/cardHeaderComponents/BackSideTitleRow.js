// react
import React from "react";
// react-pdf
import { Image, Text, View } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../../../shared/sharedFunctions";
// icons
import SeparatorIcon from "../../../../../../icons/d20.png";
import DotIcon from "../../../../../../icons/dot.png";

// styles
import styles from "../../../../pdfStyles/detailedCardPdfStyles";

const BackSideTitleRow = (props) => {
  return (
    <View key={uuidGenerator()} style={styles.headerRow}>
      <Text key={uuidGenerator()}> </Text>

      {props.unit.subFaction !== props.unit.secondSubFaction ? ( //
        <View>
          <Text> {props.unit.faction}</Text>
          <Text>{props.unit.secondSubFaction}</Text>
        </View>
      ) : (
        <Text> {props.unit.faction}</Text>
      )}
      <Text key={uuidGenerator()}> </Text>
    </View>
  );
};
export default BackSideTitleRow;
