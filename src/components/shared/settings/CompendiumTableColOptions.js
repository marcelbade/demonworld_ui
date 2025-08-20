// react
import { useContext } from "react";
// mui
import { FormGroup, Stack, Grid2 as Grid, Checkbox } from "@mui/material";
// contexts
import { CompendiumContext } from "../../../contexts/compendiumContext";
// components and functions
import CompendiumTableColToggleGroup from "./CompendiumTableColToggleGroup";
import useCompendiumTableControl from "../../../customHooks/UseCompendiumTableControl";

const CompendiumTableColOptions = () => {
  const CC = useContext(CompendiumContext);
  const compendiumTableControl = useCompendiumTableControl();

  return (
    <FormGroup>
      <Grid
        spacing={3} //
        container
        direction="row"
      >
        {CC.toggleGroups.map((group, i) => {
          return (
            <Stack
              key={i}
              direction="column" //
              sx={{
                zIndex: 0,
                border: "0.1em solid black",
                borderRadius: "1em",
                width: "12em",
                height: "30em",
                padding: "1em",
                marginTop: "1em",
              }}
            >
              {/* grid element is needed to prevent the border to appear inside the checkbox, every time the mouse hovers over it.*/}
              <Grid
                container
                justifyContent="center"
                sx={{
                  position: "relative",
                  bottom: "2.3em",
                  left: "3.7em",
                  width: "2em",
                  height: "2em",
                  backgroundColor: "white", //
                  zIndex: 1,
                }}
              >
                <Checkbox
                  checked={group.displayGroup}
                  onClick={() => {
                    compendiumTableControl.toggleGroupsOfColumns(group.toggleGroup);
                  }}
                />
              </Grid>
              <CompendiumTableColToggleGroup
                toggleGroup={group.columns} //
              />
            </Stack>
          );
        })}
      </Grid>
    </FormGroup>
  );
};

export default CompendiumTableColOptions;
