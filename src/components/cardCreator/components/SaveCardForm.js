// react
import { useContext } from "react";
// material ui
import { Button, Grid2 as Grid } from "@mui/material";
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
    callAxios.storeData(
      JSON.stringify(CCC.unit), //
      CREATE_CUSTOM_UNIT_URL,
      null,
      CREATOR.CARD_CREATED
    );
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
