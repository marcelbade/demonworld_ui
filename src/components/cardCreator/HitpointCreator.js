// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";

const HitpointCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteHitpoints = () => {
    CCC.setUnit({ ...CCC.unit, hitpoints: 0 });
  };

  const changeHitpoints = (event) => {
    CCC.setUnit({ ...CCC.unit, hitpoints: parseInt(event.target.value) });
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
