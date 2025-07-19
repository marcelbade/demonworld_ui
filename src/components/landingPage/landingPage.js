// React
import { useContext, useState } from "react";
// Material UI
import { Grid2 as Grid, Typography } from "@mui/material";
// icons
import deathIcon from "../../assets/icons/icons8-death-64.png";
import calculatorIcon from "../../assets/icons/icons8-calculator-64.png";
import bookIcon from "../../assets/icons/icons8-book-64.png";
import scrollIcon from "../../assets/icons/scroll.png";
// functions and components
import NaviButton from "./NaviButton";
import { LANDINGPAGE } from "../../constants/textsAndMessages";
import LightSwitch from "../shared/LightSwitch";
import LoginDialog from "../Dialogs/LogInDialog/LogInDialog";
import UserLogButton from "../Login/UserLogButton";
// contexts
import { UserContext } from "../../contexts/userContext";
import UserAccountDrawer from "../Login/UserAccountDrawer";

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
      <LoginDialog />
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

      <UserAccountDrawer
        showUserAvatarMenu={showUserAvatarMenu} //
        setShowUserAvatarMenu={setShowUserAvatarMenu}
      />
    </Grid>
  );
};

export default LandingPage;
