// React
import React, { useContext } from "react";
//Material UI
import { List } from "@mui/material";
// components and functions
 import { unitCardMultiSort } from "../../shared/sharedFunctions";
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";
import LostUnitListElement from "./LostUnitListElement";

const LostUnitList = () => {
  const calcContext = useContext(LossCalcContext);

  return (
    <List>
      {unitCardMultiSort(calcContext.list).map((u, i) => {
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
