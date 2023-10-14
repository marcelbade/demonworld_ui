// React
import React, { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import SelectionInput from "../../../shared/selectionInput";
import useArmyValidation from "../../../../customHooks/UseArmyValidation";

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
  const validation = useArmyValidation();

  const handleInput = (value) => {
    const setter = props.alternativeArmyFirstSelector //
      ? AC.setSelectedAlternativeList
      : AC.setSecondSelectedAlternativeList;

    setter(value);
    validation.validateList(AC.selectedUnits, AC.maxPointsAllowance, AC.subFactions);
  };

  return (
    <SelectionInput
      className={classes.alternativeListSelector}
      filterFunction={handleInput}
      isArmySelector={true}
      options={
        props.alternativeArmyFirstSelector //
          ? AC.alternateArmyListOptions
          : AC.secondAlternativeArmyOptions
      }
      label={<Typography>{AC.alternateArmyListLabelText}</Typography>}
    />
  );
};

export default AlternativeArmyListSelector;
