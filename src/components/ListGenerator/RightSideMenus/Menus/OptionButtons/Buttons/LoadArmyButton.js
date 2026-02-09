// react
import { useState } from "react";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "../../../../../shared/CustomIcon";
import LoadArmyListDialog from "../../../../../Dialogs/LoadArmyDialog/LoadArmyListDialog";
// icons
import customLoadIcon from "../../../../../../assets/icons/customLoadIcon.svg";
// constants
import { OPTIONS } from "../../../../../../constants/textsAndMessages";
import useTestForLogIn from "../../../../../../customHooks/UseTestForLogIn.js";

const LoadArmyButton = () => {
  const ICON_SIZE = "55px";
  const ICON_BOX_SIZE = "60px";

  const [showArmyLoadDialog, setShowArmyLoadDialog] = useState(false);

  const showLogInDialog = useTestForLogIn(setShowArmyLoadDialog);

  const showLoadListPrompt = () => {
    showLogInDialog.test();
  };

  return (
    <>
      <Tooltip title={OPTIONS.LOAD_LIST}>
        <span>
          <IconButton
            disabled={false} //
            onClick={() => {
              showLoadListPrompt();
            }}
          >
            <CustomIcon
              icon={customLoadIcon} //
              altText={OPTIONS.LOAD_LIST}
              height={ICON_SIZE}
              width={ICON_SIZE}
              boxHeight={ICON_BOX_SIZE}
              boxWidth={ICON_BOX_SIZE}
            />
          </IconButton>
        </span>
      </Tooltip>
      <LoadArmyListDialog
        showArmyLoadPrompt={showArmyLoadDialog} //
        setShowArmyLoadPrompt={setShowArmyLoadDialog} //
      />
    </>
  );
};

export default LoadArmyButton;
