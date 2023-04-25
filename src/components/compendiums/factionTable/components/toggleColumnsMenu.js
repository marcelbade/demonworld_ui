// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { uuidGenerator } from "../../../shared/sharedFunctions";

const useStyles = makeStyles({
  toggleGroupBox: {
    border: 1,
    borderColor: "pink",
  },
  checkBoxLabel: {
    margin: "10px",
    width: "250px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "BreatheOfFire",
    },
  },
});

const ToggleColumnsMenu = (props) => {
  const classes = useStyles();

  return (
    <Grid item container xs={12} direction="row">
      {/* outer loop that goes through toogle groups and creates one box each */}
      {props.toggleGroups.map((toggle) => (
        <FormGroup className="classes.toggleGroupBox" key={uuidGenerator()}>
          <Checkbox
            key={uuidGenerator()}
            checked={toggle.displayed}
            onChange={() => {
              props.toggleGroupsOfColumns(toggle.unitName, toggle.stats, toggle.displayed);
            }}
          />
          {props.columns
            .filter((col) => col.column !== "button")
            .filter((col) => toggle.stats.includes(col.column))
            .map((col) => (
              <FormControlLabel
                key={uuidGenerator()}
                className={classes.checkBoxLabel}
                control={
                  <Checkbox
                    key={uuidGenerator()}
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
