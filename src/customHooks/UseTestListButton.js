// custom hooks
import usePushMessages from "./UsePushMessages";
// constants
import { PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";

/**
 * Custom hook that tests if the user has made an selection.
 * 
 * If not, the button's action is blocked and a 
 * toast message with an error is shown instead.
 * @param {object} data an object containg the following properties:
 *  - selectionData: an array containing the selection
 *  - errorMessage: String that contains the error to be displayed
 *  - action: action that is blocked if no selection was made
 *  - actionParameter: any parameter for button's action
 * @returns a test function.
 */
const useTestListButton = (data) => {
  const pushMessages = usePushMessages();

  const testForButtonAction = () => {
    if (data.selectionData.length === 0) {
      pushMessages.showSnackBar(
        data.errorMessage, //
        PUSH_MESSAGE_TYPES.ERROR,
      );
    } else {
      data.action(data.actionParameter);
    }
  };

  return { test: testForButtonAction };
};

export default useTestListButton;
