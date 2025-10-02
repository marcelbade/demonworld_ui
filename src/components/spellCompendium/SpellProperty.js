import { Grid2 as Grid, Typography } from "@mui/material";
// icons
import EditButton from "./EditButton";
import EditSpells from "./EditSpells";

const SpellProperty = (props) => {
  return props.display ? (
    <Grid
      container //
      size={12}
      direction="row"
      sx={{
        paddingBottom: "2em", //
        paddingLeft: "2em",
      }}
      alignItems="center"
    >
      <EditButton
        display={props.userLoggedIn && props.user.isAdmin} //
        property={props.property}
        setPropertyToEdit={props.setPropertyToEdit}
        showActiveEdit={props.showActiveEdit}
        currentEdit={props.currentEdit}
      />
      <Grid size={1}>
        <Typography
          sx={{
            paddingLeft: "1em",
          }}
        >
          {props.title}
        </Typography>
      </Grid>
      <Grid size={10}>
        {props.userLoggedIn && //
        props.user.isAdmin &&
        props.property === props.propertyToEdit ? (
          <EditSpells
            property={props.property}
            setAllSpells={props.setAllSpells}
            selectedSpell={props.selectedSpell} //
            propertyToEdit={props.propertyToEdit}
            setSelectedSpell={props.setSelectedSpell}
            user={props.user}
            userLoggedIn={props.userLoggedIn}
            selectedFactionForSpell={props.selectedFactionForSpell}
            setDisplaySpells={props.setDisplaySpells}
            //
            content={props.content}
          />
        ) : (
          <Typography>{props.content}</Typography>
        )}
      </Grid>
    </Grid>
  ) : null;
};

export default SpellProperty;
