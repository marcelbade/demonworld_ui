// material ui
import { Grid2 as Grid, IconButton, Typography } from "@mui/material";
// custom components and functions
import { spellTierIsText } from "./spellUtil";
import SpellTierSymbol from "./SpellTierSymbol";
import SpellNameAndSelectors from "./SpellNameAndSelectors";
//  icons
import MenuIcon from "@mui/icons-material/Menu";

const SpellHeader = (props) => {
  return (
    <>
      <Grid
        container //
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        size={12}
      >
        <Typography
          variant="h6" //
          align="center"
          sx={{
            width: "25%", //
            padding: "0.5em",
            color: "red",
          }}
        >
          {props.selectedSpell.faction}
        </Typography>

        <IconButton
          onClick={() => {
            props.toggleDrawer();
          }}
          sx={{ marginRight: { xs: "1em", md: "3em" } }}
        >
          <MenuIcon fontSize="large" color="error" />
        </IconButton>
      </Grid>
      <Grid
        container // ###
        direction="column"
        alignContent="center"
        justifyContent="center"
        sx={{
          width: "100%",
          marginBottom: "3em",
        }}
      >
        <Grid container size={12} alignContent="center" justifyContent="center">
          <SpellNameAndSelectors
            display={props.selectedSpell.spellName !== ""}
            selectedSpell={props.selectedSpell} //
            setSelectedSpell={props.setSelectedSpell} //
            displaySpells={props.displaySpells}
          />
        </Grid>
        <Grid container size={12} alignContent="center" justifyContent="center">
          <SpellTierSymbol
            tier={props.selectedSpell.spellTier} //
            display={props.selectedSpell.spellName !== ""}
            size={100}
          />
        </Grid>
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
