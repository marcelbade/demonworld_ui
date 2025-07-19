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

  const fetchData = (setter, url) => {
    axios
      .get(url)
      .then((response) => {
        setter(response.data);
      })
      .catch((error) => pushMessage.showSnackBar(error, PUSH_MESSAGE_TYPES.ERROR));
  };

  const fetchProtectedData = (setter, url) => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${UC.user.token}` } })
      .then((response) => {
        setter(response.data);
      })
      .catch((error) => pushMessage.showSnackBar(error, PUSH_MESSAGE_TYPES.ERROR));
  };

  const storeData = (data, url) => {
    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${UC.user.token}` },
      })
      .then()
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
    fetchData,
    fetchProtectedData,
    storeData,
    deleteProtectedData,
  };
};

export default useAxios;
