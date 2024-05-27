// React
import React, { useContext } from "react";
//Material UI
import { List } from "@mui/material";
// components and functions
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import LostUnitListElement from "./LostUnitListElement";

const LostUnitList = () => {
  const calcContext = useContext(LossCalcContext);

  return (
    <List>
      {calcContext.list
        .sort((a, b) => a.unitName > b.unitName)
        .map((u, i) => {
          return (
            <LostUnitListElement
              unit={u} //
              index={i}
              key={u.uniqueID}
            />
          );
        })}
    </List>
  );
};

export default LostUnitList;
