// react
import React, { useContext } from "react";
// material ui
import { Grid, FormControlLabel, FormLabel, FormControl, RadioGroup, Radio } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";
import { GIANT, HERO, UNIT, SUMMONED, MAGE, AUTOMATON } from "../../constants/unitTypes";

const UnitTypeSelector = () => {
  const CCC = useContext(CardCreationContext);

  const handleChange = (event) => {
    CCC.setUnit({ ...CCC.unit, unitType: event.target.value });

    if (event.target.value !== UNIT) {
      CCC.setUnit({
        ...CCC.unit,
        numberOfElements: 1, //
        unitType: event.target.value,
      });
    }
  };

  return (
    <Grid
      container //
      alignItems="center" //
      justifyContent="center"
      direction="column"
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      <FormControl variant="outlined">
        <FormLabel sx={{ fontFamily: "NotMaryKate" }} id="unitTypeLabel">
          {CREATOR.UNIT_TYPE}
        </FormLabel>
        <RadioGroup //
          row
          name="unit-type-radio-group"
          value={CCC.unitType}
          onChange={handleChange}
          defaultValue={UNIT}
        >
          <FormControlLabel //
            value={UNIT}
            control={<Radio />}
            label={CREATOR.UNIT_OR_SUMMONED_UNIT}
          />
          <FormControlLabel //
            value={GIANT}
            control={<Radio />}
            label={CREATOR.GIANT}
          />
          <FormControlLabel //
            value={AUTOMATON}
            control={<Radio />}
            label={CREATOR.AUTOMATON}
          />
          <FormControlLabel //
            value={HERO}
            control={<Radio />}
            label={CREATOR.HERO}
          />
          <FormControlLabel //
            value={MAGE}
            control={<Radio />}
            label={CREATOR.MAGE}
          />
          <FormControlLabel //
            value={SUMMONED}
            control={<Radio />}
            label={CREATOR.SUMMONS_WITH_MAXFIELDS}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default UnitTypeSelector;
