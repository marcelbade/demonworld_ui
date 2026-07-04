// react
import { useContext } from "react";
import { useTheme } from "@emotion/react";
// material ui
import { Grid, MenuItem, Select, Typography } from "@mui/material";
// functions and components
import CompendiumTableColOptions from "./CompendiumTableColOptions";
// context
import { CompendiumContext } from "../../../contexts/compendiumContext";
// constants
import { COMPENDIUM, OPTIONS } from "../../../constants/textsAndMessages";

const CompendiumSettings = () => {
  const CC = useContext(CompendiumContext);
  const theme = useTheme();

  const handleChange = (event) => {
    CC.setRowNumber(event.target.value);
  };

  const fillArray = () => {
    let result = [];
    for (let i = 0; i <= 100; i++) {
      if (i % 10 === 0) {
        result.push(i);
      }
    }
    return result;
  };

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{
        height: "100%",
      }}
    >
      <Typography
        variant="h6" //
        sx={theme.palette.options.title}
      >
        {OPTIONS.COMPENDIUM_ROWS_TITLE}
      </Typography>
      <Typography variant="body1">{OPTIONS.COMPENDIUM_EXPLAINATION}</Typography>
      <CompendiumTableColOptions />
      <Grid
        container //
        direction="column"
        sx={{ marginTop: "2em" }}
      >
        <Typography
          variant="body1" //
        >
          {COMPENDIUM.NUMBER_OF_ROWS}
        </Typography>
        <Typography
          variant="body1" //
          color="error"
        >
          {COMPENDIUM.ROWS_WARNING}
        </Typography>
        <Select
          labelId="rowSelect" //
          id="rowSelect"
          value={CC.rowNumber}
          label="Anzahl"
          onChange={handleChange}
          sx={{ width: "7em" }}
        >
          {fillArray().map((i) => (
            <MenuItem key={i} value={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default CompendiumSettings;
