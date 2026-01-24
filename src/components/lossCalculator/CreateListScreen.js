// React
import { useContext, useState } from "react";
//Material UI
import { Button, Grid2 as Grid } from "@mui/material";
//  components and functions
import LoginDialog from "../Dialogs/LogInDialog/LogInDialog";
import NavigationButton from "../shared/navigation/NavigationButton";
import OptionsMenu from "../shared/settings/SettingsMenu";
import CollapsableTopMenuDrawer from "../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../shared/TopDrawerButton";
// constants
import { LOSS_CALCULATOR, OPTIONS } from "../../constants/textsAndMessages";
import LoadArmyListDialog from "../Dialogs/LoadArmyDialog/LoadArmyListDialog";
// contexts
import { LossCalcContext } from "../../contexts/LossCalculatorContext";
// icons
import customRedGameIcon from "../../assets/icons/logo_red.png";
// custom hooks
import useCustomMediaQuery from "../../customHooks/UseCustomMediaQuery";

const CreateListScreen = () => {
  const LC = useContext(LossCalcContext);
  const displaySize = useCustomMediaQuery();

  const [showArmyLoadPrompt, setShowArmyLoadPrompt] = useState(false);

  const showLoadListPrompt = () => {
    setShowArmyLoadPrompt(true);
  };

  return (
    <Grid //
      container
      direction="column"
      alignItems="center"
      justifyItems="center"
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <CollapsableTopMenuDrawer
        displayPageTitle={true} //
        title={""}
        logo={customRedGameIcon}
        hasLogo={true}
        displayNaviBttn={true}
        displayListBttns={true}
        logoWidth={displaySize.isTinyDisplay ? "250px" : "350px"}
      />
      <TopDrawerButton />

      <Grid
        container //
        direction="column"
        alignItems="center"
        justifyItems="center"
        spacing={8}
        sx={{paddingTop:"5em"}}
      >
        <NavigationButton
          displayNavigatonBttn={true}
          relativeURL={"/ListGenerator"} //
          isIconButton={false}
          variant={"outlined"} //
          altText={LOSS_CALCULATOR.CREATE_LIST}
          toolTipText={LOSS_CALCULATOR.CREATE_LIST}
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
        <LoadArmyListDialog
          listSetter={LC.setList}
          showArmyLoadPrompt={showArmyLoadPrompt} //
          setShowArmyLoadPrompt={setShowArmyLoadPrompt} //
        />
      </Grid>
    </Grid>
  );
};

export default CreateListScreen;
