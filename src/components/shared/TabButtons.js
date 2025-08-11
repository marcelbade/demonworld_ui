// material ui
import { Button, Stack } from "@mui/material";

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
          borderBottom: props.showBottomBorder ? "solid 0.1em black" : null,
          borderRadius: 0,
          width: "70%",
        }
      : { width: "70%" };
  };

  return (
    <Stack
      direction={props.direction} //
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
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
    </Stack>
  );
};

export default TabButtons;
