// React
import React, { useContext } from "react";
// Material UI
import { Grid2 as Grid, Drawer } from "@mui/material";
// context
import { MenuContext } from "../../contexts/MenuContext";
// components and functions
import NaviButton from "../landingPage/NaviButton";
import LightSwitch from "./LightSwitch";
import ListDisplaySwitch from "./ListDisplaySwitch";
import CompendiumDropDown from "../compendiums/factionTable/components/CompendiumDropDown";
import { ID } from "../../constants/appBarConstants";
import { LANDINGPAGE } from "../../constants/textsAndMessages";
// icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

/**
 * Function renders an App Bar. The "hiddenElements" prob is used
 * to hide control elements that are not meant for the current page.
 * @param {{*}} props
 * @returns JSX
 */
const AppBar = (props) => {
  const MC = useContext(MenuContext);

  const controls = [
    {
      id: ID.RETURN_BTTN,
      elemnt: (
        <NaviButton
          relativeURL={"/"} //
          isIconButton={true}
          isCustomIcon={false}
          icon={ChevronLeftIcon}
          altText={LANDINGPAGE.BACK_TO_LANDINGPAGE}
          width={"3em"}
          height={"3em"}
        />
      ),
    },
    { id: ID.LIST_DISPLAY, elemnt: <ListDisplaySwitch bttnSize="medium" /> },
    { id: ID.COMPENDIMUM_DROPDOWN, elemnt: <CompendiumDropDown /> },
    { id: ID.LIGHT_SWITCH, elemnt: <LightSwitch bttnSize="medium" /> },
  ];

  return (
    <Drawer
      open={MC.openMenu} //
      onClose={() => {
        MC.setOpenMenu(false);
      }}
      anchor="top"
    >
      <Grid
        container
        direction="row" //
        alignItems="center"
        alignContent="center"
        justifyContent="space-around"
      >
        {controls
          .filter((c) => !props.hiddenElements.includes(c.id))
          .map((c, i) => (
            <Grid key={i} item>
              {c.elemnt}
            </Grid>
          ))}
      </Grid>
    </Drawer>
  );
};

export default AppBar;
