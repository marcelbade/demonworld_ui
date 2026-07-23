// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { HERO, MAGE, UNIT } from "../../../constants/unitTypes";
// constants
import { CARD_TEXT, CREATOR } from "../../../constants/textsAndMessages";

const FearAndMoralCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const setUnitFearless = () => {
    const DEFAULT_VALUE = 4;

    CCC.setIsFearless((prevState) => !prevState);

    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].moral1 = 0;

    if (CCC.isFearless) {
      tempArray[CCC.displayedElement].moral1 = DEFAULT_VALUE;
    }

    CCC.setUnitCards(tempArray);
  };

  const setUnitImpetuous = () => {
    const DEFAULT_VALUE = 12;

    CCC.setNeverImpetuous((prevState) => !prevState);
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].moral2 = 0;

    if (CCC.neverImpetuous) {
      tempArray[CCC.displayedElement].moral2 = DEFAULT_VALUE;
    }

    CCC.setUnitCards(tempArray);
  };

  const changeFear = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].fear = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeMoral1 = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].moral1 = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const changeMoral2 = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].moral2 = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid
      container //
      direction={{ xs: "column" }}
      sx={{
        alignItems: "center",
        justifyContent: "space-evenly",
        ...theme.palette.cardCreator.box,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      {CCC.unitCards[CCC.displayedElement].unitType === HERO || CCC.unitCards[CCC.displayedElement].unitType === MAGE ? null : (
        <Grid
          container //
          direction={{ xs: "column" }}
        >
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={CCC.isFearless} //
                  onChange={setUnitFearless}
                  sx={theme.palette.cardCreator.checkbox}
                />
              }
              label={CARD_TEXT.UNIT_IS_FEARLESS}
            />
          </Grid>
          <Grid>
            <FormControlLabel
              control={
                <Checkbox
                  checked={CCC.neverImpetuous} //
                  onChange={setUnitImpetuous}
                />
              }
              label={CARD_TEXT.UNIT_IS_IMPETUOUS}
            />
          </Grid>
        </Grid>
      )}
      <Grid
        container //
        direction={{ xs: "row" }}
      >
        <CreatorTextInput
          id={"Fear"} //
          value={CCC.unitCards[CCC.displayedElement].fear}
          onChange={changeFear}
          label={CREATOR.FEAR}
          width={"7em"}
        />
        {CCC.unitCards[CCC.displayedElement].unitType === UNIT ? (
          <Grid
            container
            direction={{ xs: "row" }}
            sx={{
              width: "max-content",
            }}
          >
            <CreatorTextInput
              id={"moral1"} //
              value={CCC.unitCards[CCC.displayedElement].moral1}
              onChange={changeMoral1}
              label={CREATOR.MORAL1}
              width={"9em"}
              disabled={CCC.isFearless}
            />
            <CreatorTextInput
              id={"moral2"} //
              value={CCC.unitCards[CCC.displayedElement].moral2}
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
