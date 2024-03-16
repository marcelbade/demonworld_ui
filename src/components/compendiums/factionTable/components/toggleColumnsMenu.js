// React
import React from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  formGroup: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    margin: "1em",
  },
});

const ToggleColumnsMenu = (props) => {
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <Grid item container xs={12} direction="row">
        {/* outer loop that goes through toogle groups and creates one box each */}
        {props.toggleGroups.map((g, i) => {
          return (
            <FormGroup
              key={i} //
              className={classes.formGroup}
            >
              <Checkbox
                key={i}
                checked={g.displayEntireGroup}
                onChange={() => {
                  props.toggleGroupsOfColumns(g.toggleGroup);
                }}
              />
              {props.columns
                .filter((column) => column.toggleGroup === g.toggleGroup)
                .map((c, i) => (
                  <FormControlLabel
                    key={i} //
                    control={
                      <Checkbox
                        key={i}
                        checked={c.displayed}
                        onChange={() => {
                          props.toggleColumn(c.column, c.displayed);
                        }}
                      />
                    }
                    label={c.label}
                  />
                ))}
            </FormGroup>
          );
        })}
      </Grid>
      <Grid item>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.allBoxes}
                onChange={() => {
                  props.toggleAllColumns();
                }}
              />
            }
            label={COMPENDIUM.TOGGLE_OFF_ALL_COLUMNS}
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default React.memo(ToggleColumnsMenu);
