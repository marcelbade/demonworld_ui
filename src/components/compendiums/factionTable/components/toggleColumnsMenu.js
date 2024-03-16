// React
import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const useStyles = makeStyles({
  toggleGroupBox: {
    border: 1,
    borderColor: "pink",
  },
  checkBoxLabel: {
    margin: "10px",
    width: "250px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "NotMaryKate",
    },
  },
});

const ToggleColumnsMenu = (props) => {
  const classes = useStyles();

  return (
    <Grid item container xs={12} direction="row">
      {/* outer loop that goes through toogle groups and creates one box each */}
      {props.toggleGroups.map((toggle, i) => (
        <FormGroup className="classes.toggleGroupBox" key={i}>
          <Checkbox
            checked={toggle.displayed}
            onChange={() => {
              props.toggleGroupsOfColumns(toggle.unitName, toggle.stats, toggle.displayed);
            }}
          />
          {props.columns
            .filter((col) => col.column !== "button")
            .filter((col) => toggle.stats.includes(col.column))
            .map((col, i) => (
              <FormControlLabel
                className={classes.checkBoxLabel}
                key ={i}
                control={
                  <Checkbox
                    checked={col.displayed}
                    onChange={() => {
                      props.chooseColumnsToDisplay(col.column, col.displayed);
                    }}
                  />
                }
                label={col.label}
              />
            ))}
        </FormGroup>
      ))}
      <FormGroup>
        <FormControlLabel
          className={classes.checkBoxLabel}
          control={
            <Checkbox
              checked={!props.allBoxes}
              onChange={() => {
                props.toggleAllColumns();
              }}
            />
          }
          label="Blende alle Spalten aus."
        />
      </FormGroup>
    </Grid>
  );
};

export default React.memo(ToggleColumnsMenu);
