// React
import { useContext, useState } from "react";
//Material UI
import { Button, Grid2 as Grid } from "@mui/material";
//  components and functions
import NaviButton from "../landingPage/NaviButton";
import LoginDialog from "../Dialogs/LogInDialog/LogInDialog";
import OptionsMenu from "../shared/options/OptionsMenu";
// constants
import { LOSS_CALCULATOR, OPTIONS } from "../../constants/textsAndMessages";
import LoadArmyListPrompt from "../Dialogs/LoadArmyDialog/LoadArmyListDialog";
// contexts
import { LossCalcContext } from "../../contexts/LossCalculatorContext";

const CreateListScreen = () => {
  const LC = useContext(LossCalcContext);

  const [showArmyLoadPrompt, setShowArmyLoadPrompt] = useState(false);

  const showLoadListPrompt = () => {
    setShowArmyLoadPrompt(true);
  };

  return (
    <Grid //
      container
      direction="column"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <OptionsMenu />
      <Grid
        container //
        direction="column"
        alignItems="center"
        justifyItems="center"
        spacing={8}
      >
        <NaviButton
          relativeURL={"/ListGenerator"} //
          isIconButton={false}
          variant={"outlined"} //
          text={LOSS_CALCULATOR.CREATE_LIST}
          width={"30em"}
          height={"3em"}
        />
        <Button
          variant="outlined" //
          disabled={false}
          onClick={() => {
            showLoadListPrompt();
          }}
        >
          {OPTIONS.LOAD_LIST}
        </Button>
        <LoginDialog />
        <LoadArmyListPrompt
          listSetter={LC.setList}
          showArmyLoadPrompt={showArmyLoadPrompt} //
          setShowArmyLoadPrompt={setShowArmyLoadPrompt} //
        />
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
