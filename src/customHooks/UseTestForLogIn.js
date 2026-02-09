import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

/**
 * Custom hook tests, whether the user is logged in.
 * If not, a login dialog is displayed instead of the requested
 * dialog
 * @param stateSetter boolean flag setter for the dialog
 */
const useTestForLogIn = (stateSetter) => {
  const UC = useContext(UserContext);

  const testLogIn = () => {
    UC.userLoggedIn ? stateSetter(true) : UC.setDisplayLogInDialog(true);
  };

  return { test: testLogIn };
};

export default useTestForLogIn;
