import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";

const EditButton = (props) => {
  const toggleTextInputField = () => {
    props.setDisplayTextInputField(!props.displayTextInputField);
  };

  const setIconColor = () => {
    let color;

    if (props.selectedSpell.spellName === "-") {
      color = "lightgrey";
    } else if (props.displayTextInputField) {
      color = "green";
    } else if (!props.displayTextInputField) {
      color = "black";
    }

    return color;
  };

  return props.display ? ( //
    <IconButton
      disabled={props.selectedSpell.spellName === "-"}
      sx={{
        height: "2em",
        width: "2em",
        border: `2px solid ${setIconColor()}`,
      }}
      onClick={() => {
        toggleTextInputField();
      }}
    >
      {/*  TODO color */}
      <EditNoteIcon style={{ color: `${setIconColor()}` }} />
    </IconButton>
  ) : null;
};
export default EditButton;
