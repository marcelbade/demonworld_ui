// React
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// context
import { MenuContext } from "../../../contexts/MenuContext";
// Functions And Components
import NaviTextButton from "./NaviTextButton";
import NaviIconButton from "./NaviIconButton";
import { Grid2 as Grid } from "@mui/material";

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
const NavigationButton = (props) => {
  const history = useHistory();

  const MC = useContext(MenuContext);

  const toPage = (relativeURL) => {
    history.push({
      pathname: relativeURL,
      state: {
        lastPage: "landingPage",
        selectedArmy: [],
      },
    });
  };

  return props.displayNavigatonBttn ? (
    <Grid>
      {props.isIconButton ? (
        <NaviIconButton
          toPage={toPage} //
          openMenu={MC.setOpenMenu}
          relativeURL={props.relativeURL}
          toolTipText={props.toolTipText}
          icon={props.icon}
          isCustomIcon={props.isCustomIcon}
          iconWidth={props.iconWidth}
          iconHeight={props.iconHeight}
          boxWidth={props.boxWidth}
          boxHeight={props.boxHeight}
        />
      ) : (
        <NaviTextButton
          toPage={toPage} //
          openMenu={MC.setOpenMenu}
          relativeURL={props.relativeURL}
          textButtonVariant={props.textButtonVariant}
          text={props.toolTipText}
        />
      )}
    </Grid>
  ) : null;
};

export default NavigationButton;
