// react
import { useContext } from "react";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "../../../../../shared/CustomIcon";
// context
import { SelectionContext } from "../../../../../../contexts/selectionContext";
import { UserContext } from "../../../../../../contexts/userContext";
// icons
import customSaveIcon from "../../../../../../assets/icons/customSaveIcon.svg";
import listUpdateIcon from "../../../../../../assets/icons/listUpdateIcon.svg";
// constants
import { OPTIONS } from "../../../../../../constants/textsAndMessages";
import StoreArmyListDialog from "../../../../../Dialogs/StoreArmyListDialog/StoreArmyListDialog";
import useTestForLogIn from "../../../../../../customHooks/UseTestForLogIn";

const StoreAndUpdateArmyListButton = (props) => {
  const SEC = useContext(SelectionContext);
  const UC = useContext(UserContext);

  const STORE_ICON_SIZE = "50px";
  const STORE_ICON_BOX_SIZE = "55px";

  const UPDATE_ICON_SIZE = "60px";
  const UPDATE_ICON_BOX_SIZE = "65px";

  const showLogInDialog = useTestForLogIn(props.setShowArmySaveDialog);

  const displayStoreArmyDialog = () => {
    showLogInDialog.test();
  };

  return (
    <>
      <Tooltip
        title={
          props.isUpdateSelected
            ? OPTIONS.UPDATE_LIST //
            : OPTIONS.STORE_LIST
        }
      >
        <span>
          <IconButton
            disabled={
              props.isUpdateSelected
                ? !UC.userLoggedIn //
                : SEC.selectedUnits.length === 0
            } //
            onClick={() => {
              props.setIsExistingList(!props.isUpdateSelected);
              displayStoreArmyDialog();
            }}
          >
            <CustomIcon
              icon={props.isUpdateSelected ? listUpdateIcon : customSaveIcon} //
              altText={props.isUpdateSelected ? OPTIONS.UPDATE_LIST : OPTIONS.STORE_LIST}
              height={props.isUpdateSelected ? UPDATE_ICON_SIZE : STORE_ICON_SIZE}
              width={props.isUpdateSelected ? UPDATE_ICON_SIZE : STORE_ICON_SIZE}
              boxHeight={props.isUpdateSelected ? UPDATE_ICON_BOX_SIZE : STORE_ICON_BOX_SIZE}
              boxWidth={props.isUpdateSelected ? UPDATE_ICON_BOX_SIZE : STORE_ICON_BOX_SIZE}
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

export default StoreAndUpdateArmyListButton;
