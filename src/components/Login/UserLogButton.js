// React
import { useContext, useEffect, useState } from "react";
// Material UI
import { Avatar, IconButton, Tooltip } from "@mui/material";
// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// functions and components
import { USER_AUTH } from "../../constants/textsAndMessages";
// contexts
import { UserContext } from "../../contexts/userContext";
import { randomRgbValue } from "../../util/utilityFunctions";

/**
 * This JSX component displays the login button. When clicked the login Dialog is displayed.
 * While ther user is logged in, an avatar is displayed.
 * @param {props}
 * - buttonWidth
 * - buttonHeight
 * - iconSize
 * @returns JSX
 */
const UserLogButton = (props) => {
  const UC = useContext(UserContext);
  const [rgbValue, setRgbValue] = useState("");

  useEffect(() => {
    setRgbValue(randomRgbValue());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const displayLogInDialog = () => {
    UC.setDisplayLogInDialog(true);
  };

  return (
    <Tooltip
      title={
        UC.userLoggedIn //
          ? USER_AUTH.LOGOUT_ACCOUNT
          : USER_AUTH.LOGIN_BUTTON
      }
    >
      {UC.userLoggedIn ? (
        <IconButton
          sx={{
            width: props.buttonWidth,
            height: props.buttonHeight,
          }}
          onClick={() => {
            UC.setShowUserAvatarDrawer(true);
          }}
        >
          <Avatar
            sx={{
              backgroundColor: rgbValue, //
            }}
          >
            {UC.user.userName //
              .charAt(0)
              .toUpperCase()}
          </Avatar>
        </IconButton>
      ) : (
        <IconButton
          sx={{
            width: props.buttonWidth,
            height: props.buttonHeight,
          }}
          onClick={() => {
            displayLogInDialog();
          }}
        >
          <AccountCircleIcon fontSize={props.iconSize} />
        </IconButton>
      )}
    </Tooltip>
  );
};

export default UserLogButton;
