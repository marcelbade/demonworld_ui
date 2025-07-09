// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../components/PDFGenerator/pdfStyles/detailedCardPdfStyles";
// components and functions
import { setUnitStat } from "../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";

const PdfStatCardIcon = (props) => {
  const iconValueStyle = detailedStyles.iconValueGroup;
  const iconStyle = detailedStyles.icon;

  const stat = setUnitStat(props.unit, props.stat);

  return props.display ? (
    <View style={iconValueStyle}>
      <Image src={props.icon} style={iconStyle} />
      <Text>{stat}</Text>
    </View>
  ) : null;
};

export default PdfStatCardIcon;
