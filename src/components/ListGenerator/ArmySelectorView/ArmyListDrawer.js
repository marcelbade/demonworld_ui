// react
import { useTheme } from "@emotion/react";
// material ui
import { Drawer, IconButton } from "@mui/material";
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelection/AlternativeArmyListSelector";
import FactionTreeView from "./SelectorTreeView/FactionTreeView";
// icons
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * JSX element. Returns drawer containing all selectable army units
 * (ad ally units, if applicable) as an ordered tree
 * @param {*} props:
 *    - openArmySelectionBox: true, if element is displayed
 *    - toggleUnitTree: toggles openArmySelectionBox
 * @returns a JSX element.
 */
const ArmyListDrawer = (props) => {
  const theme = useTheme();

  return (
    <Drawer
      anchor={"left"} //
      variant="persistent"
      open={props.openArmySelectionBox}
      sx={{
        "& .MuiPaper-root": {
          paddingTop: "0.5em",
          backgroundColor: theme.palette.contrastedOptions, //
          position: "fixed",
          overflowY: "auto",
          height: "100%",
          width: { xs: "20em", md: "28em" },
        },
      }}
    >
      <span>
        <IconButton
          onClick={props.toggleUnitTree}
          fontSize="large"
          sx={{
            marginTop: { xs: "1em", md: "0.5em" },
            marginBottom: "0.5em",
            marginLeft: { xs: "10em", md: "16em" },
          }}
        >
          <CancelIcon />
        </IconButton>
      </span>
      <AlternativeArmyListSelector />
      <FactionTreeView />
    </Drawer>
  );
};

export default ArmyListDrawer;
