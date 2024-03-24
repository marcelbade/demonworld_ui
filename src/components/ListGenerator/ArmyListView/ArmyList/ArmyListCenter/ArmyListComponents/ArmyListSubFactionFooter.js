// React
import React, { useContext } from "react";
// Material UI
import { ListItemText, List } from "@mui/material";
// components and functions
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../../contexts/selectionContext";
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";
import { TEXTS } from "../../../../../../constants/textsAndMessages";

const ArmyListSubFactionFooter = (props) => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const stats = useSubFactionStats(
    props.subFactionUnits, //
    props.subFactionName,
    AC.selectedFactionName,
    SEC.maxPointsAllowance
  );

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
            <span>{stats.currentTotal}</span>
            <span> {stats.currentPercent}</span>
          </span>
        }
        secondary={
          <span sx={{ gap: "1em", display: "flex", flexDirection: "row" }}>
            <span>{`Minimum: ${stats.minPercentage} %`}</span>
            <span>{`Maximum ${stats.maxPercentage} %`}</span>
          </span>
        }
      />
    </List>
  );
};

export default ArmyListSubFactionFooter;
