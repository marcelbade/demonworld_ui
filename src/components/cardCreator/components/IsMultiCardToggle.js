// react
import { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, FormGroup, useTheme } from "@mui/material";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";
import { Grid } from "@mui/system";
// context
import { CardCreationContext } from "../../../contexts/cardCreationContext";

/**
 * Component cretes a single checkbox to toggle the multicard
 * section on/off.
 * @returns A JSX component.
 */
const IsMultiCardToggle = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const unitIsMultiCard = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].isMultiStateUnit = !tempArray[0].isMultiStateUnit;

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid
      container
      sx={{
        direction: "column",
        justifyContent: "flex-start",
        width: "50em",
      }}
    >
      <FormGroup
        sx={{
          width: "max-Content",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={CCC.unitCards[0].isMultiStateUnit} //
              onChange={unitIsMultiCard}
              sx={theme.palette.cardCreator.checkbox}
            />
          }
          label={CREATOR.UNIT_IS_MULTICARD}
          labelPlacement="start"
        />
      </FormGroup>
    </Grid>
  );
};

export default IsMultiCardToggle;
