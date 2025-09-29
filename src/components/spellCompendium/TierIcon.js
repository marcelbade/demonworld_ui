// material ui
import { Grid2 as Grid, Icon, Typography } from "@mui/material";
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
    <Grid
      sx={{
        position: "relative",
        width: "100%",
        height: "10em",
      }}
    >
      <Icon
        sx={{
          zIndex: "1",
          width: "15em", //
          height: "15em",
          position: "absolute",
          top: "1em",
          right: "36.5em",
        }}
      >
        <img
          src={d20Icon} //
          height={"30%"}
          width={"30%"}
          alt={"props.altText"}
        />
      </Icon>
      <Typography
        variant="h5"
        sx={{
          zIndex: "100",
          color: "white",
          position: "absolute",
          top: "2.65em",
          right: "43.75em",
        }}
      >
        {spellTierIsText(props.tier) ? "*" : props.tier}
      </Typography>
    </Grid>
  );
};

export default TierIcon;
