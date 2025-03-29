// React
import React, { useContext, useState } from "react";
// Material UI
import { Button, Drawer, Grid2 as Grid, IconButton, Typography } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
import scrollIcon from "../../assets/icons/scroll.png";
import CancelIcon from "@mui/icons-material/Cancel";
// functions and components
import NaviButton from "./NaviButton";
import { LANDINGPAGE, USER_AUTH } from "../../constants/textsAndMessages";
import LightSwitch from "../shared/LightSwitch";
import LoginPrompt from "../Login/LogInPrompt";
import UserLogButton from "../Login/UserLogButton";
// contexts
import { UserContext } from "../../contexts/userContext";

const LandingPage = () => {
  const UC = useContext(UserContext);

  const [showUserAvatarMenu, setShowUserAvatarMenu] = useState(false);

  const naviButtons = [
    { text: LANDINGPAGE.COMPENDIUM, relativeURL: "/compendium", icon: bookIcon, display: true },
    { text: LANDINGPAGE.LIST_GENERATOR, relativeURL: "/listGenerator", icon: calculatorIcon, display: true },
    { text: LANDINGPAGE.LOSS_CALCULATOR, relativeURL: "/lossCalculator", icon: deathIcon, display: true },
    { text: LANDINGPAGE.CARD_CREATOR, relativeURL: "/cardCreator", icon: scrollIcon, display: UC.userLoggedIn },
  ];

  return (
    <Grid
      container //
      direction="row"
    >
      <Grid
        container //
        justifyContent={"space-between"}
        sx={{
          width: "100%",
          height: "3em",
        }}
      >
        <Typography variant="h3">{LANDINGPAGE.TITLE}</Typography>
        <Grid
          container
          justifyContent={"space-between"} //
          size={0.75}
          paddingRight="2em"
        >
          <LightSwitch iconSize={"large"} />
          <UserLogButton
            iconSize={"large"} //
            setShowUserAvatarMenu={setShowUserAvatarMenu}
          />
        </Grid>
      </Grid>
      <LoginPrompt />
      <Grid
        container //
        justifyContent="center"
        alignContent="center"
        sx={{
          height: "80vh",
          width: "100vw",
        }}
      >
        {naviButtons.map((n, i) =>
          n.display ? (
            <NaviButton
              key={i}
              relativeURL={n.relativeURL} //
              isIconButton={true}
              isCustomIcon={true}
              icon={n.icon}
              text={n.text}
              width={"20em"}
              height={"20em"}
            />
          ) : null
        )}
      </Grid>

      <Drawer
        anchor={"right"} //
        variant="persistent"
        open={showUserAvatarMenu}
      >
        <Grid
          container //
          alignItems="self-start"
          flexDirection="column"
          sx={{
            width: "25em",
          }}
        >
          <IconButton
            onClick={() => {
              setShowUserAvatarMenu(false);
            }} //
            sx={{
              paddingTop: "1em",
              paddingLeft: "1em",
              marginBottom: "5em",
            }}
          >
            <CancelIcon />
          </IconButton>
          <Grid
            container
            flexDirection="column"
            alignItems="center"
            justifyItems="center"
            sx={{
              width: "100%",
            }}
          >
            <Button
              onClick={() => {
                // TODO logout
              }} //
              variant="outlined"
              sx={{
                marginBottom: "5em",
              }}
            >
              {USER_AUTH.LOGOUT_ACCOUNT}
            </Button>
            <Button
              onClick={() => {
                // TODO switch users
              }} //
              variant="outlined"
              sx={{
                marginBottom: "5em",
              }}
            >
              {USER_AUTH.SWITCH_USER}
            </Button>
            <Button
              onClick={() => {
                // TODO change password
              }} //
              variant="outlined"
            >
              {USER_AUTH.CHANGE_PASSWORD}
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </Grid>
  );
};

export default LandingPage;
