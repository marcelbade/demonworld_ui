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
    CCC.setUnit({ ...CCC.unit, leader: !CCC.unit.leader });
  };

  const changeStandardBearer = () => {
    CCC.setUnit({ ...CCC.unit, standardBearer: !CCC.unit.standardBearer });
  };

  const changeMusician = () => {
    CCC.setUnit({ ...CCC.unit, musician: !CCC.unit.musician });
  };

  const deleteNumberOfElements = () => {
    CCC.setUnit({ ...CCC.unit, numberOfElements: 0 });
  };

  const changeNumberOfElements = (event) => {
    CCC.setUnit({ ...CCC.unit, numberOfElements: event.target.value });
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
      }}
    >
      <Grid>
        <CreatorTextInput
          id={"elementNumber"}
          value={CCC.unit.numberOfElements}
          onClick={deleteNumberOfElements}
          onChange={changeNumberOfElements}
          disabled={CCC.unit.unitType !== UNIT}
          label={CREATOR.ELEMENTS}
          width="10em"
        />
      </Grid>

      {/* // CURRENT BUG!  */}
      <Grid
        sx={{
          ...(CCC.unit.unitType !== "U" //
            ? theme.palette.animation.fadeAway
            : theme.palette.animation.fadeIn),
        }}
      >
        {CCC.unit.unitType === UNIT
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
