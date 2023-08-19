// react
import React from "react";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../../../fonts/notMaryKate.ttf";
import Beryliumbold from "../../../../fonts/Beryliumbold.ttf";
// functions and components
import { uuidGenerator } from "../../../shared/sharedFunctions";
// styles
import styles from "../../pdfStyles/detailedCardPdfStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });
Font.register({ family: "Beryliumbold", src: Beryliumbold });

const SubfactionSubtitle = (props) => {
  return (
    <Document>
      <View key={uuidGenerator()} style={styles.tableRowSubFactionName}>
        <View key={uuidGenerator()} style={styles.tableColSubFactionName}>
          <Text style={styles.tableCellSubFactioName}>{props.subFaction}</Text>
        </View>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
