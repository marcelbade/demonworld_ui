// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, FormGroup, Grid2 as Grid, Button } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// icons
import CustomIcon from "../../components/shared/CustomIcon";
import wedgeFormationIcon from "../../assets/icons/wedgeFormation.png";
import skirmishFormationIcon from "../../assets/icons/skirmishFormation.png";
import squareFormationIcon from "../../assets/icons/squareFormationWhite.png";
// constants
import { CARD_TEXT, COMPENDIUM } from "../../constants/textsAndMessages";

const FormationsAndHordeCreator = () => {
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
  const HEIGHT_WIDTH_ICON = "30px";
  const HEIGHT_WIDTH_SQUARE_ICON = "45px";
  const HEIGHT_WIDTH_SKIRMISH_ICON = "20px";

  const elements = [
    {
      value: CCC.unit.wedgeFormation,
      action: changeWedge,
      name: COMPENDIUM.WEDGEFORMATION,
      icon: wedgeFormationIcon,
      dimension: HEIGHT_WIDTH_ICON,
    },
    {
      value: CCC.unit.skirmishFormation,
      action: changeSkirmish,
      name: COMPENDIUM.SKIRMISHFORMATION,
      icon: skirmishFormationIcon,
      dimension: HEIGHT_WIDTH_SKIRMISH_ICON,
    },
    {
      value: CCC.unit.squareFormation,
      action: changeSquare,
      name: COMPENDIUM.SQUAREFORMATION,
      icon: squareFormationIcon,
      dimension: HEIGHT_WIDTH_SQUARE_ICON,
    },
  ];

  return (
    <Grid
      container //
      alignItems="center"
      justifyContent="center"
      direction="row"
      sx={{
        width: "50em",
      }}
    >
      {elements.map((elmnt, i) => (
        <FormGroup key={i}>
          <FormControlLabel
            control={
              <Checkbox
                checked={!elmnt.value} //
                onChange={elmnt.action}
                inputProps={{ "aria-label": "controlled" }}
                icon={
                  <CustomIcon
                    icon={elmnt.icon} //
                    altText={CARD_TEXT.SQUARE_FORMATION}
                    height={elmnt.dimension}
                    width={elmnt.dimension}
                  />
                }
                checkedIcon={
                  <CustomIcon
                    icon={elmnt.icon} //
                    altText={CARD_TEXT.SQUARE_FORMATION}
                    height={elmnt.dimension}
                    width={elmnt.dimension}
                    checkedBoxIcon={true}
                  />
                }
              />
            }
          />
        </FormGroup>
      ))}
      <Button
        onClick={() => {
          changeHorde();
        }}
        disableRipple
        size="small"
        sx={{
          width: "2em",
          color: CCC.unit.horde ? "black" : "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "orange",
          },
        }}
      >
        {COMPENDIUM.HORDE}
      </Button>
    </Grid>
  );
};

export default FormationsAndHordeCreator;
