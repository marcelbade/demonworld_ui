//  react
import { useContext, useState, useEffect } from "react";
// material ui
import {
  Dialog, //
  IconButton,
  Grid2 as Grid,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// contexts
import { UserContext } from "../../../contexts/userContext";
import { ArmyContext } from "../../../contexts/armyContext";
// hooks
import usePushMessages from "../../../customHooks/UsePushMessages";
import useAxios from "../../../customHooks/UseAxios";
// constants
import { DELETE_ARMY_LIST_URL, RETREIVE_ARMY_LIST_URL } from "../../../constants/URLs";
import { LOAD_ARMY_LIST_DIALOG, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";
import FetchedArmiesList from "./FetchedArmiesList";
import ListFactionFilter from "./ListFactionFilter";
import ListEventFilter from "./ListEventFilter";
import DeleteConfirmationDialog from "../ConfirmationDialog/DeleteConfirmationDialog";
import UseArmyStateLoader from "../../../customHooks/UseArmyStateLoader";

const LoadArmyListDialog = (props) => {
  const UC = useContext(UserContext);
  const AC = useContext(ArmyContext);

  const callAxios = useAxios();
  const pushMessages = usePushMessages();
  const stateLoader = UseArmyStateLoader();

  const [allLists, setAllLists] = useState([]);
  const [filteredFaction, setFilteredFaction] = useState("");
  const [filteredEvent, setFilteredEvent] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState({});

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
    callAxios.fetchProtectedData(setAllLists, RETREIVE_ARMY_LIST_URL(UC.user.userName));
  };

  /**
   * Function closes the dialog.
   */
  const handleClose = () => {
    props.setShowArmyLoadPrompt(false);
  };

  /**
   * Function loads the list entry into the army tool and closes the
   * prompt. In addtion, the necessary flags are added to the unit
   * and the equipment array.
   * @param {StoredListObj} listObj
   */
  // TODO ok, not working yet.
  const loadListintoTool = (listObj) => {
    // Reset List Tool to the correct army
    AC.setPlayerName(listObj.userName);
    AC.setTeamName(listObj.teamName);
    stateLoader.setFactionProperties(listObj.faction);

    // load list
    let list = [];

    listObj.list.forEach((u) => {
      const appendedEquipment = addItemLostFlag(u.equipment);
      u.equipment = appendedEquipment;

      list.push(u);
    });

    props.listSetter(list);
    props.setShowArmyLoadPrompt((prevState) => !prevState);

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
    setShowConfirmationDialog(true);
    setListToDelete(l);
  };

  const confirmAndDeleteList = async () => {
    callAxios.deleteProtectedData(DELETE_ARMY_LIST_URL(listToDelete.userName, listToDelete.id));

    const result = allLists.filter((l) => l.id !== listToDelete.id);
    setAllLists(result);

    closeAndConfirmationDialog();
  };

  const closeAndConfirmationDialog = () => {
    setShowConfirmationDialog(false);
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
            minWidth: "50em",
            minHeight: "45em",
            padding: "1em",
          },
        },
      }}
      open={props.showArmyLoadPrompt}
    >
      <Grid
        container //
        direction="row"
        justifyContent="flex-end"
      >
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={() => {
            handleClose();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        spacing={3}
        direction="row"
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
      <FetchedArmiesList
        allLists={allLists}
        filteredFaction={filteredFaction} //
        filteredEvent={filteredEvent}
        loadListintoTool={loadListintoTool}
        deleteArmyListButton={deleteArmyListButton}
      />
      <DeleteConfirmationDialog
        showConfirmationDialog={showConfirmationDialog} //
        confirmAndDeleteList={confirmAndDeleteList}
        closeAndConfirmationDialog={closeAndConfirmationDialog}
      />
    </Dialog>
  );
};

export default LoadArmyListDialog;
