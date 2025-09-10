// React
import { useState } from "react";
// Material UI
import { Grid2 as Grid, Stack } from "@mui/material";
// context
// components and functions
import LoginDialog from "../../../../Dialogs/LogInDialog/LogInDialog";
import ArmyAndScoutingPointDisplay from "../../../ArmyListView/ArmyList/ArmyListFooter/ArmyAndScoutingPointDisplay";
import BackToSelectionButton from "../../../../shared/BackToSelectionButton";
import DeleteArmyListButton from "./Buttons/DeleteArmyListButton";
// constants
import ArmyMetaDataInput from "../../../ArmyListView/ArmyList/ArmyListHeader/ArmyMetaDataInput";
import CreatePdfButton from "./Buttons/CreatePdfButton";
import StoreArmyListButton from "./Buttons/StoreArmyListButton";
import UpdateArmyListButton from "./Buttons/UpdateArmyListButton";
import LoadArmyButton from "./Buttons/LoadArmyButton";
import LossCalculatorButton from "./Buttons/LossCalculatorButton";

const OptionButtonsPage = () => {
  const [showArmySaveDialog, setShowArmySaveDialog] = useState(false);
  const [showDeleteArmyListDialog, SetShowDeleteArmyListDialog] = useState(false); //TODO new dialog, "really delete list?"
  const [isExistingList, setIsExistingList] = useState(false);

  const ICON_SIZE_RESET_BUTTONS = "1.75em";

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      spacing={4}
      sx={{
        width: "20vw",
        padding: "2em",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <Stack
        direction="column" //
        spacing={6}
        sx={{
          marginBottom: "5em",
        }}
      >
        <ArmyMetaDataInput />
        <ArmyAndScoutingPointDisplay />
      </Stack>
      <Grid
        container //
        direction="row"
        spacing={10}
      >
        <Grid
          container
          direction="column" //
          spacing={4}
          sx={{
            paddingTop: "0.7em",
          }}
        >
          <CreatePdfButton />
          <LoadArmyButton />
          <StoreArmyListButton
            showArmySaveDialog={showArmySaveDialog}
            setShowArmySaveDialog={setShowArmySaveDialog}
            isExistingList={isExistingList} //
            setIsExistingList={setIsExistingList}
          />
          <UpdateArmyListButton
            showArmySaveDialog={showArmySaveDialog}
            setShowArmySaveDialog={setShowArmySaveDialog}
            isExistingList={isExistingList} //
            setIsExistingList={setIsExistingList}
          />
          <LossCalculatorButton />
        </Grid>
        <Grid
          container
          direction="column" //
          spacing={4}
          sx={{
            paddingTop: "0.7em",
          }}
        >
          <BackToSelectionButton iconSize={ICON_SIZE_RESET_BUTTONS} />
          <DeleteArmyListButton iconSize={ICON_SIZE_RESET_BUTTONS} />
        </Grid>
        <Grid
          container
          direction="column" //
          justifyContent="center"
          alignContent="center"
          spacing={3}
        ></Grid>
      </Grid>
      <LoginDialog />
    </Grid>
  );
};

export default OptionButtonsPage;
