// React
import React, { useContext } from "react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";
import {
  renderBooleanAsIcon,
  renderSpecialRules,
  renderDynamicIcons,
  renderUnitTypeName,
  renderEffectiveness_1,
  renderEffectiveness_2,
} from "../depencies/factionTableFunctions";
import CardButton from "./CardButton";
import RowLock from "./RowLock";
import { TableRow } from "@mui/material";

const CompendiumTableRow = (props) => {
  const TC = useContext(TableContext);

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
        return renderBooleanAsIcon(props.unit[c.column]);
      case "weapon1":
        return `${props.unit.weapon1Name} ${props.unit.weapon1}`;
      case "weapon2":
        return `${props.unit.weapon2Name} ${props.unit.weapon2}`;
      case "weapon3":
        return `${props.unit.weapon3Name} ${props.unit.weapon3}`;
      case "commandStars":
        return renderDynamicIcons({
          iconString: "*", //
          iconNumber: props.unit.commandStars,
          showIfNone: true,
        });
      case "magic":
        return renderDynamicIcons({
          iconString: "/", //
          iconNumber: props.unit.magic,
          showIfNone: true,
        });
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
      {TC.columns.map((col, i) => {
        return col.displayed ? <td key={i}> {displayValue(col)} </td> : null;
      })}
    </TableRow>
  );
};

export default React.memo(CompendiumTableRow);
