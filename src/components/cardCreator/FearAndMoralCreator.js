// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Checkbox, FormControlLabel, Grid2 as Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { UNIT } from "../../constants/unitTypes";
// constants
import { CARD_TEXT, CREATOR } from "../../constants/textsAndMessages";

const FearAndMoralCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const setUnitFearless = () => {
    const DEFAULT_VALUE = 4;

    CCC.setIsFearless((prevState) => !prevState);
    CCC.setUnit({ ...CCC.unit, moral1: 0 });

    if (CCC.isFearless) {
      CCC.setUnit({ ...CCC.unit, moral1: DEFAULT_VALUE });
    }
  };

  const setUnitImpetuous = () => {
    const DEFAULT_VALUE = 12;

    CCC.setNeverImpetuous((prevState) => !prevState);
    CCC.setUnit({ ...CCC.unit, moral2: 0 });

    if (CCC.neverImpetuous) {
      CCC.setUnit({ ...CCC.unit, moral2: DEFAULT_VALUE });
    }
  };

  const changeFear = (event) => {
    CCC.setUnit({ ...CCC.unit, fear: event.target.value });
  };

  const changeMoral1 = (event) => {
    CCC.setUnit({ ...CCC.unit, moral1: event.target.value });
  };

  const changeMoral2 = (event) => {
    CCC.setUnit({ ...CCC.unit, moral2: event.target.value });
  };

  return (
    <Grid
      container //
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      sx={theme.palette.cardCreator.box}
    >
      <Grid
        container //
        direction="column"
      >
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={CCC.isFearless} //
                onChange={setUnitFearless}
                inputProps={{ "aria-label": "controlled" }}
                sx={theme.palette.cardCreator.checkbox}
              />
            }
            label={CARD_TEXT.UNIT_IS_FEARLESS}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                checked={CCC.neverImpetuous} //
                onChange={setUnitImpetuous}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={CARD_TEXT.UNIT_IS_IMPETUOUS}
          />
        </Grid>
      </Grid>
      <Grid
        container //
        direction="row"
      >
        <CreatorTextInput
          id={"Fear"} //
          value={CCC.unit.fear}
          onChange={changeFear}
          label={CREATOR.FEAR}
          width={"7em"}
        />
        {CCC.unit.unitType === UNIT ? (
          <Grid
            container
            direction="row"
            sx={{
              width: "max-content",
            }}
          >
            <CreatorTextInput
              id={"moral1"} //
              value={CCC.unit.moral1}
              onChange={changeMoral1}
              label={CREATOR.MORAL1}
              width={"9em"}
              disabled={CCC.isFearless}
            />
            <CreatorTextInput
              id={"moral2"} //
              value={CCC.unit.moral2}
              onChange={changeMoral2}
              label={CREATOR.MORAL2}
              width={"9em"}
              disabled={CCC.neverImpetuous}
            />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default FearAndMoralCreator;
