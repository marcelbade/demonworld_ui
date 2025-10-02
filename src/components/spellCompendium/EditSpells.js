// material ui
import { Button, Grid2 as Grid, TextField } from "@mui/material";
// constants
import { SPELL_COMPENDIUM } from "../../constants/textsAndMessages";
//  custom hooks
import useAxios from "../../customHooks/UseAxios";
import { EDIT_SPELL_URL } from "../../constants/URLs";

/**
 * Component renders a text area input field to edit spells if a
 * user is logged in and the user has admin permissions.
 * @param {obj} props
 * @returns a nested JSX element.
 */
const EditSpells = (props) => {
  const callAxios = useAxios();

  const saveChanges = () => {
    callAxios.storeData(
      JSON.stringify({
        ...props.user.userName,
        ...props.selectedSpell,
      }),
      EDIT_SPELL_URL,
      updateSpellData,
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

  /**
   *
   * @param {*} data
   */
  const updateSpellData = (data) => {
    props.setAllSpells(data);
    props.setDisplaySpells(data.filter((d) => d.faction === props.selectedFactionForSpell));
  };

  return (
    <Grid
      container //
      direction="column"
      size={12}
      spacing={2}
      justifyContent="center"
      alignContent="center"
      sx={{
        "& .MuiOutlinedInput-input": { padding: "1em" },
      }}
    >
      <TextField
        sx={{
          width: "80%", //
          topmargin: "30em",
          "& .MuiInputBase-input": { fontFamily: "jaapokkiRegular" },
        }}
        id="outlined-multiline-flexible" //
        multiline
        minRows={8}
        maxRows={8}
        value={props.content}
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
  );
};

export default EditSpells;
