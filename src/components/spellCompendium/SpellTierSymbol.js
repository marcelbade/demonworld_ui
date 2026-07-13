// material ui
import { Avatar, Badge, Typography } from "@mui/material";
// components and functions
import { spellTierIsText } from "./spellUtil";
import { useContext } from "react";
// contexts
import { LightSwitchContext } from "../../contexts/lightSwitchContext";
// custom icons
import d20Icon from "../../assets/icons/d20.png";
import d20IconWhite from "../../assets/icons/d20-white.png";

/**
 * Component renders an icon showing a spell's tier on top of a D20.
 * This is achieved by using the MUI Avatar component.
 * @param {object} props
 *  - tier: integer, the spells tier / difficulty
 *  . size: height and width of the icon (icon is a square)
 * @returns a React component
 */
const SpellTierSymbol = (props) => {
  const LC = useContext(LightSwitchContext);

  /**
   * Function changes the icon color, depending on the
   * app theme.
   * @returns a dark or light png icon.
   */
  const themedAvatarIcon = () => {
    return LC.darkModeOff ? d20Icon : d20IconWhite;
  };

  return props.display ? (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <Typography
          variant="body1"
          sx={{
            color: LC.darkModeOff ? "white" : "black", //
            fontFamily: "notMaryKate",
            fontSize: "2em",
            paddingRight: "73px",
            paddingBottom: "68px",
          }}
        >
          {spellTierIsText(props.tier) ? "*" : props.tier}
        </Typography>
      }
    >
      <Avatar
        alt="Spellcost" //
        src={themedAvatarIcon()}
        sx={{ width: props.size, height: props.size }}
      />
    </Badge>
  ) : null;
};

export default SpellTierSymbol;
