// react
import { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material";
// components and functions
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { CREATOR } from "../../../constants/textsAndMessages";

const HitpointCreator = () => {
  const theme = useTheme();

  const CCC = useContext(CardCreationContext);

  const deleteHitpoints = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].hitpoints = 0;

    CCC.setUnitCards(tempArray);
  };

  const changeHitpoints = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].hitpoints = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  return (
    <Grid
      container //
      direction="row"
      sx={{
        alignItems: "center", //
        justifyContent: "space-evenly",
        ...theme.palette.cardCreator.box,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      <CreatorTextInput
        id={"Hitpoints"} //
        value={CCC.unitCards[CCC.displayedElement].hitpoints}
        onClick={deleteHitpoints}
        onChange={changeHitpoints}
        label={CREATOR.HITPOINTS}
      />
    </Grid>
  );
};

export default HitpointCreator;
