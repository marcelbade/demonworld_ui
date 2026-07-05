import { Grid, Typography } from "@mui/material";
// icons
import EditButton from "./EditButton";
import EditSpellProperty from "./EditSpellProperty";
import { useState } from "react";

/**
 * Component renders the text discription one property of a spell (target, requirment, duration,...)
 * as formatted text. If the user is logged in and has admin credentials, it instead displays the edit
 * spell component.
 * @param {object} props
 * @returns a React component
 */
const SpellProperty = (props) => {
  const [displayTextInputField, setDisplayTextInputField] = useState(false);

  return props.display ? (
    <Grid
      container //
      size={12}
      direction={{ xs: "column", md: "row" }}
      sx={{
        paddingBottom: "2em", //
        paddingLeft: "2em",
      }}
    
    >
      <EditButton
        display={props.userLoggedIn && props.user.isAdmin} //
        displayTextInputField={displayTextInputField}
        setDisplayTextInputField={setDisplayTextInputField}
        selectedSpell={props.selectedSpell}
      />

      <Grid
        container //
        size={2}
        sx={{ justifyContent: "center", justifyItems: "center" }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: "1em",
            marginRight: "1em",
          }}
        >
          {props.title}
        </Typography>
      </Grid>
      <Grid size={10}>
        {displayTextInputField ? (
          <EditSpellProperty
            property={props.property}
            setAllSpells={props.setAllSpells}
            selectedSpell={props.selectedSpell} //
            setSelectedSpell={props.setSelectedSpell}
            user={props.user}
            selectedFactionForSpell={props.selectedFactionForSpell}
            setDisplaySpells={props.setDisplaySpells}
            //
            content={props.content}
          />
        ) : (
          <Typography
            variant="body1" //
            sx={{ padding: "1em" }}
          >
            {props.content}
          </Typography>
        )}
      </Grid>
    </Grid>
  ) : null;
};

export default SpellProperty;
