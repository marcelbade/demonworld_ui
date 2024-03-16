// React
import React from "react";
// material ui
import makeStyles from "@mui/styles/makeStyles";
import { Grid, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";

const useStyles = makeStyles({
  checkBoxLabel: {
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
      {props.toggleGroups
        .filter((g) => g.toggleGroup !== "button")
        .map((g, i) => {
          return (
            <FormGroup key={i}>
              <Checkbox
                key={i}
                checked={g.displayEntireGroup}
                onChange={() => {
                  props.toggleGroupsOfColumns(g.toggleGroup); //TODO
                }}
              />
              {props.columns
                .filter((column) => column.toggleGroup === g.toggleGroup)
                .map((c, i) => (
                  <FormControlLabel
                    key={i} //
                    sx={{
                      backgroundColor: "green", //
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
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

      <FormGroup>
        <FormControlLabel
          className={classes.checkBoxLabel}
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
  );
};

export default React.memo(ToggleColumnsMenu);
