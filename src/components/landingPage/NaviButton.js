// React
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Tooltip, Typography, Button } from "@mui/material";
// Functions And Components
import CustomIcon from "../shared/CustomIcon";
// context
import { MenuContext } from "../../contexts/MenuContext";
// icons
import { ChevronLeft } from "@mui/icons-material";


/**
 * This JSX component displays a navigation button. To account for all use cases, the
 * button can be displayed as either icon or text button and can receive either mui
 * icons or custom icons
 * @param {props}
 * - isIconButton: boolean
 * - isCustomIcon: boolean
 * - relativeURL: string
 * - toolTipText: string
 * - icon: any svg icon
 * - altText: String
 * - textButtonVariant: String
 * @returns JSX
 */
const NaviButton = (props) => {
  const history = useHistory();

  const MC = useContext(MenuContext);

  const HEIGHT_WIDTH = "100px";
  const HEIGHT_WIDTH_BOX = "135px";

  const toPage = (relativeURL) => {
    history.push({
      pathname: relativeURL,
      state: {
        lastPage: "landingPage",
        selectedArmy: [],
      },
    });
  };

  return props.isIconButton ? (
    <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{props.toolTipText}</Typography>}>
      <IconButton
        onClick={() => {
          toPage(props.relativeURL);
          MC.setOpenMenu(false);
        }}
      >
        {props.isCustomIcon ? (
          <CustomIcon
            icon={props.icon} //
            altText={props.altText}
            height={HEIGHT_WIDTH}
            width={HEIGHT_WIDTH}
            boxHeight={HEIGHT_WIDTH_BOX}
            boxWidth={HEIGHT_WIDTH_BOX}
          />
        ) : (
          <ChevronLeft sx={{ fontSize: "50px" }} />
        )}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      variant={props.textButtonVariant}
      onClick={() => {
        toPage(props.relativeURL);
        MC.setOpenMenu(false);
      }}
    >
      {props.text}
    </Button>
  );
  // <Typography
  //   sx={{
  //     fontSize: "15px",
  //     [theme.breakpoints.up("md")]: {
  //       display: "none",
  //     },
  //     [theme.breakpoints.down("lg")]: {},
  //   }}
  // >
  //   {props.text}
  // </Typography>
};

export default NaviButton;
