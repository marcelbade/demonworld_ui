// react
import React from "react";
// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// styles
import { commonStyles } from "../pdfStyles/commonStyles";
import { STATS, INPUT_TEXTS } from "../../../constants/textsAndMessages";

// Register font
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const TitleAndStats = (props) => {
  return (
    <Document>
      <View style={commonStyles.armyStatsBox}>
        <Text style={commonStyles.armyStats}>{`${INPUT_TEXTS.PLAYER_NAME}: ${props.data.playerName}`} </Text>
        <Text style={commonStyles.armyStats}>{`${INPUT_TEXTS.TEAM_NAME}: ${props.data.teamName}`} </Text>
        <Text style={commonStyles.armyStats}>{`${STATS.POINTS}: ${props.data.totalArmyPoints}`} </Text>
        <Text style={commonStyles.armyStats}>{`${STATS.SCOUT_FACTOR}: ${props.data.scoutingFactor}`} </Text>
      </View>
    </Document>
  );
};
export default TitleAndStats;
