// react
import React from "react";
// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// functions and components
import { CARD_TEXT } from "../../../../../../constants/textsAndMessages";
// icons
import squareFormationWhite from "../../../../../../assets/icons/squareFormationWhite.png";
import skirmishFormation from "../../../../../../assets/icons/skirmishFormation.png";
import wedgeFormation from "../../../../../../assets/icons/wedgeFormation.png";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";
import { MAGE, HERO, GIANT, UNIT, SUMMONED, AUTOMATON } from "../../../../../../constants/unitTypes";

const UnitMovementRow = (props) => {
  // heroes and magic user
  const HERO_MAGE_MOVEMENT = `${props.unit.move} ${CARD_TEXT.MOVEMENT_POINTS}`;

  // infantry and cavalry
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
  const CONTROLZONE = `${CARD_TEXT.CONTROL_AREA}: ${props.unit.controlZone}`;
  const OVERRUN_LARGE = `${CARD_TEXT.OVERRUN}: ${props.unit.overRun}`;

  // large elements
  const MOVEMENT_LARGE =
    `${CARD_TEXT.MOVE}: ${props.unit.move} ` +
    `/ ${CARD_TEXT.CHARGE}: ${props.unit.charge} ` +
    `/ ${CARD_TEXT.SKIRMISH}: ${props.unit.skirmish} ` +
    `/ ${CARD_TEXT.HOLD}: ${props.unit.hold_maneuvers}`;

  // summons
  const MAX_FIELDS = `${CARD_TEXT.MAX_FIELDS_MOVE(props.unit.move)}`;

  /**
   * Function decides whether the formation mut be displayed by checking if one of the properties is not null.
   * @returns true, if any of the formation properties is not null
   */
  return (
    <View
      key={props.index} //
      style={detailedStyles.cardUpperBlackRow}
    >
      {props.unit.unitType === HERO ||
      props.unit.unitType === MAGE ||
      (props.unit.unitType === SUMMONED && props.unit.numberOfElements === 1 && !props.unit.maxFieldsMove) ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} key={props.index}>
            {HERO_MAGE_MOVEMENT}
          </Text>
          {props.unit.controlZone > 1 ? <Text variant="h6">{CONTROLZONE}</Text> : null}
        </View>
      ) : null}

      {props.unit.unitType === GIANT || props.unit.unitType === AUTOMATON ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} variant="h6">
            {MOVEMENT_LARGE}
          </Text>
          {props.unit.overRun > 0 ? (
            <Text style={detailedStyles.movementText} variant="h6">
              {OVERRUN_LARGE}
            </Text>
          ) : null}
        </View>
      ) : null}
      {props.unit.unitType === UNIT ||
      (props.unit.unitType === SUMMONED && props.unit.numberOfElements > 1 && !props.unit.maxFieldsMove) ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} key={props.index}>
            {UNIT_MOVEMENT}
          </Text>
          <Text style={detailedStyles.movementText} key={props.index}>
            {MANEUVERS}
          </Text>
          {SKIRMISH_FORMATION}
          {SQUARE_FORMATION}
          {WEDGE_FORMATION}
          {HORDE_FORMATION}
        </View>
      ) : null}
      {props.unit.unitType === SUMMONED && props.unit.maxFieldsMove ? (
        <Text style={detailedStyles.movementText} key={props.index}>
          {MAX_FIELDS}
        </Text>
      ) : null}
    </View>
  );
};
export default UnitMovementRow;
