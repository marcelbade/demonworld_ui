// React
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";

const FactionTableHeader = () => {
  const theme = useTheme();
  const TC = useContext(TableContext);

  return (
    <thead>
      <tr>
        <th></th>
        {TC.columns.map((col, i) => {
          let element = col.displayed ? (
            <th
              sx={{
                backgroundColor: theme.palette.compendiumHeaderBackground,
                color: "white",
                borderColor: "black",
                padding: "5px",
              }}
              key={i}
            >
              {col.label}
            </th>
          ) : null;
          return element;
        })}
      </tr>
    </thead>
  );
};

export default React.memo(FactionTableHeader);
