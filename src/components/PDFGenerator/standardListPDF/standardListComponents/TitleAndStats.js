// react
import React from "react";
// react-pdf
import { Text, View, Document } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../../pdfStyles/commonStyles";
import { STATS } from "../../../../constants/textsAndMessages";

const TitleAndStats = (props) => {
  return (
    <Document>
      <View style={commonStyles.armyName}>
        <Text> {props.armyName} </Text>
      </View>
      <View style={commonStyles.armyStatsBox}>
        <Text style={commonStyles.armyStats}> {`${STATS.POINTS}: ${9999}`} </Text>
        <Text style={commonStyles.armyStats}>{`${STATS.SCOUT_FACTOR}: ${50}`} </Text>
      </View>
    </Document>
  );
};
export default TitleAndStats;
