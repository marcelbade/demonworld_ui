// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid, FormControlLabel, FormLabel, FormControl, RadioGroup, Radio } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { CREATOR } from "../../../constants/textsAndMessages";
import { GIANT, HERO, UNIT, SUMMONED, MAGE, AUTOMATON } from "../../../constants/unitTypes";

const UnitTypeSelector = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  /**
   * function sets the unit type of the new / edited unit.
   * NOTE: if the selected unit type is not "unit" (i.e. there is more than 1 element)
   * all relevant fields must be reset.
   * @param {Obj} event
   */
  const handleChange = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].unitType = event.target.value;

    if (event.target.value !== UNIT) {
      tempArray[0].numberOfElements = 1;

      tempArray[0].leader = false;
      tempArray[0].standardBearer = false;
      tempArray[0].musician = false;
    } else if (event.target.value === UNIT) {
      tempArray[0].numberOfElements = 10;
      tempArray[0].unitType = event.target.value;
    }

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        alignItems: "center", //
        justifyContent: "center",
        ...theme.palette.cardCreator.box,
      }}
    >
      <FormControl variant="outlined">
        <FormLabel sx={{ fontFamily: "NotMaryKate" }} id="unitTypeLabel">
          {CREATOR.UNIT_TYPE}
        </FormLabel>
        <RadioGroup //
          row
          name="unit-type-radio-group"
          value={CCC.unitCards[0].unitType}
          onChange={handleChange}
          sx={{
            color: theme.palette.cardCreator.checkbox.color,
            "&.Mui-checked": {
              color: theme.palette.cardCreator.checkbox.color,
            },
          }}
        >
          <FormControlLabel //
            value={UNIT}
            control={
              <Radio
                style={{
                  color: theme.palette.cardCreator.checkbox.color,
                }}
              />
            }
            label={CREATOR.UNIT_OR_SUMMONED_UNIT}
          />
          <FormControlLabel //
            value={GIANT}
            control={
              <Radio
                style={{
                  color: theme.palette.cardCreator.checkbox.color,
                }}
              />
            }
            label={CREATOR.GIANT}
          />
          <FormControlLabel //
            value={AUTOMATON}
            control={
              <Radio
                style={{
                  color: theme.palette.cardCreator.checkbox.color,
                }}
              />
            }
            label={CREATOR.AUTOMATON}
          />
          <FormControlLabel //
            value={HERO}
            control={
              <Radio
                style={{
                  color: theme.palette.cardCreator.checkbox.color,
                }}
              />
            }
            label={CREATOR.HERO}
          />
          <FormControlLabel //
            value={MAGE}
            control={
              <Radio
                style={{
                  color: theme.palette.cardCreator.checkbox.color,
                }}
              />
            }
            label={CREATOR.MAGE}
          />
          <FormControlLabel //
            value={SUMMONED}
            control={
              <Radio
                style={{
                  color: theme.palette.cardCreator.checkbox.color,
                }}
              />
            }
            label={CREATOR.SUMMONS_WITH_MAXFIELDS}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default UnitTypeSelector;
