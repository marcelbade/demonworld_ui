// React
import React, { useEffect, useState, useContext } from "react";
// Material UI
// notistack
import { useSnackbar } from "notistack";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
// Constants
import { VALIDATION } from "../../../../constants/textsAndMessages";

const ValidationNotification = () => {
  const AC = useContext(ArmyContext);
  const { enqueueSnackbar } = useSnackbar();

  const [messages, setMessages] = useState([]);

  // set the display messages
  useEffect(() => {
    setMessages([]);

    let tempArray = [];

    if (AC.listValidationResults.subFactionBelowMinimum.length > 0) {
      AC.listValidationResults.subFactionBelowMinimum.forEach((u) => {
        tempArray.push(u.message);
      });
    }
    if (!AC.listValidationResults.commanderIsPresent) {
      tempArray.push(VALIDATION.NO_COMMANDER_WARNING);
    }

    if (tempArray.length > 0) {
      setMessages(tempArray);
    }
  }, [AC.listValidationResults, AC.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("messages");
    console.log(messages);

    for (let i = 0; i < messages.length; i++) {
      const element = messages[i];

      enqueueSnackbar(element, {
        persist: true,
        preventDuplicate: true,
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  }, [messages]);

  return null;
};

export default ValidationNotification;
