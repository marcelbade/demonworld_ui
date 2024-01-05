//  react
import React from "react";
//  material ui
import { IconButton } from "@mui/material";
// icons
import HelpIcon from "@mui/icons-material/Help";
//  components and functions
import usePushMessages from "../../customHooks/UsePushMessages";

const ContextHelpButton = (props) => {
  const pushMessages = usePushMessages();

  return (
    <IconButton
      onClick={() => {
        pushMessages.showSnackBar(props.message, props.type);
      }}
      size="large"
    >
      <HelpIcon />
    </IconButton>
  );
};

export default ContextHelpButton;
