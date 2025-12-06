// React
import { useContext } from "react";
// components and functions
import { LightSwitchContext } from "../../contexts/lightSwitchContext";
import { Icon } from "@mui/material";

/**
 * Component renders a custom svg icon by wrapping an HTML <img> element
 * in a material ui <Icon> component. Component toggles the svg color
 * from white to black when the theme changes.
 * PLEASE NOT: requires a context called LightSwitchContext to toggle the color.
 * @param {*} props
 *  - icon
 *  - altText
 *  - width
 *  - seize
 *  - boxWidth (NOTE: not)
 *  - boxHeight
 * @returns an Icon element with an svg icon.
 */
const CustomIcon = (props) => {
  const LC = useContext(LightSwitchContext);

  const STYLES = {
    height: props.boxHeight, //
    width: props.boxWidth,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  /**
   *Function toggles the color of the custom icons.
   * All icons in the app are black.
   * When using dark mode, the color is inverted.
   * The Same is true for icons on a dark background.
   * @returns a plain js objkect containing css attributes.
   */
  const toggleIconColor = () => {
    return !LC.darkModeOff || props.darkBackGround
      ? {
          ...STYLES,
          webkitFilter: `invert(100%)`,
          filter: `invert(100%)`,
        }
      : STYLES;
  };

  const toggleCheckBoxIcon = () => {
    return props.checkedBoxIcon
      ? {
          ...STYLES,
          webkitFilter: `opacity(50%) grayscale(50%)`,
          filter: `opacity(50%) grayscale(50%)`,
        }
      : STYLES;
  };

  return (
    <Icon
      sx={{
        ...toggleIconColor(), //
        ...toggleCheckBoxIcon(),
        width: props.width,
        height: props.height,
        ...props.css,
      }}
    >
      <img
        src={props.icon} //
        width={props.width}
        height={props.height}
        alt={props.altText}
      />
    </Icon>
  );
};

export default CustomIcon;
