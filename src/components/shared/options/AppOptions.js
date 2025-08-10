import { Grid2 as Grid } from "@mui/material";
import CompendiumDropdDown from "../../compendiums/factionTable/components/CompendiumDropDown";
import ListDisplaySwitch from "../ListDisplaySwitch";
import LightSwitch from "../LightSwitch";



const AppOptions = () => {
  return (
    <Grid>
      <CompendiumDropdDown />
      <ListDisplaySwitch bttnSize="medium" />
      <LightSwitch bttnSize="medium" />
    </Grid>
  );
};

export default AppOptions;
