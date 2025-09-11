// react
import { useContext } from "react";
// Material UI
import { IconButton, Tooltip, Typography } from "@mui/material";
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

const StoreAndUpdateArmyListButton = (props) => {
  const SEC = useContext(SelectionContext);
  const UC = useContext(UserContext);

  const displayStoreArmyDialog = () => {
    UC.userLoggedIn ? props.setShowArmySaveDialog(true) : UC.setDisplayLogInDialog(true);
  };

  return (
    <>
      <Tooltip
        title={
          <Typography sx={{ fontSize: "20px" }}>
            {props.isUpdateSelected
              ? OPTIONS.UPDATE_LIST //
              : OPTIONS.STORE_LIST}
          </Typography>
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
              height={"55px"}
              width={"55px"}
              boxHeight={"60px"}
              boxWidth={"60px"}
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
