// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import CreatorTextInput from "./CreatorTextInput";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";
// constants
import { CREATOR } from "../../constants/textsAndMessages";

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

  const netNumberOfElements = () => {
    let modificator = 0;

    if (CCC.leader) {
      modificator = ++modificator;
    }
    if (CCC.banner) {
      modificator = ++modificator;
    }
    if (CCC.musician) {
      modificator = ++modificator;
    }

    return CCC.numberOfElements - modificator;
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
          value={netNumberOfElements()}
          onClick={deleteNumberOfElements}
          onChange={changeNumberOfElements}
          adornment={CREATOR.ELEMENTS}
          width={"7em"}
        />
      </Grid>

      {elements.map((elmnt) => (
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
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default UnitMovementCreator;
