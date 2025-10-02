import EditNoteIcon from "@mui/icons-material/EditNote";
import { IconButton } from "@mui/material";

const EditButton = (props) => {
  return props.display ? ( //
    <IconButton
      sx={{
        height: "2em",
        width: "2em",
        border: props.currentEdit[props.property] ? "2px solid green" : "2px solid black",
      }}
      onClick={() => {
        props.setPropertyToEdit(props.property);
        props.showActiveEdit(props.property);
      }}
    >
      <EditNoteIcon style={{ color: props.currentEdit[props.property] ? "green" : "black" }} />
    </IconButton>
  ) : null;
};
export default EditButton;
