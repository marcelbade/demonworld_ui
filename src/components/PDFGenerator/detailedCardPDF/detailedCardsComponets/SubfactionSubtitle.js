// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";

const SubfactionSubtitle = (props) => {
  return (
    <Document>
      <View key={props.subFaction}>
        <Text>{props.subFaction}</Text>
      </View>
    </Document>
  );
};
export default SubfactionSubtitle;
