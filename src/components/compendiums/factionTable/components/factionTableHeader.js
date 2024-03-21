// React
import React, { useContext } from "react";
// material ui
import { makeStyles } from "@material-ui/core";
// components & functions
import { TableContext } from "../../../../contexts/tableContext";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.compendiumHeaderBackground,
    color: "white",
    borderColor: "black",
    padding: "5px",
  },
}));

const FactionTableHeader = () => {
  const classes = useStyles();
  const TC = useContext(TableContext);

  return (
    <thead>
      <tr>
        <th></th>
        {TC.columns.map((col, i) => {
          let element = col.displayed ? (
            <th className={classes.header} key={i}>
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
