// react
import { useTheme } from "@emotion/react";
// material ui
import { Drawer, IconButton } from "@mui/material";
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelection/AlternativeArmyListSelector";
import FactionTreeView from "./SelectorTreeView/FactionTreeView";
// icons
import CancelIcon from "@mui/icons-material/Cancel";

const ArmySelectionBox = (props) => {
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
          width: "28em",
        },
      }}
    >
      <span>
        <IconButton
          onClick={props.toggleUnitTree}
          fontSize="large"
          sx={{
            marginTop: "0.5em",
            marginBottom: "0.5em",
            marginLeft:"16em"
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

export default ArmySelectionBox;
