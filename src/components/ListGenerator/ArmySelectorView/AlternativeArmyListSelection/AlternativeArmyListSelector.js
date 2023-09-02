// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";

const useStyles = makeStyles((theme) => ({
  alternativeListSelector: {
    marginTop: "3em",
    backgroundColor: "red",
    "& .MuiInputBase-input": {
      height: "5.5rem",
    },
  },
}));
const AlternativeArmyListSelector = () => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={AC.setSelectedAlternativeList}
      isArmySelector={true}
      options={AC.alternateArmyListOptions}
      label={<Typography>{AC.alternateArmyListLabelText}</Typography>}
    />
  );
};

export default AlternativeArmyListSelector;
