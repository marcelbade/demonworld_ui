import { Grid2 as Grid, Typography } from "@mui/material";
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
      direction="row"
      sx={{
        paddingBottom: "2em", //
        paddingLeft: "2em",
      }}
      alignItems="center"
    >
      <EditButton
        display={props.userLoggedIn && props.user.isAdmin} //
        displayTextInputField={displayTextInputField}
        setDisplayTextInputField={setDisplayTextInputField}
        selectedSpell={props.selectedSpell}
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
          <Typography>{props.content}</Typography>
        )}
      </Grid>
    </Grid>
  ) : null;
};

export default SpellProperty;
