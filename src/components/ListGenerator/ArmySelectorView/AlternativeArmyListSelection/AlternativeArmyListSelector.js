// React
import React, { useContext, useState, useEffect } from "react";
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
const AlternativeArmyListSelector = (props) => {
  const classes = useStyles();
  const AC = useContext(ArmyContext);

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={
        props.alternateArmyFirstSelector //
          ? AC.setSelectedAlternativeList
          : AC.setSecondSelectedAlternativeList
      }
      isArmySelector={true}
      options={
        props.alternateArmyFirstSelector //
          ? AC.alternateArmyListOptions
          : AC.secondAlternativeArmyOptions
      }
      label={<Typography>{AC.alternateArmyListLabelText}</Typography>}
    />
  );
};

export default AlternativeArmyListSelector;
