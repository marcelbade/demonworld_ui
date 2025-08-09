// material ui
import { Button, Grid2 as Grid } from "@mui/material";

const TabButtons = (props) => {
  /**
   * Function controls the buttons` styling. The selected Button/Tab
   * is highlighted.
   * @param {int} tab
   * @param {int} index
   * @param {boolean} showBttn
   * @returns an object with css properties.
   */
  const styleButtons = (tab, index) => {
    return tab === index //
      ? {
          backgroundColor: "lightgrey", //
          borderBottom: "solid 0.1em black",
          borderRadius: 0,
          width: "50%",
        }
      : { width: "50%" };
  };

  return (
    <Grid
      container
      direction="row" //
      sx={{ width: "35em" }}
    >
      {props.altPanels.map((panel, i) => (
        <Button
          key={i}
          sx={styleButtons(props.tabValue, i)}
          onClick={() => {
            props.handleTabChange(i);
          }}
        >
          {panel}
        </Button>
      ))}
    </Grid>
  );
};

export default TabButtons;
