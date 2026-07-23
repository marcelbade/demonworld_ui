// react
import { useContext } from "react";
// material ui
import { Button, Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// custom hooks
import useAxios from "../../../customHooks/UseAxios";
// constants
import { CREATE_CUSTOM_UNIT_URL } from "../../../constants/URLs";
import { CREATOR } from "../../../constants/textsAndMessages";

const SaveCardForm = () => {
  const CCC = useContext(CardCreationContext);
  const callAxios = useAxios();

  const saveCard = async () => {
    callAxios.sendData(
      JSON.stringify(CCC.unitCards[0]), //TODO
      CREATE_CUSTOM_UNIT_URL,
      null,
      null,
      CREATOR.CARD_CREATED,
    );
  };

  return (
    <Grid
      sx={{
        marginTop: "3em",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
      container //
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
