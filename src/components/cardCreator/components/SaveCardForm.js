// react
import React, { useContext } from "react";
// material ui
import { Button, Grid2 as Grid } from "@mui/material";
// axios
import axios from "axios";

import usePushMessages from "../../../customHooks/UsePushMessages";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
import { ServerErrorContext } from "../../../contexts/serverErrorContext";
// constants
import { CREATE_CUSTOM_UNIT_URL } from "../../../constants/URLs";

const SaveCardForm = () => {
  const SC = useContext(ServerErrorContext);
  const CCC = useContext(CardCreationContext);
  const pushMessages = usePushMessages();


  const saveCard = async () => {
    try {
      const response = await axios.post(
        CREATE_CUSTOM_UNIT_URL,

        JSON.stringify(CCC.unit),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }



      );
    } catch (error) {
      if (!error?.response) {
        SC.setServerErrorMessage("no server response");
      }
      if (error?.response && error?.response.status === 400) {
        SC.setServerErrorMessage("missing user name or password");
      }
    }
  };

  return (
    <Grid
      sx={{ backgroundColor: "red" }}
      container //
      alignItems={"center"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Button
        variant="outlined" //
        onClick={() => {
          saveCard();
        }}
      >
        TEST
      </Button>
    </Grid>
  );
};

export default SaveCardForm;
