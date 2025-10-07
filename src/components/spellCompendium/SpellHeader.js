// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
// custom components and functions
import { spellTierIsText } from "./spellUtil";
import TierIcon from "./TierIcon";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";

const SpellHeader = (props) => {
  return (
    <>
      <Grid
        container //
        direction="column"
        alignItems="center"
        size={12}
      >
        <CollapsableTopMenuDrawer
          displayPageTitle={true}
          title={""} //
          displayNaviBttn={true}
          displayListBttns={true}
        />
        <TopDrawerButton />
      </Grid>
      <Grid
        container //
        direction="row"
        justifyContent="space-between"
        size={12}
      >
        <Typography
          variant="h6" //
          align="right"
          sx={{
            width: "100%", //
            paddingRight: "5em",
            paddingTop: "1em",
          }}
        >
          {props.faction}
        </Typography>
      </Grid>
      <Typography
        variant="h5" //
        align="center"
        sx={{
          width: "100%", //
        }}
      >
        {props.spellName}
      </Typography>
      <TierIcon tier={props.spellTier} />

      <Typography
        variant="body1" //
        align="center"
        sx={{
          width: "100%", //
          paddingBottom: "3em",
        }}
      >
        {spellTierIsText(props.spellTier) ? props.spellTier : " "}
      </Typography>
    </>
  );
};

export default SpellHeader;
