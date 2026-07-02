// react-pdf
import { Text, View, Image } from "@react-pdf/renderer";
// functions and components
import {
  isGiantOrAutomaton,
  isHeroMageOrSingleSummon,
  isUnitOrSummonedUnit,
  isSummonsWithMaxFields,
} from "../../../../../../gameLogic/unitStatChangeLogic/unitMovementConditions";
import {
  renderManeuvers,
  renderHorde,
  renderMaxFields,
  renderOverrunValue,
  renderMovementLargeElements,
  renderMovementpoints,
  renderControlzone,
  renderUnitMovement,
} from "./../../../../../../gameLogic/cardStatRenderFunctions/movementStatSetters";

// icons
import squareFormationWhite from "../../../../../../assets/icons/squareFormation.png";
import skirmishFormation from "../../../../../../assets/icons/skirmishFormation.png";
import wedgeFormation from "../../../../../../assets/icons/wedgeFormation_white.png";
import shieldWallFormation from "../../../../../../assets/icons/icons8-shield-white.png";
// styles
import { detailedStyles } from "../../../../pdfStyles/detailedCardPdfStyles";

const UnitMovementRow = (props) => {
  const SKIRMISH_FORMATION = props.unit.skirmishFormation ? ( //
    <Image src={skirmishFormation} style={detailedStyles.icon} />
  ) : null;

  const SQUARE_FORMATION = props.unit.squareFormation ? ( //
    <Image src={squareFormationWhite} style={detailedStyles.squareFormationIcon} />
  ) : null;

  const WEDGE_FORMATION = props.unit.wedgeFormation ? ( //
    <Image src={wedgeFormation} style={detailedStyles.wedgeIcon} />
  ) : null;

  const SHIELD_WALL_FORMATION = props.unit.shieldWallFormation ? ( //
    <Image src={shieldWallFormation} style={detailedStyles.shieldWallFormationIcon} />
  ) : null;

  /**
   * Function decides whether the formation mut be displayed by checking if one of the properties is not null.
   * @returns true, if any of the formation properties is not null
   */
  return (
    <View
      key={props.index} //
      style={detailedStyles.cardBlackRow}
    >
      {isHeroMageOrSingleSummon(props.unit) ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} key={props.index}>
            {renderMovementpoints(props.unit)}
          </Text>
          {props.unit.controlZone > 1 ? <Text variant="h6">{renderControlzone(props.unit)}</Text> : null}
        </View>
      ) : null}

      {isGiantOrAutomaton(props.unit) ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} variant="h6">
            {renderMovementLargeElements(props.unit)}
          </Text>
          {props.unit.overRun > 0 ? (
            <Text style={detailedStyles.movementText} variant="h6">
              {renderOverrunValue(props.unit)}
            </Text>
          ) : null}
        </View>
      ) : null}
      {isUnitOrSummonedUnit(props.unit) ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} key={props.index}>
            {renderUnitMovement(props.unit)}
          </Text>
          <Text style={detailedStyles.movementText} key={props.index}>
            {renderManeuvers(props.unit)}
          </Text>
          <View style={detailedStyles.formations}>
            {SKIRMISH_FORMATION} {/*###*/}
            {SQUARE_FORMATION}
            {WEDGE_FORMATION}
            {SHIELD_WALL_FORMATION}
            {renderHorde(props.unit)}
          </View>
        </View>
      ) : null}
      {isSummonsWithMaxFields(props.unit) ? (
        <View style={detailedStyles.cardUpperBlackRowVariant}>
          <Text style={detailedStyles.movementText} key={props.index}>
            {renderMaxFields(props.unit)}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export default UnitMovementRow;
