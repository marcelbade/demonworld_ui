// react
import { useContext } from "react";
// mui
import { FormControlLabel, FormGroup, Checkbox, Stack, Grid2 as Grid, Typography } from "@mui/material";
// contexts
import { CompendiumContext } from "../../../../contexts/compendiumContext";
//  custom hooks
import useCompendiumTableControl from "../../../../customHooks/UseCompendiumTableControl";

const CompendiumTableColOptions = () => {
  const CC = useContext(CompendiumContext);
  const compendiumTableControl = useCompendiumTableControl();

  const createOrderedDisplayArray = () => {
    // get all distinct toggle groups
    const allToggleGroups = CC.columns
      .map((c) => c.toggleGroup) //
      .reduce((distinct, e) => (distinct.indexOf(e) !== -1 ? distinct : [...distinct, e]), []);

    // create filter array
    const orderedDisplayArray = allToggleGroups.map((a) => {
      return { group: a, bttns: [] };
    });

    // fill filterArray
    for (let i = 0; i < allToggleGroups.length; i++) {
      for (let j = 0; j < CC.columns.length; j++) {
        const bttn = CC.columns[j];
        if (bttn.toggleGroup === orderedDisplayArray[i].group) {
          orderedDisplayArray[i].bttns.push(bttn);
        }
      }
    }

    return orderedDisplayArray;
  };

  return (
    <FormGroup>
      <Grid spacing={3} container direction="row">
        {createOrderedDisplayArray().map((e) => {
          return (
            <Stack
              direction="column" //
            >
              <Typography> {e.group}</Typography>
              {e.bttns.map((c, i) => {
                return (
                  <FormControlLabel
                    key={i}
                    control={
                      <Checkbox
                        checked={c.displayed}
                        onChange={() => {
                          compendiumTableControl.toggleColumn(c.column, c.displayed);
                        }}
                      />
                    }
                    label={c.label}
                  />
                );
              })}
            </Stack>
          );
        })}
      </Grid>
    </FormGroup>
  );
};

export default CompendiumTableColOptions;
