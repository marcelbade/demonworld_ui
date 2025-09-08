// react
import { useContext } from "react";
// material ui
import { Collapse } from "@mui/material";
// components and functions
import TopMenuDrawer from "./TopMenuDrawer";
// context
import { MenuContext } from "../../contexts/MenuContext";

const CollapsableTopMenuDrawer = (props) => {
  const MC = useContext(MenuContext);

  return (
    <Collapse
      sx={{ width: "40vw" }} //
      in={MC.openTopMenuDrawer}
      direction="down"
    >
      <TopMenuDrawer
        displayPageTitle={props.displayPageTitle}
        title={props.title} //
        drawerVariant="temporary" //
        displayNaviBttn={props.displayNaviBttn}
        displayListBttns={props.displayListBttns}
      />
    </Collapse>
  );
};

export default CollapsableTopMenuDrawer;
