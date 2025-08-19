// React
import React from "react";
// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { TableCell, TableHead, TableRow } from "@mui/material";
// customHooks
import useCompendiumTableControl from "../../../../customHooks/UseCompendiumTableControl";

const CompendiumTableHeader = () => {
  const theme = useTheme();

  const compendiumTableControl = useCompendiumTableControl();

  return (
    <TableHead>
      <TableRow>
        {compendiumTableControl.getAllTableColumns().map((col, i) => {
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
