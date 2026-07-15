// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, FormGroup, Grid, useTheme, Tooltip } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// icons
import CustomIcon from "../../shared/CustomIcon";
import wedgeFormationIcon from "../../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../../assets/icons/squareFormation.png";
import hordeIcon from "../../../assets/icons/horde.png";
// constants
import { CARD_TEXT, CREATOR, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";
import { UNIT } from "../../../constants/unitTypes";
// custom hooks
import usePushMessages from "../../../customHooks/UsePushMessages";

const FormationsAndHordeCreator = () => {
  const theme = useTheme();

  const pushMessages = usePushMessages();

  const CCC = useContext(CardCreationContext);

  const changeWedge = () => {
    CCC.setUnit({ ...CCC.unit, wedgeFormation: !CCC.unit.wedgeFormation });
  };

  const changeSkirmish = () => {
    CCC.setUnit({ ...CCC.unit, skirmishFormation: !CCC.unit.skirmishFormation });
  };

  const changeSquare = () => {
    CCC.setUnit({ ...CCC.unit, squareFormation: !CCC.unit.squareFormation });
  };

  const changeHorde = () => {
    CCC.setUnit({ ...CCC.unit, horde: !CCC.unit.horde });
  };

  /**
   *
   * @param {boolean} isDisabled
   * @param {String} message
   * @returns
   */
  const displayErrorIfDisabled = (isDisabled, message) => {
    if (!isDisabled) {
      return;
    }

    pushMessages.showSnackBar(message, PUSH_MESSAGE_TYPES.ERROR);
  };

  // icon sizes
  const HEIGHT_WEDGE_ICON = "90%";
  const WIDTH_WEDGE_ICON = "90%";
  //
  const HEIGHT_SQUARE_ICON = "100%";
  const WIDTH_SQUARE_ICON = "90%";
  //
  const HEIGHT_SKIRMISH_ICON = "20px";
  const WIDTH_SKIRMISH_ICON = "20px";
  //
  const HEIGHT_HORDE_ICON = "135%";
  const WIDTH_HORDE_ICON = "170%";

  const elements = [
    {
      value: CCC.unit.wedgeFormation,
      action: changeWedge,
      icon: wedgeFormationIcon,
      height: HEIGHT_WEDGE_ICON,
      width: WIDTH_WEDGE_ICON,
      label: CREATOR.WEDGE_FORMATION,
      disabled: CCC.unit.horde,
      disabledMessage: CREATOR.NO_FORMATION_FOR_HORDES,
    },
    {
      value: CCC.unit.skirmishFormation,
      action: changeSkirmish,
      icon: skirmishFormationIcon,
      height: HEIGHT_SKIRMISH_ICON,
      width: WIDTH_SKIRMISH_ICON,
      label: CREATOR.SKIRMISH_FORMATION,
      disabled: CCC.unit.horde,
      disabledMessage: CREATOR.NO_FORMATION_FOR_HORDES,
    },
    {
      value: CCC.unit.squareFormation,
      action: changeSquare,
      icon: squareFormationIcon,
      height: HEIGHT_SQUARE_ICON,
      width: WIDTH_SQUARE_ICON,
      label: CREATOR.SQUARE_FORMATION,
      disabled: CCC.unit.horde,
      disabledMessage: CREATOR.NO_FORMATION_FOR_HORDES,
    },
    {
      value: CCC.unit.horde,
      action: changeHorde,
      icon: hordeIcon,
      height: HEIGHT_HORDE_ICON,
      width: WIDTH_HORDE_ICON,
      label: CREATOR.IS_HORDE,
      disabled: CCC.unit.wedgeFormation || CCC.unit.skirmishFormation || CCC.unit.squareFormation,
      disabledMessage: CREATOR.NO_HORDES_WHEN_FORMATIONS,
    },
  ];

  return CCC.unit.unitType === UNIT ? (
    <Grid
      container //
      alignItems="center"
      direction="row"
      sx={{
        justifyContent: "center",
        ...theme.palette.cardCreator.box,
      }}
    >
      {elements.map((elmnt, i) => (
        <Tooltip title={elmnt.label}>
          <div
            onClick={() => {
              displayErrorIfDisabled(elmnt.disabled, elmnt.disabledMessage);
            }}
          >
            <FormGroup key={i}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={elmnt.disabled}
                    checked={!elmnt.value} //
                    onChange={elmnt.action}
                    sx={{ width: "4em", height: "4em" }}
                    icon={
                      <CustomIcon
                        icon={elmnt.icon} //
                        altText={CARD_TEXT.SQUARE_FORMATION}
                        height={elmnt.height}
                        width={elmnt.width}
                      />
                    }
                    checkedIcon={
                      <CustomIcon
                        icon={elmnt.icon} //
                        altText={CARD_TEXT.SQUARE_FORMATION}
                        height={elmnt.height}
                        width={elmnt.width}
                        checkedBoxIcon={true}
                      />
                    }
                  />
                }
              />
            </FormGroup>
          </div>
        </Tooltip>
      ))}
    </Grid>
  ) : null;
};

export default FormationsAndHordeCreator;
