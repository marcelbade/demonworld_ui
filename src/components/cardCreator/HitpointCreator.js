// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const HitpointCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deleteHitpoints = () => {
    CCC.setHitpoints("");
  };

  const changeHitpoints = (event) => {
    CCC.setHitpoints(event.target.value);
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
        value={CCC.hitpoints}
        onClick={deleteHitpoints}
        onChange={changeHitpoints}
        adornment={"Trefferpunkte"}
      />
    </Grid>
  );
};

export default HitpointCreator;
