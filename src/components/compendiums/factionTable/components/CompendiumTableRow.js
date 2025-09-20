// React
import React from "react";
// components & functions
import {
  renderBooleanAsIcon,
  renderSpecialRules,
  renderDynamicIcons,
  renderUnitTypeName,
  renderEffectiveness_1,
  renderEffectiveness_2,
} from "../../../../util/utilityFunctions";
import CardButton from "./CardButton";
import RowLock from "./RowLock";
// material ui
import { TableRow } from "@mui/material";
// custom hook
import useCompendiumTableControl from "../../../../customHooks/UseCompendiumTableControl";

const CompendiumTableRow = (props) => {
  const compendiumTableControl = useCompendiumTableControl();

  const displayValue = (c) => {
    switch (c.column) {
      case "lock":
        return <RowLock unit={props.unit} />;
      case "cardViewButton":
        return <CardButton unit={props.unit} />;
      case "unitType":
        return renderUnitTypeName(props.unit.unitType);
      case "musician":
      case "standardBearer":
      case "squareFormation":
      case "skirmishFormation":
      case "wedgeFormation":
      case "horde":
        return renderBooleanAsIcon(props.unit.numberOfElements, props.unit[c.column]);
      case "weapon1":
        return `${props.unit.weapon1Name} ${props.unit.weapon1}`;
      case "weapon2":
        return `${props.unit.weapon2Name} ${props.unit.weapon2}`;
      case "weapon3":
        return `${props.unit.weapon3Name} ${props.unit.weapon3}`;
      case "commandStars":
        return renderDynamicIcons("*", props.unit.commandStars);
      case "magic":
        return renderDynamicIcons("/", props.unit.magic);
      case "specialRules":
        return renderSpecialRules(props.unit.specialRules);
      case "effectiveness_1":
        return renderEffectiveness_1(props.unit);
      case "effectiveness_2":
        return renderEffectiveness_2(props.unit);

      default:
        return props.unit[c.column];
    }
  };

  return (
    <TableRow
      key={props.rowNumber}
      sx={{
        fontFamily: "jaapokkiRegular",
        textAlign: "center",
        "&:hover": {
          backgroundColor: "#ac6725",
        },
      }}
    >
      {compendiumTableControl.getAllTableColumns().map((col, i) => {
        return col.displayed ? (
          <td
            key={i}
            style={{
              minWidth: col.minColumnWidth,
              width: col.columnWidth,
              maxWidth: col.maxColumnWidth,
              wordWrap: "break-word",
            }}
          >
            {displayValue(col)}
          </td>
        ) : null;
      })}
    </TableRow>
  );
};

export default React.memo(CompendiumTableRow);
