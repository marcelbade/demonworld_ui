// React
import React, { useContext } from "react";
//Material UI
import { Typography, Grid2 as Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import { ListItem } from "@mui/material";
import UnitLossCalcBttnGroup from "../LossCalcInputButtons/UnitLossCalcBttnGroup";
import EquipmentList from "../LossCalcEquipmentList/EquipmentList";
import ListElementName from "./ListElementName";
import TotalLossButton from "../LossCalcInputButtons/TotalLossButton";

const LostUnitListElement = (props) => {
  const LC = useContext(LossCalcContext);
  const theme = useTheme();

  const STYLES = {
    border: "solid 0.1em",
    borderColor: "black",
    borderRadius: "4px",
    
    height: "100%",
    paddingBottom: "0.5em",
  };

  const setStyles = () => {
    return props.unitDestroyed
      ? {
          ...STYLES,
          borderColor: theme.palette.errorColor,
        }
      : STYLES;
  };

  return (
    <ListItem>
      <Grid
      size={10}
        container //
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={setStyles()}
      >
        <Grid container size={12} direction="column">
          <ListElementName //
            unitName={props.unit.unitName}
            unitDestroyed={props.unit.unitDestroyed}
          />
          <EquipmentList unit={props.unit} />
        </Grid>
        <Grid
          container
          size={6}
          direction="row" //
          alignItems="center"
          justifyContent="center"
        >
          <UnitLossCalcBttnGroup unit={props.unit} />
        </Grid>
        <Grid
          container
          size={2} //
          alignItems="center"
          justifyContent="center"
        >
          <TotalLossButton unit={props.unit} />
        </Grid>

        <Grid size={1}>
          <Typography variant="h6" align="center">
            {LC.unitPointsLost}
          </Typography>
        </Grid>
        <Grid //
          size={1}
          direction="column"
          container
          justifyContent="flex-end"
          alignItems="flex-end"
        ></Grid>
      </Grid>
    </ListItem>
  );
};

export default LostUnitListElement;
