//  react
import { useContext, useState, useEffect } from "react";
// material ui
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid2 as Grid,
  IconButton,
  TextField,
  Checkbox,
  MenuItem,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
//  functions and components
import ContextHelpButton from "../../shared/ContextHelpButton";
import SelectionInput from "../../shared/selectionInput";
// contexts
import { UserContext } from "../../../contexts/userContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { ArmyContext } from "../../../contexts/armyContext";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import { MenuContext } from "../../../contexts/MenuContext";
// hooks
import useAxios from "../../../customHooks/UseAxios";
// constants
import { ALL_USER_NAMES_URL, GET_EVENTS_URL, STORE_ARMY_LIST_URL } from "../../../constants/URLs";
import { ARMY_LIST, CONFIRMATION_DIALOG, INPUT_TEXTS, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";
import { NO_EVENT } from "../../../constants/eventConstants";

const StoreArmyListDialog = (props) => {
  const UC = useContext(UserContext);
  const SEC = useContext(SelectionContext);
  const AC = useContext(ArmyContext);

  const MC = useContext(MenuContext);

  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isForEvent, setIsForEvent] = useState(false);
  const [isvisibleForOtherUsers, setIsvisibleForOtherUsers] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const callAxios = useAxios();

  useEffect(() => {
    fetchAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAllUsers = async () => {
    callAxios.fetchProtectedData(setAllUsers, ALL_USER_NAMES_URL);
  };

  useEffect(() => {
    if (UC.user.userName !== "") {
      fetchEvents();
    }
  }, [UC.user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEvents = async () => {
    callAxios.fetchProtectedData(setAllEvents, GET_EVENTS_URL);
  };

  const close = () => {
    props.setShowArmySaveDialog(false);
  };

  const closeConfirmationDialog = () => {
    setShowConfirmationDialog(false);
  };

  /**
   * Function checks flag do decide whether the list is stored for the first time.
   * If this is not the case, a dialog is displayed to confirm the override.
   * @param {event} event
   * @returns nothing
   */
  const storeOrUpdate = (event) => {
    event.preventDefault();
    processFormData(event);

    if (AC.isFetchedArmyList && !MC.blockDialog.confirmationDialog) {
      setShowConfirmationDialog(true);
      return;
    }

    storeList();
  };

  const setDialogState = () => {
    MC.setblockDialog({
      ...MC.blockDialog,
      confirmationDialog: !MC.blockDialog.confirmationDialog,
    });
  };

  const processFormData = (event) => {
    // player can change the default values sown in the dialog
    const formData = new FormData(event.currentTarget);

    const playerName = formData.get("playerName");
    const teamName = formData.get("teamName");
    const listName = formData.get("armyListName");

    AC.setPlayerName(playerName);
    AC.setTeamName(teamName);
    AC.setArmyName(listName);
  };

  const storeList = async () => {
    callAxios.storeData(
      JSON.stringify({
        id: props.isExistingList ? AC.armyID : null, // update existing list?
        userName: AC.playerName,
        teamName: AC.teamName,
        listName: AC.armyName,
        faction: AC.selectedFactionName,
        list: SEC.selectedUnits,
        eventName: AC.eventName,
        userWithAccess: AC.selectedAccessUser,
        creationDate: AC.creationDate,
      }),
      STORE_ARMY_LIST_URL,
      null,
      ARMY_LIST.LIST_CREATED
    );

    cleanup();
  };

  const cleanup = () => {
    setShowConfirmationDialog(false);
  };

  // Username can be different from player name
  const createNameOptions = () => {
    let names = [];
    names.push(UC.user.userName);

    if (AC.playerName !== "") {
      names.push(AC.playerName);
    }

    return names;
  };

  const isForEventHandler = () => {
    setIsForEvent((prevState) => !prevState);
  };

  const handleEventSelection = (name) => {
    AC.setSelectedEventName(name);
  };

  const setEventList = () => {
    return allEvents
      .filter((a) => a.eventName !== NO_EVENT && eventNotInThePast(a.eventDate)) //
      .map((e) => e.eventName);
  };

  const eventNotInThePast = (eventDateString) => {
    const currentDate = new Date();
    const eventDate = new Date(eventDateString);

    return eventDate >= currentDate;
  };

  const clearEventSelection = () => {
    return allEvents;
  };

  const isVisibleHandler = () => {
    setIsvisibleForOtherUsers((prevState) => !prevState);
  };

  const handleUserSelection = (users) => {
    let result = [];
    result.push(users);
    AC.setSelectedAccessUser(result);
  };

  const clearUserSelection = () => {
    return allUsers;
  };

  const selectableUsers = () => {
    let result = allUsers.filter((u) => u !== UC.user.userName);

    return result;
  };

  return (
    <Dialog
      component={"form"}
      onSubmit={(event) => {
        storeOrUpdate(event);
        close();
      }}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            minWidth: "50em",
            minHeight: "45em",
            padding: "1em",
          },
        },
      }}
      open={props.showArmySaveDialog}
    >
      <Grid
        container //
        direction={"row"}
        justifyContent={"space-between"}
      >
        <DialogTitle>
          {AC.isExistingList //
            ? ARMY_LIST.UPDATE_ARMY_LIST
            : ARMY_LIST.STORE_ARMY_LIST}
        </DialogTitle>
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={() => {
            close();
          }}
        >
          <CancelIcon />
        </IconButton>
      </Grid>
      <DialogContent>
        <Grid //
          container
          direction={"column"}
          spacing={4}
        >
          <TextField
            autoFocus //
            sx={{ marginTop: "2em" }}
            required
            select
            id="playerName" //
            name="playerName"
            variant="outlined"
            label={INPUT_TEXTS.PLAYER_NAME}
            defaultValue={UC.user.userName}
          >
            {createNameOptions().map((n, i) => (
              <MenuItem
                key={i}
                value={n} //
              >
                {n}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required //
            id="teamName"
            name="teamName"
            variant="outlined"
            label={ARMY_LIST.SELECT_TEAM_NAME}
            defaultValue={AC.teamName}
          />
          <TextField
            required //
            id="armyListName"
            name="armyListName"
            variant="outlined"
            label={INPUT_TEXTS.ARMY_NAME}
            defaultValue={AC.armyName}
          />
          <Grid
            container //
            size={12}
            item
            flexDirection="row"
            alignItems="center"
          >
            <Grid size={10}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isForEvent} //
                    onChange={isForEventHandler}
                  />
                }
                label={ARMY_LIST.LIST_IS_EVENT_LIST}
              />
            </Grid>
            <Grid size={2}>
              <ContextHelpButton
                isVisible={true}
                message={ARMY_LIST.LIST_IS_EVENT_LIST_INFO} //
                type={PUSH_MESSAGE_TYPES.INFO}
              />
            </Grid>
          </Grid>
          <SelectionInput
            allowsMultiple={false}
            isArmySelector={false}
            filterFunction={handleEventSelection}
            disabled={!isForEvent}
            clearFunction={clearEventSelection}
            alternatives={setEventList()}
            label={ARMY_LIST.SELECT_EVENT}
          />
          <Grid
            container //
            item
            size={12}
            flexDirection="row"
            alignItems="center"
          >
            <Grid size={10}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isvisibleForOtherUsers} //
                    onChange={isVisibleHandler}
                  />
                }
                label={ARMY_LIST.LIST_IS_VISIBLE}
              />
            </Grid>

            <Grid size={2}>
              <ContextHelpButton message={ARMY_LIST.LIST_IS_VISIBLE_INFO} type={PUSH_MESSAGE_TYPES.INFO} />
            </Grid>
          </Grid>

          <SelectionInput
            allowsMultiple={true}
            isArmySelector={false}
            filterFunction={handleUserSelection}
            disabled={!isvisibleForOtherUsers}
            clearFunction={clearUserSelection}
            alternatives={selectableUsers()}
            label={ARMY_LIST.SELECT_USERS}
          />
        </Grid>
        <Button
          variant="outlined" //
          type="submit"
        >
          {ARMY_LIST.SEND_LIST}
        </Button>
      </DialogContent>
      <Grid //
        container
        alignItems="center"
        justifyContent="space-between"
      ></Grid>
      <ConfirmationDialog
        type={CONFIRMATION_DIALOG.OVERRIDE}
        showConfirmationDialog={showConfirmationDialog} //
        confirmAndExecute={storeList}
        closeDialog={closeConfirmationDialog}
        dialogBoxState={MC.blockDialog.confirmationDialog}
        setDialogBoxState={setDialogState}
      />
    </Dialog>
  );
};

export default StoreArmyListDialog;
