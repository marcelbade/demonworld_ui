// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { CREATOR } from "../../../constants/textsAndMessages";

const PointCostCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const deletePointCost = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].points = "";

    CCC.setUnitCards(tempArray);
  };

  const changePointCost = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[0].points = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid //
      container
      sx={{
        alignItems: "center",
        direction: "row", //
        justifyContent: "space-evenly",
        ...theme.palette.cardCreator.box,
      }}
    >
      <CreatorTextInput
        id={"PointCost"} //
        value={CCC.unitCards[0].points}
        onClick={deletePointCost}
        onChange={changePointCost}
        label={CREATOR.POINTCOST}
      />
    </Grid>
  );
};

export default PointCostCreator;
