// material ui
import { Avatar, Badge, Typography } from "@mui/material";
// components and functions
import { spellTierIsText } from "./spellUtil";
// custom icons
import d20Icon from "../../assets/icons/d20.png";

/**
 * Component renders an icon showing a spell's tier onb top of a D20.
 * To keep the position as-is. the parent element needs a
 * relative and the two child elements an absolute position.
 * @param {object} props
 * @returns
 */
const TierIcon = (props) => {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <Typography
          sx={{
            color: "white", //
            fontFamily: "notMaryKate",
            paddingRight: "72px",
            paddingBottom: "68px",
          }}
        >
          {spellTierIsText(props.tier) ? "*" : props.tier}
        </Typography>
      }
    >
      <Avatar
        alt="Spellcost" //
        src={d20Icon}
        sx={{ width: 100, height: 100 }}
      />
    </Badge>
  );
};

export default TierIcon;
