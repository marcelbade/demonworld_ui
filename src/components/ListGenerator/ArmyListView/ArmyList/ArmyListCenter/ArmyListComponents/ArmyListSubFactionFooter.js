// React
import React, { useContext } from "react";
// Material UI
import { ListItemText, List } from "@mui/material";
// components and functions
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";
import { TEXTS } from "../../../../../../constants/textsAndMessages";
// contexts
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../../contexts/selectionContext";

const ArmyListSubFactionFooter = (props) => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const stats = useSubFactionStats();

  const displayCurrentTotal = () => {
    const total = stats.currentTotal(props.subFactionUnits);

    return total === 0 ? `` : `${total}`;
  };

  const displayCurrentPercentage = () => {
    const percentage = stats.currentPercentage(props.subFactionUnits, SEC.maxPointsAllowance);

    return percentage === 0 ? `` : `${percentage}%`;
  };

  const MIN_PERCENTAGE = `Minimum: ${stats.minAndMaxAllowance(AC.selectedFactionName, props.subFactionName).min} %`;
  const MAX_PERCENTAGE = `Maximum: ${stats.minAndMaxAllowance(AC.selectedFactionName, props.subFactionName).max} %`;

  return (
    <List>
      <ListItemText //
        sx={{ display: "flex", flexDirection: "column" }}
        key={props.subFaction}
        primary={<span>{TEXTS.TOTAL}</span>}
      />
      <ListItemText
        sx={{ display: "flex", flexDirection: "column" }}
        key={props.subFaction}
        primary={
          <span sx={{ gap: "1em", display: "flex", flexDirection: "row" }}>
            <span>{displayCurrentTotal()}</span>
            <span> {displayCurrentPercentage()}</span>
          </span>
        }
        secondary={
          <span sx={{ gap: "1em", display: "flex", flexDirection: "row" }}>
            <span>{MIN_PERCENTAGE}</span>
            <span> {MAX_PERCENTAGE}</span>
          </span>
        }
      />
    </List>
  );
};

export default ArmyListSubFactionFooter;
