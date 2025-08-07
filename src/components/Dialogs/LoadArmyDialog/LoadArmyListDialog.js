//  react
import { useContext, useState, useEffect } from "react";
// material ui
import {
  Dialog, //
  IconButton,
  Grid2 as Grid,
  useTheme,
} from "@mui/material";
// icons
import { Cancel } from "@mui/icons-material";
// contexts
import { UserContext } from "../../../contexts/userContext";
import { ArmyContext } from "../../../contexts/armyContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { MenuContext } from "../../../contexts/MenuContext";
// hooks
import usePushMessages from "../../../customHooks/UsePushMessages";
import useAxios from "../../../customHooks/UseAxios";
// functions and compoents
import FetchedArmiesList from "./FetchedArmiesList";
import ListFactionFilter from "./ListFactionFilter";
import ListEventFilter from "./ListEventFilter";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import UseArmyStateLoader from "../../../customHooks/UseArmyStateLoader";
// constants
import { DELETE_ARMY_LIST_URL, RETRIEVE_ARMY_LISTS_URL } from "../../../constants/URLs";
import { CONFIRMATION_DIALOG, LOAD_ARMY_LIST_DIALOG, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";

const LoadArmyListDialog = (props) => {
  const UC = useContext(UserContext);
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);
  const MC = useContext(MenuContext);

  const theme = useTheme()

  const sendData = useAxios();
  const pushMessages = usePushMessages();
  const stateLoader = UseArmyStateLoader();

  const [allLists, setAllLists] = useState([]);
  const [filteredFaction, setFilteredFaction] = useState("");
  const [filteredEvent, setFilteredEvent] = useState("");
  const [listToDelete, setListToDelete] = useState({});
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    if (props.showArmyLoadPrompt) {
      fetchLists();
    }
  }, [props.showArmyLoadPrompt]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Async Function sends REST request and returns all stored lists
   * from the DB that either:
   * - were created by the user
   * - or have the user listed as having access
   */
  const fetchLists = async () => {
    sendData.fetchProtectedData(setAllLists, RETRIEVE_ARMY_LISTS_URL(UC.user.userName));
  };

  /**
   * Function closes the dialog.
   */
  const handleClose = () => {
    props.setShowArmyLoadPrompt(false);
  };

  /**
   * Function loads the fetched army list into the list tool
   * by
   * - marking the list as fetched from the DB
   * - setting the tool state to the correct army
   * - loading the army list into the tool
   * - displaying a success message.
   * @param {ListObj} listObj
   */
  const loadListintoTool = (listObj) => {
    AC.setIsFetchedArmyList(true);

    setListToolState(listObj);
    storeListInState(listObj);

    props.setShowArmyLoadPrompt((prevState) => !prevState);

    showSuccessMessage();
  };

  const storeListInState = (listObj) => {
    let list = [];

    listObj.list.forEach((u) => {
      const appendedEquipment = addItemLostFlag(u.equipment);
      u.equipment = appendedEquipment;
      list.push(u);
    });

    SEC.setSelectedUnits(list);
  };

  const setListToolState = (listObj) => {
    AC.setArmyID(listObj.id);
    AC.setPlayerName(listObj.userName);
    AC.setTeamName(listObj.teamName);
    stateLoader.setFactionProperties(listObj.faction);
  };

  const showSuccessMessage = () => {
    pushMessages.showSnackBar(
      LOAD_ARMY_LIST_DIALOG.LOADED_LIST_SUCCESSFULLY, //
      PUSH_MESSAGE_TYPES.SUCCESS
    );
  };

  /**
   * Function adds an itemLost flag to every element
   * in the equipment array.
   * @param {itemCard} equipment
   * @returns the equipment array, with each item now an object.
   */
  const addItemLostFlag = (equipment) => {
    let result = [];

    if (equipment.length !== 0) {
      equipment.forEach((e) => {
        result.push({ ...e, itemLost: false });
      });
    }

    return result;
  };

  /**
   * Async function deletes an army list from the DB
   * @param {*} listObj
   */
  const deleteArmyListButton = (l) => {
    setListToDelete(l);

    if (!MC.blockDialog.showDeletionDialog) {
      setShowConfirmationDialog(true);
      return;
    }

    deleteList();
  };

  const deleteList = async () => {
    sendData.deleteProtectedData(DELETE_ARMY_LIST_URL(listToDelete.userName, listToDelete.id));

    const result = allLists.filter((l) => l.id !== listToDelete.id);
    setAllLists(result);

    closeConfirmationDialog();
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  const setDialogState = () => {
    MC.setblockDialog({
      ...MC.blockDialog,
      confirmationDialog: !MC.blockDialog.showDeletionDialog,
    });
  };

  const handleFilteredFactionInput = (event) => {
    if (event.target.value === LOAD_ARMY_LIST_DIALOG.SHOW_ALL_FACTIONS) {
      setFilteredFaction("");
      return;
    }
    setFilteredFaction(event.target.value);
  };

  const handleFilteredEventInput = (event) => {
    if (event.target.value === LOAD_ARMY_LIST_DIALOG.SHOW_EVERYTHING_REGARDLESS_OF_EVENT) {
      setFilteredEvent("");
      return;
    }

    setFilteredEvent(event.target.value);
  };

  return (
    <Dialog
      component={"form"}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "75em",
            minHeight: "45em",
          },
        },
      }}
      open={props.showArmyLoadPrompt}
    >
      <Grid
        container //
        direction="row"
        justifyContent="flex-end"
          sx={theme.palette.dialogs.title}
      >
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={() => {
            handleClose();
          }}
        >
          <Cancel color="error" />
        </IconButton>
      </Grid>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-around"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <ListFactionFilter
          allLists={allLists}
          handleFilteredFactionInput={handleFilteredFactionInput} //
        />
        <ListEventFilter
          allLists={allLists}
          handleFilteredEventInput={handleFilteredEventInput} //
        />
      </Grid>
      <Grid
        container
        alignContent="center" //
        justifyContent="center"
      >
        <FetchedArmiesList
          allLists={allLists}
          filteredFaction={filteredFaction} //
          filteredEvent={filteredEvent}
          loadListintoTool={loadListintoTool}
          deleteArmyListButton={deleteArmyListButton}
        />
      </Grid>
      <ConfirmationDialog
        type={CONFIRMATION_DIALOG.DELETE}
        showConfirmationDialog={showConfirmationDialog} //
        confirmAndExecute={deleteList}
        closeDialog={closeConfirmationDialog}
        dialogBoxState={MC.blockDialog.confirmationDialog}
        setDialogBoxState={setDialogState}
      />
    </Dialog>
  );
};

export default LoadArmyListDialog;
