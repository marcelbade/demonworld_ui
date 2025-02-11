import React, { useContext } from "react";
// material ui
import { Typography, Grid, IconButton } from "@mui/material";
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
import useRightSideMenuController from "../../../../customHooks/useRightSideMenuController";
import useUnitEnricher from "../../../../customHooks/UseUnitEnricher";

const TreeUnitNode = (props) => {
  const SEC = useContext(SelectionContext);

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

    tempArray.push(enrichUnit(props.unit));
    SEC.setSelectedUnits(tempArray);

    const validationResult = validation.validateList(tempArray, SEC.maxPointsAllowance);
    validation.testForDisabledSubFaction(validationResult.unitsBlockedbyRules);
  };

  /**
   * Function checks whether the unit is valid according to the army's validation rules.
   * If not, it applies the correct css style.
   * @param {boolean} isBlocked
   * @returns true, if unit is a valid choice
   */
  const displayValidNodeStyle = (isBlocked) => {
    const NAME_WIDTH = "25em";
    const style = { minWidth: NAME_WIDTH };

    return isBlocked ? { ...style, color: theme.palette.disabled } : style;
  };

  return (
    <Grid
      container //
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      item
      xs={12}
      sx={{ minWidth: "35em" }}
    >
      <Grid
        item //
        container
        direction="row"
        sx={{
          alignItems: "center", //
        }}
      >
        <Typography
          variant="button" //
          align="left"
          sx={displayValidNodeStyle(!props.isValidUnit)}
        >
          {props.unit.unitName}
        </Typography>
        <Typography
          variant="button" //
          align="left"
          sx={{ minWidth: "3em" }}
        >
          {props.unit.points}
        </Typography>
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
          size="large"
        >
          <AddCircleOutlineIcon />
        </IconButton>

        {!props.isValidUnit ? (
          <ContextHelpButton
            message={props.validationMessage} //
            type={PUSH_MESSAGE_TYPES.ERROR}
          />
        ) : null}
      </Grid>
    </Grid>
  );
};
export default TreeUnitNode;
