// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, FormGroup, Grid2 as Grid, Button, useTheme, Tooltip } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// icons
import CustomIcon from "../../shared/CustomIcon";
import wedgeFormationIcon from "../../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../../assets/icons/squareFormation.png";
// constants
import { CARD_TEXT, COMPENDIUM, CREATOR } from "../../../constants/textsAndMessages";
import { UNIT } from "../../../constants/unitTypes";

const FormationsAndHordeCreator = () => {
  const theme = useTheme();

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

  // icon sizes
  const HEIGHT_WEDGE_ICON = "90%";
  const WIDTH_WEDGE_ICON = "90%";
  //
  const HEIGHT_SQUARE_ICON = "100%";
  const WIDTH_SQUARE_ICON = "90%";
  //
  const HEIGHT_SKIRMISH_ICON = "20px";
  const WIDTH_SKIRMISH_ICON = "20px";

  const elements = [
    {
      value: CCC.unit.wedgeFormation,
      action: changeWedge,
      name: COMPENDIUM.WEDGEFORMATION,
      icon: wedgeFormationIcon,
      height: HEIGHT_WEDGE_ICON,
      width: WIDTH_WEDGE_ICON,
      label: CREATOR.WEDGE_FORMATION,
    },
    {
      value: CCC.unit.skirmishFormation,
      action: changeSkirmish,
      name: COMPENDIUM.SKIRMISHFORMATION,
      icon: skirmishFormationIcon,
      height: HEIGHT_SKIRMISH_ICON,
      width: WIDTH_SKIRMISH_ICON,
      label: CREATOR.SKIRMISH_FORMATION,
    },
    {
      value: CCC.unit.squareFormation,
      action: changeSquare,
      name: COMPENDIUM.SQUAREFORMATION,
      icon: squareFormationIcon,
      height: HEIGHT_SQUARE_ICON,
      width: WIDTH_SQUARE_ICON,
      label: CREATOR.SQUARE_FORMATION,
    },
  ];

  return CCC.unit.unitType === UNIT ? (
    <Grid
      container //
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={{
        ...theme.palette.cardCreator.box,
      }}
    >
      {elements.map((elmnt, i) => (
        <Tooltip title={elmnt.label}>
          <FormGroup key={i}>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={CCC.unit.horde}
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
        </Tooltip>
      ))}
      <Button
        variant="outlined"
        disabled={CCC.unit.wedgeFormation || CCC.unit.skirmishFormation || CCC.unit.squareFormation}
        onClick={() => {
          changeHorde();
        }}
      >
        {COMPENDIUM.HORDE}
      </Button>
    </Grid>
  ) : null;
};

export default FormationsAndHordeCreator;
