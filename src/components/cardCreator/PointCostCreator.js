// react
import React, { useContext } from "react";
// material ui
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";

const PointCostCreator = () => {
  const CCC = useContext(CardCreationContext);

  const deletePointCost = () => {
    CCC.setUnit({ ...CCC.unit, points: "" });
  };

  const changePointCost = (event) => {
    CCC.setUnit({ ...CCC.unit, points: event.target.value });
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
        value={CCC.points}
        onClick={deletePointCost}
        onChange={changePointCost}
        label={CREATOR.POINTCOST}
      />
    </Grid>
  );
};

export default PointCostCreator;
