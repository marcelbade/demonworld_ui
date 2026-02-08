// material ui
import { Button, Stack, Typography } from "@mui/material";

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
          // borderBottom: props.showBottomBorder ? "solid 0.1em black" : null,
          // borderRadius: 0,
          width: "60%",
          "&:hover": {
            backgroundColor: "lightgrey",
          },
        }
      : {
          width: "60%",
          "&:hover": {
            backgroundColor: "lightgrey",
          },
        };
  };

  return (
    <Stack
      direction={props.direction} //
    >
      {props.altPanels.map((panel, i) => (
        <Button
          key={i}
          sx={styleButtons(props.tabValue, i)}
          onClick={() => {
            props.handleTabChange(i);
          }}
        >
          <Typography align="center" sx={{ width: "100%" }}>
            {panel}
          </Typography>
        </Button>
      ))}
    </Stack>
  );
};

export default TabButtons;
