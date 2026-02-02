// Material UI
import { Button } from "@mui/material";

const NaviTextButton = (props) => {
  return (
    <Button
      sx={{}}
      variant={props.textButtonVariant}
      onClick={() => {
        props.toPage(props.relativeURL);
      }}
    >
      {props.text}
    </Button>
  );
};

export default NaviTextButton;
