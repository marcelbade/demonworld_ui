// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
// custom components and functions
import { spellTierIsText } from "./spellUtil";
import TierIcon from "./TierIcon";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";
import CreateSpellListPdfButton from "./CreateSpellListPdfButton";

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
          displayPageTitle={true} //
          title={""}
          displayNaviBttn={true}
          displayListBttns={true}
        />
        <TopDrawerButton />
      </Grid>
      <Grid
        container //
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        size={12}
      >
        <CreateSpellListPdfButton
          selectedSpell={props.selectedSpell} //
          displaySpells={props.displaySpells}
          setDisplaySpells={props.setDisplaySpells}
        />
        <Typography
          variant="h6" //
          align="right"
          sx={{
            width: "25%", //
            paddingRight: "5em",
            paddingTop: "1em",
          }}
        >
          {props.selectedSpell.faction}
        </Typography>
      </Grid>
      <Grid
        container // ###
        alignContent="center"
        justifyContent="center"
        sx={{
          width: "100%",
          marginBottom: "3em",
        }}
      >
        <Typography
          variant="h5" //
          align="center"
          sx={{
            width: "100%", //
          }}
        >
          {props.selectedSpell.spellName}
        </Typography>
        <TierIcon
          tier={props.selectedSpell.spellTier} //
          size = {100}
        />

        {spellTierIsText(props.selectedSpell.spellTier) ? (
          <Typography
            variant="body1" //
            align="center"
            sx={{
              width: "100%", //
              marginTop: "3em",
            }}
          >
            {props.selectedSpell.spellTier}
          </Typography>
        ) : null}
      </Grid>
    </>
  );
};

export default SpellHeader;
