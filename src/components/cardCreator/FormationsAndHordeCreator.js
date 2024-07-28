// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// icons
import CustomIcon from "../../components/shared/statCards/CustomIcon";
import wedgeFormationIcon from "../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../assets/icons/squareFormationWhite.png";
import { CARD_TEXT } from "../../constants/textsAndMessages";

const FormationsAndHordeCreator = () => {
  const CCC = useContext(CardCreationContext);

  const changeWedge = () => {
    CCC.setWedge((prevState) => !prevState);
  };

  const changeSkirmish = () => {
    CCC.setSkirmishFormation((prevState) => !prevState);
  };

  const changeSquare = () => {
    CCC.setSquare((prevState) => !prevState);
  };
  const changeHorde = () => {
    CCC.setHorde((prevState) => !prevState);
  };

  // icon sizes
  const HEIGHT_WIDTH_ICON = "30px";
  const HEIGHT_WIDTH_SQUARE_ICON = "45px";
  const HEIGHT_WIDTH_SKIRMISH_ICON = "20px";

  const elements = [
    {
      value: CCC.wedge,
      action: changeWedge,
      name: "Keilformation",
      icon: (
        <CustomIcon
          icon={wedgeFormationIcon} //
          altText={CARD_TEXT.WEDGE_FORMATION}
          height={HEIGHT_WIDTH_ICON}
          width={HEIGHT_WIDTH_ICON}
        />
      ),
      checkedIcon: (
        <CustomIcon
          icon={wedgeFormationIcon} //
          altText={CARD_TEXT.WEDGE_FORMATION}
          height={HEIGHT_WIDTH_ICON}
          width={HEIGHT_WIDTH_ICON}
          checkedBoxIcon={true}
        />
      ),
    },
    {
      value: CCC.skirmishFormation,
      action: changeSkirmish,
      name: "Plänkelformation",
      icon: (
        <CustomIcon
          icon={skirmishFormationIcon} //
          altText={CARD_TEXT.SKIRMISH_FORMATION}
          height={HEIGHT_WIDTH_SKIRMISH_ICON}
          width={HEIGHT_WIDTH_SKIRMISH_ICON}
        />
      ),
      checkedIcon: (
        <CustomIcon
          icon={skirmishFormationIcon} //
          altText={CARD_TEXT.SKIRMISH_FORMATION}
          height={HEIGHT_WIDTH_SKIRMISH_ICON}
          width={HEIGHT_WIDTH_SKIRMISH_ICON}
          checkedBoxIcon={true}
        />
      ),
    },
    {
      value: CCC.square,
      action: changeSquare,
      name: "Karreeformation",
      icon: (
        <CustomIcon
          icon={squareFormationIcon} //
          altText={CARD_TEXT.SQUARE_FORMATION}
          height={HEIGHT_WIDTH_SQUARE_ICON}
          width={HEIGHT_WIDTH_SQUARE_ICON}
        />
      ),
      checkedIcon: (
        <CustomIcon
          icon={squareFormationIcon} //
          altText={CARD_TEXT.SQUARE_FORMATION}
          height={HEIGHT_WIDTH_SQUARE_ICON}
          width={HEIGHT_WIDTH_SQUARE_ICON}
          checkedBoxIcon={true}
        />
      ),
    },
    {
      value: CCC.horde,
      action: changeHorde,
      name: "Horde",
      icon: <CustomIcon />,
      checkedIcon: <CustomIcon />,
    },
  ];

  return (
    <Grid
      container //
      direction="row"
      sx={{
        width: "max-content",
      }}
    >
      {elements.map((elmnt) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={elmnt.value} //
                onChange={elmnt.action}
                inputProps={{ "aria-label": "controlled" }}
                icon={elmnt.icon}
                checkedIcon={elmnt.checkedIcon}
              />
            }
          />
        </FormGroup>
      ))}
    </Grid>
  );
};

export default FormationsAndHordeCreator;
