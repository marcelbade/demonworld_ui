//  material ui
import { IconButton } from "@mui/material";
//  components and functions
import usePushMessages from "../../customHooks/UsePushMessages";
// icons
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";
// constants
import { PUSH_MESSAGE_TYPES } from "../../constants/textsAndMessages";

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
    sx={{...props.css}}
      onClick={() => {
        pushMessages.showSnackBar(props.message, props.type);
      }}
      size="large"
    >
      {props.type === PUSH_MESSAGE_TYPES.ERROR ? <ErrorIcon color="error" /> : <HelpIcon color="error" />}
    </IconButton>
  ) : null;
};

export default ContextHelpButton;
