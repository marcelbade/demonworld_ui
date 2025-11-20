// react-pdf
import { View, Document, Text, Font } from "@react-pdf/renderer";
// fonts
import notMaryKate from "../../assets/fonts/notMaryKate.ttf";

// Register font
Font.register({ family: "notMaryKate", src: notMaryKate });

const SpellListPdf = (props) => {
  return (
    <Document>
      {props.data.map((s, i) => (
        <View key={i}>
          <Text>{s.spellName}</Text>
        </View>
      ))}
    </Document>
  );
};

export default SpellListPdf;
