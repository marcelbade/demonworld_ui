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
            <span>{stats.currentTotal(props.subFactionUnits)}</span>
            <span> {stats.currentPercentage(props.subFactionUnits, SEC.maxPointsAllowance)}</span>
          </span>
        }
        secondary={
          <span sx={{ gap: "1em", display: "flex", flexDirection: "row" }}>
            <span>{`Minimum: ${stats.minAndMaxAllowance(AC.selectedFactionName, props.subFactionName).min} %`}</span>
            <span>{`Maximum ${stats.minAndMaxAllowance(AC.selectedFactionName, props.subFactionName).max} %`}</span>
          </span>
        }
      />
    </List>
  );
};

export default ArmyListSubFactionFooter;
