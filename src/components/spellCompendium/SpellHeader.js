// material ui
import { Grid2 as Grid, IconButton, Typography } from "@mui/material";
// custom components and functions
import { NO_SELECTION, spellTierIsText } from "./spellUtil";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";
import CreateSpellListPdfButton from "./CreateSpellListPdfButton";
import SpellTierSymbol from "./SpellTierSymbol";
//  icons
import MenuIcon from "@mui/icons-material/Menu";

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
        {props.selectedSpell === !NO_SELECTION ? (
          <CreateSpellListPdfButton
            selectedSpell={props.selectedSpell} //
            displaySpells={props.displaySpells}
            setDisplaySpells={props.setDisplaySpells}
          />
        ) : null}
        <Typography
          variant="h6" //
          align="center"
          sx={{
            width: "25%", //
            padding: "1.5em",
            color: "red",
          }}
        >
          {props.selectedSpell.faction}
        </Typography>
        <IconButton
          onClick={() => {
            props.toggleDrawer();
          }}
          sx={{ marginRight: { xs: "1em", sm: "1em", md: "3em" } }}
        >
          <MenuIcon fontSize="large" color="error" />
        </IconButton>
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
            marginBottom: "2em",
            color: "red",
            padding: { xs: "1em", sm: "0em", md: "0em" },
          }}
        >
          {props.selectedSpell.spellName}
        </Typography>
        <SpellTierSymbol
          tier={props.selectedSpell.spellTier} //
          display={props.selectedSpell !== NO_SELECTION}
          size={100}
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
