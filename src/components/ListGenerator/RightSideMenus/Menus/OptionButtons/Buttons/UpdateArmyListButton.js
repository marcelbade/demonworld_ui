// react
import { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
// components and functions
import CustomIcon from "../../../../../shared/CustomIcon";
// context
import { UserContext } from "../../../../../../contexts/userContext";
// icons
import listUpdateIcon from "../../../../../../assets/icons/listUpdateIcon.svg";
// constants
import { OPTIONS } from "../../../../../../constants/textsAndMessages";
import StoreArmyListDialog from "../../../../../Dialogs/StoreArmyListDialog/StoreArmyListDialog";

const UpdateArmyListButton = (props) => {
  const UC = useContext(UserContext);

  const displayStoreArmyDialog = () => {
    UC.userLoggedIn ? props.setShowArmySaveDialog(true) : UC.setDisplayLogInDialog(true);
  };

  return (
    <>
      <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{OPTIONS.UPDATE_LIST}</Typography>}>
        <span>
          <IconButton
            disabled={!UC.userLoggedIn} //
            onClick={() => {
              props.setIsExistingList(true);
              displayStoreArmyDialog();
            }}
          >
            <CustomIcon
              icon={listUpdateIcon} //
              altText={OPTIONS.UPDATE_LIST}
              height={"65px"}
              width={"65px"}
              boxHeight={"70px"}
              boxWidth={"70px"}
            />
          </IconButton>
        </span>
      </Tooltip>
      <StoreArmyListDialog
        showArmySaveDialog={props.showArmySaveDialog} //
        setShowArmySaveDialog={props.setShowArmySaveDialog} //
        isExistingList={props.isExistingList}
      />
    </>
  );
};

export default UpdateArmyListButton;
