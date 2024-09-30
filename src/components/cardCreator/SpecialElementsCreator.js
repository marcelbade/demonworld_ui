// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";
import { UNIT } from "../../constants/unitTypes";

const UnitMovementCreator = () => {
  const CCC = useContext(CardCreationContext);

  const changeLeader = () => {
    CCC.setLeader((prevState) => !prevState);
  };

  const changeBanner = () => {
    CCC.setBanner((prevState) => !prevState);
  };

  const changeMusician = () => {
    CCC.setMusician((prevState) => !prevState);
  };

  const deleteNumberOfElements = () => {
    CCC.setNumberOfElements("");
  };

  const changeNumberOfElements = (event) => {
    CCC.setNumberOfElements(event.target.value);
  };

  const elements = [
    {
      value: CCC.leader,
      action: changeLeader,
      name: CREATOR.LEADER,
    },
    {
      value: CCC.banner,
      action: changeBanner,
      name: CREATOR.BANNER,
    },
    {
      value: CCC.musician,
      action: changeMusician,
      name: CREATOR.MUSICIAN,
    },
  ];

  const netNumberOfElements = (unitType) => {
    if (unitType !== UNIT) {
      CCC.setNumberOfElements(1);
      return 1;
    }

    return CCC.numberOfElements;
  };

  return (
    <Grid
      container
      item
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      sx={{
        marginTop: "1em",
        padding: "1em",
        width: "50em",
        border: " solid 2px black",
        borderRadius: "10px",
      }}
    >
      <Grid item>
        <CreatorTextInput
          id={"elementNumber"} //
          value={netNumberOfElements(CCC.unitType)}
          onClick={deleteNumberOfElements}
          onChange={changeNumberOfElements}
          disabled={CCC.unitType !== UNIT}
          label={CREATOR.ELEMENTS}
          width="10em"
        />
      </Grid>

      {CCC.unitType === UNIT
        ? elements.map((elmnt) => (
            <Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={elmnt.value} //
                    onChange={elmnt.action}
                    inputProps={{ "aria-label": "controlled" }}
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

export default UnitMovementCreator;
