import { useContext } from "react";
// material ui
import { Typography, IconButton, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PaymentIcon from "@mui/icons-material/Payment";
// components and functions
import ContextHelpButton from "../../../shared/ContextHelpButton";
//constants
import { PUSH_MESSAGE_TYPES } from "../../../../constants/textsAndMessages";
// contexts
import { SelectionContext } from "../../../../contexts/selectionContext";
// custom hooks
import useArmyValidation from "../../../../customHooks/UseArmyValidation";
import useRightSideMenuController from "../../../../customHooks/UseRightSideMenuController";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";
import { renderDynamicIcons } from "../../../../util/utilityFunctions";
import { AllyContext } from "../../../../contexts/allyContext";

const TreeUnitNode = (props) => {
  const SEC = useContext(SelectionContext);
  const AYC = useContext(AllyContext);

  const theme = useTheme();
  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher();
  const sideMenuController = useRightSideMenuController(
    props.unit, //
    props.unit.subFaction,
    {
      displayCard: true,
      displayItemShop: false,
      secondSubFaction: false,
    }
  );

  /**
   * Function adds a selected unit to the provided array, uses the custom UseUnitEnricher hook to add necessary information to it, and revalidates the the unit selection.
   * @param {unitCard object} unit
   */
  const addUnit = () => {
    let tempArray = [...SEC.selectedUnits];

    tempArray.push(changeSubFactionIfAlly(enrichUnit(props.unit)));
    SEC.setSelectedUnits(tempArray);

    const validationResult = validation.testArmySelectionAndRunValidation(tempArray, SEC.maxPointsAllowance);
    validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);
  };

  /**
   * Function tests whether the unit is an allied unit.
   * If so, the sub faction is replaced with the name of the allied faction.
   * (Since all allied units are simply placed in a sub faction with that name.)
   * @param {unitCard} unit
   * @returns unitCard
   */
  const changeSubFactionIfAlly = (unit) => {
    if (unit.faction === AYC.allyName) {
      unit.subFaction = AYC.allyName;
    }
    return unit;
  };

  /**
   * Function checks whether the unit is valid according to the army's validation rules.
   * If not, it applies the correct css style.
   * @param {boolean} isBlocked
   * @returns true, if unit is a valid choice
   */
  const displayValidNodeStyle = (isBlocked) => {
    const NAME_WIDTH = "65%";
    const NAME_HEIGHT = "50%";
    const style = { minWidth: NAME_WIDTH, NAME_HEIGHT };

    return isBlocked ? { ...style, color: theme.palette.disabled } : style;
  };

  return (
    <Stack>
      <Stack alignItems="center" direction="row">
        <Typography sx={displayValidNodeStyle(!props.isValidUnit)}>{props.unit.unitName}</Typography>
        {/* card preview button */}
        {sideMenuController.buttons.map((b, i) => {
          return (
            <IconButton
              key={i} //
              onClick={b.action}
            >
              <PaymentIcon />
            </IconButton>
          );
        })}
        <IconButton
          onClick={addUnit} //
          disabled={!props.isValidUnit}
        >
          <AddCircleOutlineIcon />
        </IconButton>
        <ContextHelpButton
          isVisible={!props.isValidUnit}
          message={props.validationMessage} //
          type={PUSH_MESSAGE_TYPES.INFO}
        />
      </Stack>
      <Stack alignItems="center" direction="row">
        {
          <Typography
            sx={{
              marginTop: "-0.8em",
              marginRight: "1em",
            }}
          >
            {renderDynamicIcons("*", props.unit.commandStars)}
          </Typography>
        }
        {
          <Typography
            sx={{
              marginTop: "-0.8em", //
            }}
          >
            {renderDynamicIcons("/", props.unit.magic)}
          </Typography>
        }
      </Stack>
      <Typography sx={displayValidNodeStyle(!props.isValidUnit)}>{props.unit.points}</Typography>
    </Stack>
  );
};
export default TreeUnitNode;
