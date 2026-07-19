// material ui
import { IconButton } from "@mui/material";
// icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CarousellButton = (props) => {
  const ICON_STYLE = { width: "100%", height: "100%" };

  return props.display ? (
    <IconButton
      onClick={() => {
        props.action();
      }}
      sx={{
          width:"2.5em",
          height:"2.5em",
      }}
    >
      {props.side === "left" ? ( //
        <ChevronLeft sx={ICON_STYLE} />
      ) : (
        <ChevronRight sx={ICON_STYLE} />
      )}
    </IconButton>
  ) : null;
};

export default CarousellButton;
