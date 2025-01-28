// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
import { CREATOR } from "../../constants/textsAndMessages";

const PointCostCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const deletePointCost = () => {
    CCC.setUnit({ ...CCC.unit, points: "" });
  };

  const changePointCost = (event) => {
    CCC.setUnit({ ...CCC.unit, points: event.target.value });
  };

  return (
    <Grid item container direction="row" alignItems="center" justifyContent="space-evenly" sx={theme.palette.cardCreator.box}>
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
