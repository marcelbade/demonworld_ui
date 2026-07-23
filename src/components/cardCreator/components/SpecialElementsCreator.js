// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../../constants/textsAndMessages";
import { UNIT } from "../../../constants/unitTypes";

const SpecialElementsCreator = () => {
  const theme = useTheme();
  const CCC = useContext(CardCreationContext);

  const changeLeader = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].leader = !CCC.unitCards[CCC.displayedElement].leader;

    CCC.setUnitCards(tempArray);
  };

  const changeStandardBearer = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].standardBearer = !CCC.unitCards[CCC.displayedElement].standardBearer;

    CCC.setUnitCards(tempArray);
  };

  const changeMusician = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].musician = !CCC.unitCards[CCC.displayedElement].musician;

    CCC.setUnitCards(tempArray);
  };

  const deleteNumberOfElements = () => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].numberOfElements = 0;

    CCC.setUnitCards(tempArray);
  };

  const changeNumberOfElements = (event) => {
    let tempArray = [...CCC.unitCards];

    tempArray[CCC.displayedElement].numberOfElements = event.target.value;

    CCC.setUnitCards(tempArray);
  };

  const elements = [
    {
      value: CCC.leader,
      action: changeLeader,
      name: CREATOR.LEADER,
    },
    {
      value: CCC.banner,
      action: changeStandardBearer,
      name: CREATOR.BANNER,
    },
    {
      value: CCC.musician,
      action: changeMusician,
      name: CREATOR.MUSICIAN,
    },
  ];

  return (
    <Grid
      container //
      direction="row"
      sx={{
        justifyContent: "space-around", //
        alignItems: "center",
        ...theme.palette.cardCreator.box,
        borderColor: CCC.unitCards[CCC.displayedElement].color,
        backgroundColor: CCC.unitCards[CCC.displayedElement].color,
      }}
    >
      <Grid>
        <CreatorTextInput
          id={"elementNumber"}
          value={CCC.unitCards[CCC.displayedElement].numberOfElements}
          onClick={deleteNumberOfElements}
          onChange={changeNumberOfElements}
          disabled={CCC.unitCards[CCC.displayedElement].unitType !== UNIT}
          label={CREATOR.ELEMENTS}
          width="10em"
        />
      </Grid>

      {/* // CURRENT BUG!  */}
      <Grid
        sx={{
          ...(CCC.unitCards[CCC.displayedElement].unitType !== "U" //
            ? theme.palette.animation.fadeAway
            : theme.palette.animation.fadeIn),
        }}
      >
        {CCC.unitCards[CCC.displayedElement].unitType === UNIT
          ? elements.map((elmnt, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={elmnt.value} //
                    onChange={elmnt.action}
                    sx={theme.palette.cardCreator.checkbox}
                  />
                }
                label={elmnt.name}
                labelPlacement="start"
              />
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default SpecialElementsCreator;
