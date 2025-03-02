// react
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
import { Checkbox, FormControlLabel, Grid2 as Grid } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";
import { UNIT } from "../../constants/unitTypes";

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
      alignItems="center"
      justifyContent="space-around"
      sx={theme.palette.cardCreator.box}
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

      {CCC.unit.unitType === UNIT
        ? elements.map((elmnt, i) => (
            <Grid key={i}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={elmnt.value} //
                    onChange={elmnt.action}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={theme.palette.cardCreator.checkbox}
                  />
                }
                label={elmnt.name}
                labelPlacement="start"
              />
            </Grid>
          ))
        : null}
    </Grid>
  );
};

export default SpecialElementsCreator;
