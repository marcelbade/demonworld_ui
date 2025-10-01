// material ui
import { Button, Grid2 as Grid, TextField } from "@mui/material";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
//  custom hooks
import useAxios from "../../customHooks/UseAxios";
import { EDIT_SPELL_URL } from "../../constants/URLs";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { Padding } from "@mui/icons-material";

/**
 * Component renders a text area input field to edit spells if a
 * user is logged in and the user has admin permissions.
 * @param {obj} props
 * @returns a nested JSX element.
 */
const EditSpells = (props) => {
  const UC = useContext(UserContext);

  const callAxios = useAxios();

  const saveChanges = () => {
    callAxios.storeData(
      JSON.stringify({
        ...UC.user.userName,
        ...props.selectedSpell,
      }),
      EDIT_SPELL_URL,
      null,
      SPELL_COMPENDIUM.SUCCESS
    );
  };

  const editText = (event, propertyToEdit) => {
    let newText = event.target.value;
    const tempObj = { ...props.selectedSpell };
    tempObj[propertyToEdit] = newText;

    props.setSelectedSpell({
      ...tempObj,
    });
  };

  return UC.userLoggedIn && UC.user.isAdmin ? (
    <Grid
      container //
      direction="column"
      size={8}
      spacing={2}
      justifyContent="center"
      alignContent="center"
      sx={{
        backgroundColor: "palegoldenrod", //
        "& .MuiOutlinedInput-input": { padding: "1em" },
      }}
    >
      <TextField
        sx={{
          width: "80%", //
          topmargin: "30em",
        }}
        id="outlined-multiline-flexible" //
        multiline
        minRows={10}
        maxRows={10}
        value={props.selectedSpell[props.propertyToEdit]}
        onChange={(event) => {
          editText(event, props.propertyToEdit);
        }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          saveChanges();
        }}
      >
        {SPELL_COMPENDIUM.SAVE}
      </Button>
    </Grid>
  ) : null;
};

export default EditSpells;
