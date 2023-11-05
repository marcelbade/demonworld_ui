// React
import React from "react";
import makeStyles from '@mui/styles/makeStyles';

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
        {props.columns.map((col, i) => {
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
