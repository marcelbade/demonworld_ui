// fonts
import jaapokkiRegular from "../../../assets/fonts/jaapokkiRegular.ttf";
// react-pdf
import { Text, View, Document, Font } from "@react-pdf/renderer";
// styles
import { commonUnitStyles } from "../pdfStyles/commonUnitStyles";
import { STATS, INPUT_TEXTS } from "../../../constants/textsAndMessages";

// Register font
Font.register({ family: "jaapokkiRegular", src: jaapokkiRegular });

const TitleAndStats = (props) => {
  return (
    <Document>
      <View style={commonUnitStyles.armyStatsBox}>
        <Text style={commonUnitStyles.armyStats}>{`${INPUT_TEXTS.PLAYER_NAME}: ${props.data.playerName}`} </Text>

        {props.data.teamName === null ? null : (
          <Text style={commonUnitStyles.armyStats}>{`${INPUT_TEXTS.TEAM_NAME}: ${props.data.teamName}`} </Text>
        )}

        {props.data.totalArmyPoints === null ? null : (
          <Text style={commonUnitStyles.armyStats}>{`${STATS.POINTS}: ${props.data.totalArmyPoints}`} </Text>
        )}

        {props.data.scoutingFactor === null ? null : (
          <Text style={commonUnitStyles.armyStats}>{`${STATS.SCOUTING_FACTOR}: ${props.data.scoutingFactor}`} </Text>
        )}
      </View>
    </Document>
  );
};
export default TitleAndStats;
