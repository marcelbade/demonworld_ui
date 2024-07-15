// react
import React from "react";
// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// functions and components
import { isHeroOrMage, isSingleElementCard } from "../../../../../../util/utilityFunctions";
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";
// icons
import squareFormationWhite from "../../../../../../assets/icons/squareFormationWhite.png";
import skirmishFormation from "../../../../../../assets/icons/skirmishFormation.png";
import wedgeFormation from "../../../../../../assets/icons/wedgeFormation.png";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const UnitMovementRow = (props) => {
  const HERO_MAGE_MOVEMENT = `${props.unit.move} ${CARD_TEXT.MOVEMENT_POINTS}`;

  const UNIT_MOVEMENT =
    `${CARD_TEXT.MOVE}: ${props.unit.move} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${props.unit.skirmish} ` +
    `/ ${CARD_TEXT.CHARGE}: ${props.unit.charge}`;

  const MANEUVERS = `${props.unit.hold_maneuvers} ${CARD_TEXT.MANEUVER}`;

  const SKIRMISH_FORMATION = props.unit.skirmishFormation ? ( //
    <Image src={skirmishFormation} style={detailedStyles.icon} />
  ) : null;

  const SQUARE_FORMATION = props.unit.squareFormation ? ( //
    <Image src={squareFormationWhite} style={detailedStyles.squareFormationIcon} />
  ) : null;

  const WEDGE_FORMATION = props.unit.wedgeFormation ? ( //
    <Image src={wedgeFormation} style={detailedStyles.wedgeIcon} />
  ) : null;

  const HORDE_FORMATION = props.unit.horde ? CARD_TEXT.HORDE : null;
  const OVERRUN = `${CARD_TEXT.OVERRUN}: ${props.unit.overRun}` > 0;

  console.log(`${CARD_TEXT.OVERRUN}: ${props.unit.overRun}`);

  /**
   * Function decides whether the formation mut be displayed by checking if one of the properties is not null.
   * @returns true, if any of the formation properties is not null
   */
  return isSingleElementCard(props.unit) && isHeroOrMage(props.unit) ? (
    <View
      key={props.index} //
      style={detailedStyles.cardUpperBlackRow}
    >
      <Text key={props.index}>{HERO_MAGE_MOVEMENT}</Text>
    </View>
  ) : (
    <View
      key={props.index} //
      style={detailedStyles.cardUpperBlackRow}
    >
      <Text key={props.index}>{UNIT_MOVEMENT}</Text>
      <Text key={props.index}>{MANEUVERS}</Text>
      <View
        key={props.index} //
        style={detailedStyles.formations}
      >
        {OVERRUN}
        {SKIRMISH_FORMATION}
        {SQUARE_FORMATION}
        {WEDGE_FORMATION}
        {HORDE_FORMATION}

        <Text key={props.index}> {HORDE_FORMATION}</Text>
      </View>
    </View>
  );
};
export default UnitMovementRow;
