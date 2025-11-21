// react-pdf
import { View, Document, Text, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../assets/fonts/notMaryKate.ttf";
import { spellStyles } from "./spellPdfStyles/spellPdfStyles";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

const SpellListPdf = (props) => {
  return (
    <Document>
      {props.data.map((s, i) => (
        <View key={i} wrap={false} >
          <Text style={spellStyles.title}>{s.spellName}</Text>
          <Text style={spellStyles.spellText}>{s.spellTier}</Text>
          <Text style={spellStyles.subTitle}>Effekt</Text>
          <Text style={spellStyles.spellText}>{s.effect}</Text>
          <Text style={spellStyles.subTitle}>Dauer</Text>
          <Text style={spellStyles.spellText}>{s.duration}</Text>
          <Text style={spellStyles.subTitle}>Voraussetzung</Text>
          <Text style={spellStyles.spellText}>{s.requirements}</Text>
          <Text style={spellStyles.subTitle}>Ziel</Text>
          <Text style={spellStyles.spellText}>{s.target}</Text>
        </View>
      ))}
    </Document>
  );
};

export default SpellListPdf;
