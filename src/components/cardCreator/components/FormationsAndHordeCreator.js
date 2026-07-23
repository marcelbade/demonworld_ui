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
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].wedgeFormation = !CCC.unitCards[CCC.displayedElement].wedgeFormation;

    CCC.setUnitCards(tempArray);
  };

  const changeSkirmish = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].skirmishFormation = !CCC.unitCards[CCC.displayedElement].skirmishFormation;

    CCC.setUnitCards(tempArray);
  };

  const changeSquare = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].squareFormation = !CCC.unitCards[CCC.displayedElement].squareFormation;

    CCC.setUnitCards(tempArray);
  };

  const changeHorde = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].horde = !CCC.unitCards[CCC.displayedElement].horde;

    CCC.setUnitCards(tempArray);
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
      value: CCC.unitCards[CCC.displayedElement].wedgeFormation,
      action: changeWedge,
      icon: wedgeFormationIcon,
      height: HEIGHT_WEDGE_ICON,
      width: WIDTH_WEDGE_ICON,
      label: CREATOR.WEDGE_FORMATION,
      disabled: CCC.unitCards[CCC.displayedElement].horde,
      disabledMessage: CREATOR.NO_FORMATION_FOR_HORDES,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].skirmishFormation,
      action: changeSkirmish,
      icon: skirmishFormationIcon,
      height: HEIGHT_SKIRMISH_ICON,
      width: WIDTH_SKIRMISH_ICON,
      label: CREATOR.SKIRMISH_FORMATION,
      disabled: CCC.unitCards[CCC.displayedElement].horde,
      disabledMessage: CREATOR.NO_FORMATION_FOR_HORDES,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].squareFormation,
      action: changeSquare,
      icon: squareFormationIcon,
      height: HEIGHT_SQUARE_ICON,
      width: WIDTH_SQUARE_ICON,
      label: CREATOR.SQUARE_FORMATION,
      disabled: CCC.unitCards[CCC.displayedElement].horde,
      disabledMessage: CREATOR.NO_FORMATION_FOR_HORDES,
    },
    {
      value: CCC.unitCards[CCC.displayedElement].horde,
      action: changeHorde,
      icon: hordeIcon,
      height: HEIGHT_HORDE_ICON,
      width: WIDTH_HORDE_ICON,
      label: CREATOR.IS_HORDE,
      disabled:
        CCC.unitCards[CCC.displayedElement].wedgeFormation ||
        CCC.unitCards[CCC.displayedElement].skirmishFormation ||
        CCC.unitCards[CCC.displayedElement].squareFormation,
      disabledMessage: CREATOR.NO_HORDES_WHEN_FORMATIONS,
    },
  ];

  return CCC.unitCards[CCC.displayedElement].unitType === UNIT ? (
    <Grid
      container //
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        ...theme.palette.cardCreator.box,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      {elements.map((elmnt, i) => (
        <Tooltip title={elmnt.label} key={i}>
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
