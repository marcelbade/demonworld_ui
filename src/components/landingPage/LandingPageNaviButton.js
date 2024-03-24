// React
import React from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Grid, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// Functions And Components
import CustomIcon from "../shared/statCards/CustomIcon";

 

const LandingPageNaviButton = (props) => {
  const history = useHistory();
  const theme =useTheme

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
          }}
          size="large"
        >
          <CustomIcon
            icon={props.icon} //
            altText={props.altText}
            height={100}
            width={100}
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
