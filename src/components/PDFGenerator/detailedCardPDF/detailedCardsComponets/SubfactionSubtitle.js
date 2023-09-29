// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// functions and components
import { uuidGenerator } from "../../../shared/sharedFunctions";
// styles
import styles from "../../pdfStyles/detailedCardPdfStyles";

const SubfactionSubtitle = (props) => {
  return (
    <Document>
      <View key={uuidGenerator()} style={styles.subFactionName}>
        <Text style={styles.subFactioName}>{props.subFaction}</Text>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
