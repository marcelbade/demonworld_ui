// React
import { useContext } from "react";
// Material UI
import { Grid2 as Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";
// components and functions
import { ListDisplayContext } from "../../contexts/ListDisplayContext";
// icons
import MenuIcon from "@mui/icons-material/Menu";
import ListAltIcon from "@mui/icons-material/ListAlt";

const ListDisplaySwitch = (props) => {
  const LDC = useContext(ListDisplayContext);

  const style = {
    fontSize: props.iconSize, //
    marginTop: "0.3em",
  };

  const toggleListMode = () => {
    LDC.setSimpleMode((prevState) => !prevState);
  };

  return (
    <Grid
      container //
      direction="row"
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch //
              id="toggleAllButtons"
              color="error"
              checked={!LDC.simpleModeOn}
              onChange={toggleListMode}
            />
          }
        />
      </FormGroup>

      {LDC.simpleModeOn ? ( //
        <MenuIcon sx={style} />
      ) : (
        <ListAltIcon sx={style} />
      )}
    </Grid>
  );
};

export default ListDisplaySwitch;
