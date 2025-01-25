// react
import React, { useContext } from "react";
// material ui
import { Grid, Typography } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { UNIT } from "../../constants/unitTypes";
// constants
import { CREATOR } from "../../constants/textsAndMessages";

const FearAndMoralCreator = () => {
  const CCC = useContext(CardCreationContext);

  const changeFear = (event) => {
    CCC.setUnit({ ...CCC.unit, fear: parseInt(event.target.value) });
  };

  const changeMoral1 = (event) => {
    CCC.setUnit({ ...CCC.unit, moral1: parseInt(event.target.value) });
  };

  const changeMoral2 = (event) => {
    CCC.setUnit({ ...CCC.unit, moral2: parseInt(event.target.value) });
  };

  return (
    <Grid
      item
      container
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      sx={{
        marginTop: "1em", //
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
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
          item
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
          />
          <Typography variant="h3" sx={{ width: "1em" }}>
            /
          </Typography>
          <CreatorTextInput
            id={"moral2"} //
            value={CCC.unit.moral2}
            onChange={changeMoral2}
            label={CREATOR.MORAL2}
            width={"9em"}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FearAndMoralCreator;
