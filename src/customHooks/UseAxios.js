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

  /**
   * Function calls the Axios POST method to send data to the BE.
   * If a useState setter function is supplied, the response value will
   * be passed to the function, as the new state value.
   * If the request is successfull (201), a toast message is displayed.
   * If any error is returned, the error message is shown as toast message
   * @param {String} data stringified JSON object
   * @param {String} url
   * @param {function} setter must be null if no setter function is passed
   * @param {String} successMessage
   */
  const storeData = (data, url, setter, successMessage) => {
    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${UC.user.token}` },
      })
      .then((response) => {
        if (setter !== null) {
          setter(response);
        }
        pushMessage.showSnackBar(successMessage, PUSH_MESSAGE_TYPES.SUCCESS);
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

  const updateData = (data, url, successMessage) => {
    axios
      .put(url, data, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${UC.user.token}` },
      })
      .then(() => {
        pushMessage.showSnackBar(successMessage, PUSH_MESSAGE_TYPES.SUCCESS);
      })
      .catch((error) => pushMessage.showSnackBar(error, PUSH_MESSAGE_TYPES.ERROR));
  };

  return {
    fetchData,
    fetchProtectedData,
    storeData,
    deleteProtectedData,
    updateData,
  };
};

export default useAxios;
