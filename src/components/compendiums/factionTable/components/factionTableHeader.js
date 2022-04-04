// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components & functions
import { uuidGenerator } from "../../../shared/sharedFunctions";

const useStyles = makeStyles({
  header: {
    backgroundColor: "black",
    color: "white",
    borderColor: "black",
    padding: "5px",
  },
});

const FactionTableHeader = (props) => {
  const classes = useStyles();

  return (
    <thead>
      <tr>
        <th></th>
        {props.columns.map((col) => {
          let element = col.displayed ? (
            <th className={classes.header} key={uuidGenerator()}>
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
