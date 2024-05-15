// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Grid, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// Functions And Components
import CustomIcon from "../shared/statCards/CustomIcon";
// context
import { MenuContext } from "../../contexts/MenuContext";

const LandingPageNaviButton = (props) => {
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

  return (
    <Grid
      item
      sx={{
        width: "20em",
        height: "20em",
        textAlign: "center",

        [theme.breakpoints.up("md")]: {
          width: "20em",
          height: "20em",
        },
        [theme.breakpoints.down("lg")]: {
          width: "10em",
          height: "10em",
        },
      }}
    >
      <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{props.altText}</Typography>}>
        <IconButton
          onClick={() => {
            toPage(props.relativeURL);
            MC.setOpenMenu(false);
          }}
          size="large"
        >
          <CustomIcon
            icon={props.icon} //
            altText={props.altText}
            height={HEIGHT_WIDTH}
            width={HEIGHT_WIDTH}
            boxHeight={HEIGHT_WIDTH_BOX}
            boxWidth={HEIGHT_WIDTH_BOX}
          />
        </IconButton>
      </Tooltip>
      <Typography
        sx={{
          fontSize: "15px",
          [theme.breakpoints.up("md")]: {
            display: "none",
          },
          [theme.breakpoints.down("lg")]: {},
        }}
      >
        {props.altText}
      </Typography>
    </Grid>
  );
};

export default LandingPageNaviButton;
