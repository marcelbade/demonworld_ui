// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

const PointCostCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deletePointCost = () => {
    CCC.setPointCost("");
  };

  const changePointCost = (event) => {
    CCC.setPointCost(event.target.value);
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
        id={"PointCost"} //
        value={CCC.pointCost}
        onClick={deletePointCost}
        onChange={changePointCost}
        adornment={"Punkte"}
      />
    </Grid>
  );
};

export default PointCostCreator;
