// axios
import axios from "axios";
// react
import { useContext } from "react";
//  hooks
import usePushMessages from "./UsePushMessages";
// constants
import { AXIOS_TEXTS, PUSH_MESSAGE_TYPES } from "../constants/textsAndMessages";
// contexts
import { UserContext } from "../contexts/userContext";

/**
 * custom hook that encapsules Axios logic to keep the code DRY and add
 * custom logic for setters and error handling.
 * @returns an object with functions that cover get, post, delete, put requests
 */
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
      .catch((error) =>
        pushMessage.showSnackBar(
          AXIOS_TEXTS.AXIOS_FATAL_ERROR(error.message), //
          PUSH_MESSAGE_TYPES.ERROR,
        ),
      );
  };

  /**
   * Function calls the Axios POST method to send data to the BE.
   * If a useState setter function is supplied, the response value will
   * be passed to the function, as the new state value.
   * If the request is successfull (201), a toast message is displayed.
   * If any error is returned, the error message is also shown as a toast message
   * @param {String} data stringified JSON object
   * @param {String} url
   * @param {function} setter must be null if no setter function is passed
   * @param {String} successMessage
   */
  const sendData = (data, url, setter, successMessage) => {
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${UC.user.token}`,
        },
      })
      .then((response) => {
        if (setter !== null) {
          setter(response.data);
        }
        pushMessage.showSnackBar(successMessage, PUSH_MESSAGE_TYPES.SUCCESS);
      })
      .catch((error) =>
        pushMessage.showSnackBar(
          AXIOS_TEXTS.AXIOS_FATAL_ERROR(error.message), //
          PUSH_MESSAGE_TYPES.ERROR,
        ),
      );
  };

  const deleteProtectedData = (url) => {
    axios
      .delete(
        url, //
        { headers: { Authorization: `Bearer ${UC.user.token}` } },
      )
      .then(() => {
        pushMessage.showSnackBar(AXIOS_TEXTS.DELETION_SUCCESFUL, PUSH_MESSAGE_TYPES.SUCCESS);
      })
      .catch((error) =>
        pushMessage.showSnackBar(
          AXIOS_TEXTS.AXIOS_FATAL_ERROR(error.message), //
          PUSH_MESSAGE_TYPES.ERROR,
        ),
      );
  };

  const updateData = (data, url, successMessage) => {
    axios
      .put(url, data, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${UC.user.token}` },
      })
      .then(() => {
        pushMessage.showSnackBar(successMessage, PUSH_MESSAGE_TYPES.SUCCESS);
      })
      .catch((error) =>
        pushMessage.showSnackBar(
          AXIOS_TEXTS.AXIOS_FATAL_ERROR(error.message), //
          PUSH_MESSAGE_TYPES.ERROR,
        ),
      );
  };

  return {
    fetchData,
    fetchProtectedData,
    sendData: sendData,
    deleteProtectedData,
    updateData,
  };
};

export default useAxios;
