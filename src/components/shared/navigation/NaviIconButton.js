// Functions And Components
import CustomIcon from "../CustomIcon";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// icons
import { ChevronLeft } from "@mui/icons-material";

const NaviIconButton = (props) => {
  const SIZE = "100px";
  const BOX_SIZE = "135px";

  return (
    <Tooltip title={props.toolTipText}>
      <IconButton
        onClick={() => {
          props.toPage(props.relativeURL);
          props.openMenu(false);
        }}
        // sx={{
        //   width: props.boxWidth, //
        //   height: props.boxHeight,
        // }}
      >
        {props.isCustomIcon ? (
          <CustomIcon
            icon={props.icon} //
            altText={props.altText}
            width={props.iconWidth !== null ? props.iconWidth : SIZE}
            height={props.iconHeight !== null ? props.iconHeight : SIZE}
            boxWidth={props.boxWidth !== null ? props.iconHeight : BOX_SIZE}
            boxHeight={props.boxHeight !== null ? props.iconHeight : BOX_SIZE}
          />
        ) : (
          <ChevronLeft sx={{ fontSize: "50px" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default NaviIconButton;
