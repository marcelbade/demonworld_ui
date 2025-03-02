// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid2 as Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";

const HitpointCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const deleteHitpoints = () => {
    CCC.setUnit({ ...CCC.unit, hitpoints: 0 });
  };

  const changeHitpoints = (event) => {
    CCC.setUnit({ ...CCC.unit, hitpoints: event.target.value });
  };

  return (
    <Grid
      container //
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      sx={theme.palette.cardCreator.box}
    >
      <CreatorTextInput
        id={"Hitpoints"} //
        value={CCC.unit.hitpoints}
        onClick={deleteHitpoints}
        onChange={changeHitpoints}
        label={CREATOR.HITPOINTS}
      />
    </Grid>
  );
};

export default HitpointCreator;
