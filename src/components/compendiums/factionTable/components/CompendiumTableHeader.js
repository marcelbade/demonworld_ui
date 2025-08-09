// React
import React, { useContext } from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { CompendiumContext } from "../../../../contexts/compendiumContext";
import { TableCell, TableHead, TableRow } from "@mui/material";

const CompendiumTableHeader = () => {
  const theme = useTheme();
  const TC = useContext(CompendiumContext);

  return (
    <TableHead>
      <TableRow>
        {TC.columns.map((col, i) => {
          let element = col.displayed ? (
            <TableCell
              sx={{
                backgroundColor: theme.palette.compendiumHeaderBackground,
                fontFamily: "jaapokkiRegular",
                textAlign: "center",
                color: "white",
                borderColor: "black",
                padding: "5px",
              }}
              key={i}
            >
              {col.label}
            </TableCell>
          ) : null;
          return element;
        })}
      </TableRow>
    </TableHead>
  );
};

export default React.memo(CompendiumTableHeader);
