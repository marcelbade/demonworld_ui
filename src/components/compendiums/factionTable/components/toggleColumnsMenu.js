// React
import React, { useContext } from "react";
// material ui
import { Grid2 as Grid, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
// components & functions
import { TableContext } from "../../../../contexts/compendiumContext";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";
// custom hooks
import useCompendiumTableControl from "../../../../customHooks/UseCompendiumTableControl";

const ToggleColumnsMenu = () => {
  const compendiumTableControl = useCompendiumTableControl();

  const FORMGROUP = { display: "flex", justifyContent: "flex-start", flexDirection: "column", margin: "1em" };
  const TC = useContext(TableContext);

  return (
    <Grid //
      container
      direction="column"
    >
      <Grid //
        container
        size={12}
        direction="row"
      >
        {/* outer loop that goes through toogle groups and creates one box each */}
        {TC.toggleGroups.map((g, i) => {
          return (
            <FormGroup
              key={i} //
              sx={FORMGROUP}
            >
              <Checkbox
                key={i}
                checked={g.displayEntireGroup}
                onChange={() => {
                  compendiumTableControl.toggleGroupsOfColumns(g.toggleGroup);
                }}
              />
              {TC.columns
                .filter((column) => column.toggleGroup === g.toggleGroup)
                .map((c, i) => (
                  <FormControlLabel
                    key={i} //
                    control={
                      <Checkbox
                        key={i}
                        checked={c.displayed}
                        onChange={() => {
                          compendiumTableControl.toggleColumn(c.column, c.displayed);
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
      <Grid>
        <FormGroup sx={FORMGROUP}>
          <FormControlLabel
            control={
              <Checkbox
                checked={TC.allBoxes}
                onChange={() => {
                  compendiumTableControl.toggleAllColumns();
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
