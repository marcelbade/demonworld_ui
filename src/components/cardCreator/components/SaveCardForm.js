// react
import { useContext } from "react";
// material ui
import { Button, Grid2 as Grid } from "@mui/material";
// contexts
import { CardCreationContext } from "../../../contexts/cardCreationContext";
// constants
import { CREATE_CUSTOM_UNIT_URL } from "../../../constants/URLs";
// custom hooks
import useAxios from "../../../customHooks/UseAxios";

const SaveCardForm = () => {
  const CCC = useContext(CardCreationContext);
  const callAxios = useAxios();

  const saveCard = async () => {
    callAxios.storeData(JSON.stringify(CCC.unit), CREATE_CUSTOM_UNIT_URL, null);
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
