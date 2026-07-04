// React
import { useState } from "react";
// Material UI
import { Grid, IconButton, Stack } from "@mui/material";
// context
// components and functions
import LoginDialog from "../../../../Dialogs/LogInDialog/LogInDialog";
import ArmyAndScoutingPointDisplay from "../../../ArmyListView/ArmyList/ArmyListFooter/ArmyAndScoutingPointDisplay";
import BackToSelectionButton from "../../../../shared/BackToSelectionButton";
import DeleteArmyListButton from "./Buttons/DeleteArmyListButton";
import ArmyMetaDataInput from "../../../ArmyListView/ArmyList/ArmyListHeader/ArmyMetaDataInput";
import CreateArmyListPdfButton from "./Buttons/CreateArmyListPdfButton";
import StoreAndUpdateArmyListButton from "./Buttons/StoreAndUpdateArmyListButton";
import LoadArmyButton from "./Buttons/LoadArmyButton";
import LossCalculatorButton from "./Buttons/LossCalculatorButton";
import TextFileDownloadButton from "./Buttons/TextFileDownloadButton";
// custom hooks
import UseRightSideMenuController from "../../../../../customHooks/UseRightSideMenuController";
// icons
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * JSX component. Returns the right side menu containing all option and the CRUD buttons for the army list screen.
 * @returns a JSX componen.
 */
const OptionButtonsPage = () => {
  const [showArmySaveDialog, setShowArmySaveDialog] = useState(false);
  const [isExistingList, setIsExistingList] = useState(false);

  const sideMenuController = UseRightSideMenuController({}, "", {});

  const ICON_SIZE_RESET_BUTTONS = "1.75em";

  return (
    <Grid
      sx={{
        paddingLeft: "2em",
      }}
    >
      <Grid>
        <IconButton
          onClick={() => {
            sideMenuController.closeOptionButtonMenu();
          }}
          size="large"
          sx={{
            marginTop: "0.5em",
            marginBottom: "0.5em",
          }}
        >
          <CancelIcon fontSize="large" />
        </IconButton>
      </Grid>
      <Stack
        direction="column" //
        spacing={6}
        sx={{
          paddingLeft: "1em",
          width: "32em",
        }}
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
    </Grid>
  );
};

export default OptionButtonsPage;
