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
import CreateArmyListPdfButton from "./Buttons/CreateArmyListPdfButton";
import StoreAndUpdateArmyListButton from "./Buttons/StoreAndUpdateArmyListButton";
import LoadArmyButton from "./Buttons/LoadArmyButton";
import LossCalculatorButton from "./Buttons/LossCalculatorButton";
import TextFileDownloadButton from "./Buttons/TextFileDownloadButton";

const OptionButtonsPage = () => {
  const [showArmySaveDialog, setShowArmySaveDialog] = useState(false);
  const [isExistingList, setIsExistingList] = useState(false);

  const ICON_SIZE_RESET_BUTTONS = "1.75em";

  return (
    <>
      <Stack
        direction="column" //
        spacing={6}
        sx={{ width: "32em" }}
      >
        <ArmyMetaDataInput />
        <ArmyAndScoutingPointDisplay />
      </Stack>

      <Grid
        container //
        direction="column"
        spacing={6}
        sx={{ marginTop: "2em" }}
      >
        <Grid
          container
          direction="row"
          spacing={7}
          sx={{
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <CreateArmyListPdfButton />
          <TextFileDownloadButton />
        </Grid>
        <Grid
          container //
          direction="row"
          spacing={7}
          sx={{
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <LoadArmyButton />
          <StoreAndUpdateArmyListButton
            isUpdateSelected={false}
            showArmySaveDialog={showArmySaveDialog}
            setShowArmySaveDialog={setShowArmySaveDialog}
            isExistingList={isExistingList} //
            setIsExistingList={setIsExistingList}
          />
          <StoreAndUpdateArmyListButton
            isUpdateSelected={true}
            showArmySaveDialog={showArmySaveDialog}
            setShowArmySaveDialog={setShowArmySaveDialog}
            isExistingList={isExistingList} //
            setIsExistingList={setIsExistingList}
          />
        </Grid>
        <LossCalculatorButton />
        <Grid
          container //
          direction="row"
          spacing={7}
          sx={{
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <BackToSelectionButton iconSize={ICON_SIZE_RESET_BUTTONS} />
          <DeleteArmyListButton iconSize={ICON_SIZE_RESET_BUTTONS} />
        </Grid>
      </Grid>
      <LoginDialog />
    </>
  );
};

export default OptionButtonsPage;
