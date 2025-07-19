// axios
import axios from "axios";
// react
import { useContext } from "react";
//  hooks
import usePushMessages from "./UsePushMessages";
// constants
import { axiosTexts, PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";
// contexts
import { UserContext } from "../contexts/userContext";

const useAxios = () => {
  const UC = useContext(UserContext);

  const pushMessage = usePushMessages();

  const fetchProtectedData = (setter, url) => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${UC.user.token}` } })
      .then((response) => {
        setter(response.data);
      })
      .catch((error) => pushMessage.showSnackBar(error, PUSH_MESSAGE_TYPES.ERROR));
  };

  const deleteProtectedData = (url) => {
    axios
      .delete(
        url, //
        { headers: { Authorization: `Bearer ${UC.user.token}` } }
      )
      .then(() => {
        pushMessage.showSnackBar(axiosTexts.DELETION_SUCCESFUL, PUSH_MESSAGE_TYPES.SUCCESS);
      })
      .catch((error) => pushMessage.showSnackBar(error, PUSH_MESSAGE_TYPES.ERROR));
  };

  return {
    fetchProtectedData,
    deleteProtectedData,
  };
};

export default useAxios;
