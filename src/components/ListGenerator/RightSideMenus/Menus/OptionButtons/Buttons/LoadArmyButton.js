// react
import { useContext, useState } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// components and functions
import CustomIcon from "../../../../../shared/CustomIcon";
import LoadArmyListDialog from "../../../../../Dialogs/LoadArmyDialog/LoadArmyListDialog";
// context
import { UserContext } from "../../../../../../contexts/userContext";
// icons
import customLoadIcon from "../../../../../../assets/icons/customLoadIcon.svg";
// constants
import { OPTIONS } from "../../../../../../constants/textsAndMessages";

const LoadArmyButton = () => {
  const UC = useContext(UserContext);

  const [showArmyLoadDialog, setShowArmyLoadDialog] = useState(false);

  const showLoadListPrompt = () => {
    UC.userLoggedIn ? setShowArmyLoadDialog(true) : UC.setDisplayLogInDialog(true);
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
              height={"65px"}
              width={"65px"}
              boxHeight={"70px"}
              boxWidth={"70px"}
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
