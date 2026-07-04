import { useContext } from "react";
// material ui
import { Typography, IconButton, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
// icons
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
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

const TreeUnitNode = (props) => {
  const SEC = useContext(SelectionContext);

  const theme = useTheme();
  const validation = useArmyValidation();
  const enrichUnit = useUnitEnricher();

  /**
   * Create button for options menu using the custom controller
   */
  const sideMenuController = useRightSideMenuController(
    props.unit, //
    props.unit.subFaction,
    {
      displayCard: true,
      displayItemShop: false,
      secondSubFaction: false,
      displayOptionButtons: false,
    },
  );

  /**
   * Function adds a selected unit to the provided array, uses the custom UseUnitEnricher hook to add necessary information to it, and revalidates the the unit selection.
   * @param {unitCard object} unit
   */
  const addUnit = () => {
    let tempArray = [...SEC.selectedUnits];

    tempArray.push(enrichUnit(props.unit));

    const validationResult = validation.testArmySelectionAndRunValidation(tempArray, SEC.maxPointsAllowance);
    validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);

    SEC.setSelectedUnits(tempArray);
  };

  /**
   * Function checks whether the unit is valid according to the army's validation rules.
   * If not, it applies the correct css style.
   * @param {boolean} isBlocked
   * @returns true, if unit is a valid choice
   */
  const switchNodeStyle = (isBlocked) => {
    const NAME_WIDTH = "65%";
    const style = { minWidth: NAME_WIDTH };

    return isBlocked ? { ...style, color: theme.palette.disabled } : style;
  };

  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Typography
          variant="body1"
          sx={switchNodeStyle(!props.isValidUnit)} //
        >
          {props.unit.unitName}
        </Typography>
        <Stack alignItems="center" direction="row">
          {/* card preview button */}
          <IconButton
            onClick={()=>{sideMenuController.buttons[0].action()  }} //
          >
            {sideMenuController.buttons[0].icon}
          </IconButton>
          {/* add unit button */}
          <IconButton
            onClick={addUnit} //
            disabled={!props.isValidUnit}
          >
            <AddCircleOutlinedIcon />
          </IconButton>
          {/* error message button */}
          <ContextHelpButton
            isVisible={!props.isValidUnit}
            message={props.validationMessage} //
            type={PUSH_MESSAGE_TYPES.INFO}
          />
        </Stack>
      </Stack>
      <Stack alignItems="center" direction="row">
        {
          <Typography
            variant="body1"
            sx={{
              marginTop: { xs: "0", md: "-0.8em" },
              marginRight: "1em",
            }}
          >
            {renderDynamicIcons("*", props.unit.commandStars)}
          </Typography>
        }
        {
          <Typography variant="body1" sx={{}}>
            {renderDynamicIcons("/", props.unit.magic)}
          </Typography>
        }
      </Stack>
      <Typography
        variant="body1" //
        sx={{ ...switchNodeStyle(!props.isValidUnit), paddingBottom: "2em" }}
      >
        {props.unit.points}
      </Typography>
    </>
  );
};
export default TreeUnitNode;
