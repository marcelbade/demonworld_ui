// react
import { useContext } from "react";
// contexts
import { SelectionContext } from "../contexts/selectionContext";
// custom hooks
import usePushMessages from "./UsePushMessages";
// constants
import { PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";

const useTestListButton = (data) => {
  const SEC = useContext(SelectionContext);
  const pushMessages = usePushMessages();

  const testForButtonAction = () => {
    if (SEC.selectedUnits.length === 0) {
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
