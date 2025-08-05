//  react
import React from "react";
//  material ui
import { IconButton } from "@mui/material";
// icons
import HelpIcon from "@mui/icons-material/Help";
//  components and functions
import usePushMessages from "../../customHooks/UsePushMessages";

/**
 * Component displays an IconButton with a question mark. The Click action displays a notistack push message.
 * The type attribute controls message's color (green|blue|red).
 * API:
 *  isVisible: boolean
 *  message: String,
 *  type: PUSH_MESSAGE_TYPES
 * @param {String } props
 * @returns
 */
const ContextHelpButton = (props) => {
  const pushMessages = usePushMessages();

  return props.isVisible ? (
    <IconButton
      onClick={() => {
        pushMessages.showSnackBar(props.message, props.type);
      }}
      size="large"
    >
      <HelpIcon color="error" />
    </IconButton>
  ) : null;
};

export default ContextHelpButton;
