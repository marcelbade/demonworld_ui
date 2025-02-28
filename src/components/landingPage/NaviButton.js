// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Grid, Tooltip, Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
// Functions And Components
import CustomIcon from "../shared/CustomIcon";
// context
import { MenuContext } from "../../contexts/MenuContext";

const NaviButton = (props) => {
  const history = useHistory();
  const theme = useTheme();

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

  const renderChild = (icon) => {
    const Icon = icon;
    return <Icon fontSize="large" />;
  };

  return (
    <Grid
      item
      sx={{
        width: props.width,
        height: props.height,
        textAlign: "center",
      }}
    >
      {props.isIconButton ? (
        <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{props.text}</Typography>}>
          <IconButton
            onClick={() => {
              toPage(props.relativeURL);
              MC.setOpenMenu(false);
            }}
          >
            {props.isCustomIcon ? (
              <CustomIcon
                icon={props.icon} //
                altText={props.text}
                height={HEIGHT_WIDTH}
                width={HEIGHT_WIDTH}
                boxHeight={HEIGHT_WIDTH_BOX}
                boxWidth={HEIGHT_WIDTH_BOX}
              />
            ) : (
              renderChild(props.icon)
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <Button
          onClick={() => {
            toPage(props.relativeURL);
            MC.setOpenMenu(false);
          }}
        >
          {props.text}
        </Button>
      )}
      <Typography
        sx={{
          fontSize: "15px",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
          [theme.breakpoints.down("lg")]: {},
        }}
      >
        {props.text}
      </Typography>
    </Grid>
  );
};

export default NaviButton;
