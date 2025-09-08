// Material UI
import { Button } from "@mui/material";

const NaviTextButton = (props) => {
  return (
    <Button
      variant={props.textButtonVariant}
      onClick={() => {
        props.toPage(props.relativeURL);
        props.openMenu(false);
      }}
    >
      {props.text}
    </Button>
  );
};

export default NaviTextButton;
