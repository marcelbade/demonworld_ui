// React
import React, { useContext } from "react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";

import { IconButton } from "@mui/material";
// icons
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

const RowLock = (props) => {
  const TC = useContext(TableContext);

  const toggleRowLock = () => {
    TC.setTableData(
      TC.tableData.map((t) => {
        if (props.unit.unitName === t.unitName) {
          t.unitLocked = !t.unitLocked;
        }
        return t;
      })
    );
  };

  return (
    <IconButton
      onClick={() => {
        toggleRowLock();
      }}
    >
      {props.unit.unitLocked ? <LockIcon /> : <LockOpenIcon />}
    </IconButton>
  );
};

export default RowLock;
