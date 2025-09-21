// react-pdf
import { Text, View } from "@react-pdf/renderer";
// detailedStyles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
//  icons
import rangeArmorIcon from "../../../../../assets/icons/range-armor.png";
import meleeArmorIcon from "../../../../../assets/icons/melee-armor.png";
import blackSwordIcon from "../../../../../assets/icons/sword2.png";
import blackBowIcon from "../../../../../assets/icons/bow2.png";
// pdf components
import PdfStatCardIcon from "../../../../pdfStatCardIcon";
// constants
import { ARMOUR_RANGE, ARMOUR_MELEE, SKILL_MELEE, SKILL_RANGE } from "../../../../../constants/stats";
import { CARD_TEXT } from "../../../../../constants/textsAndMessages";

const SizeArmorSkillRow = (props) => {
  const SIZE = `${CARD_TEXT.SIZE} ${props.unit.unitSize}`;

  const armorIcons = [
    {
      display: true, //
      icon: rangeArmorIcon,
      stat: ARMOUR_RANGE,
    },
    {
      display: true, //
      icon: meleeArmorIcon,
      stat: ARMOUR_MELEE,
    },
  ];
  const skillIcons = [
    {
      display: props.unit.skillMelee !== 0,
      icon: blackSwordIcon,
      stat: SKILL_MELEE,
    },
    {
      display: props.unit.skillRange !== 0,
      icon: blackBowIcon,
      stat: SKILL_RANGE,
    },
  ];

  return (
    <View key={props.index} style={detailedStyles.sizeArmorSkillBox}>
      <Text key={props.index}>{SIZE}</Text>
      <View style={detailedStyles.armorIconValueGroup}>
        {armorIcons.map((elmnt, i) => (
          <PdfStatCardIcon
            key={i} //
            display={elmnt.display}
            icon={elmnt.icon}
            unit={props.unit}
            stat={elmnt.stat}
          />
        ))}
      </View>
      <View style={detailedStyles.skillGroup}>
        {skillIcons.map((elmnt, i) => (
          <PdfStatCardIcon
            key={i} //
            display={elmnt.display}
            icon={elmnt.icon}
            unit={props.unit}
            stat={elmnt.stat}
          />
        ))}
      </View>
    </View>
  );
};
export default SizeArmorSkillRow;
