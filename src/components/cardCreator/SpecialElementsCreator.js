// react
import React, { useContext } from "react";
// material ui
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// contexts
import { CardCreationContext } from "../../contexts/cardCreationContext";

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

  const elements = [
    {
      value: CCC.leader,
      action: changeLeader,
      name: "Anführer",
    },
    {
      value: CCC.banner,
      action: changeBanner,
      name: "Banner",
    },
    {
      value: CCC.musician,
      action: changeMusician,
      name: "Musiker",
    },
  ];

  return (
    <FormGroup>
      {elements.map((elmnt) => (
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
      ))}
    </FormGroup>
  );
};

export default UnitMovementCreator;
