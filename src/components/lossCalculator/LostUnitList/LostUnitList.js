// React
import { useContext } from "react";
//Material UI
import { Grid2 as Grid, List, Typography } from "@mui/material";
// components and functions
import LostUnitListElement from "./LostUnitListElement";
// contexts
import { LossCalcContext } from "../../../contexts/LossCalculatorContext";

const LostUnitList = () => {
  const LC = useContext(LossCalcContext);

  /**
   * Function takes the current list of lost units, extracts
   * all sub faction names, removes duplicates
   * and returns them.
   * @returns an array contain the distinct sub faction
   * names for the current list
   */
  const getSubFactionsFromList = () => {
    return [...new Set(LC.list.filter((u) => u.points > 0).map((u) => u.subFaction))];
  };

  return getSubFactionsFromList().map((subFaction, i) => {
    return (
      <Grid sx={{ paddingTop: "2em" }} key={i}>
        <Typography variant="h6">{subFaction}</Typography>
        <List
          sx={{
            width: "25em",
          }}
        >
          {LC.list
            .filter((unit) => unit.subFaction === subFaction && unit.points > 0)
            .sort((a, b) => a.unitName > b.unitName)
            .map((u, i) => {
              return (
                <LostUnitListElement
                  unit={u} //
                  index={i}
                  key={i}
                />
              );
            })}
        </List>
      </Grid>
    );
  });
};

export default LostUnitList;
