// react
import { useContext } from "react";
// mui
import { FormGroup, Stack, Grid2 as Grid } from "@mui/material";
// contexts
import { CompendiumContext } from "../../../contexts/compendiumContext";
// components and functions
import CompendiumTableColToggleGroup from "./CompendiumTableColToggleGroup";

const CompendiumTableColOptions = () => {
  const CC = useContext(CompendiumContext);

  const createOrderedDisplayArray = () => {
    const distinctToggleGroups = findDistinctGroupings();
    const objectArray = createDataStructure(distinctToggleGroups);

    for (let i = 0; i < distinctToggleGroups.length; i++) {
      for (let j = 0; j < CC.columns.length; j++) {
        const bttn = CC.columns[j];
        if (bttn.toggleGroup === objectArray[i].group) {
          objectArray[i].bttns.push(bttn);
        }
      }
    }

    return objectArray;
  };

  const findDistinctGroupings = () => {
    return CC.columns
      .map((c) => c.toggleGroup) //
      .reduce((distinct, e) => (distinct.indexOf(e) !== -1 ? distinct : [...distinct, e]), []);
  };

  const createDataStructure = (distinctToggleGroups) => {
    return distinctToggleGroups.map((a) => {
      return {
        group: a, //
        bttns: [],
      };
    });
  };

  return (
    <FormGroup>
      <Grid
        spacing={3} //
        container
        direction="row"
      >
        {createOrderedDisplayArray().map((e) => {
          return (
            <Stack
              direction="column" //
            >
              <CompendiumTableColToggleGroup
                toggleGroup={e.bttns} //
              />
            </Stack>
          );
        })}
      </Grid>
    </FormGroup>
  );
};

export default CompendiumTableColOptions;
