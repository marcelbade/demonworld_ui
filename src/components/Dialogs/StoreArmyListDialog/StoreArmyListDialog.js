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
// contexts
import { UserContext } from "../../../contexts/userContext";
import { SelectionContext } from "../../../contexts/selectionContext";
import { ArmyContext } from "../../../contexts/armyContext";
// hooks
import useAxios from "../../../customHooks/UseAxios";
// constants
import { ALL_USER_NAMES_URL, GET_EVENTS_URL, STORE_ARMY_LIST_URL } from "../../../constants/URLs";
import { ARMY_LIST, INPUT_TEXTS, PUSH_MESSAGE_TYPES } from "../../../constants/textsAndMessages";
import ContextHelpButton from "../../shared/ContextHelpButton";
import SelectionInput from "../../shared/selectionInput";

const StoreArmyListDialog = (props) => {
  const UC = useContext(UserContext);
  const SEC = useContext(SelectionContext);
  const AC = useContext(ArmyContext);

  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isForEvent, setIsForEvent] = useState(false);
  const [isvisibleForOtherUsers, setIsvisibleForOtherUsers] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);

  const callAxios = useAxios();

  useEffect(() => {
    fetchAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (UC.user.userName !== "") {
      fetchEvents();
    }
  }, [UC.user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchEvents = async () => {
    callAxios.fetchProtectedData(setAllEvents, GET_EVENTS_URL);
  };

  const fetchAllUsers = async () => {
    callAxios.fetchProtectedData(setAllUsers, ALL_USER_NAMES_URL);
  };

  const handleClose = () => {
    props.setShowArmySavePrompt(false);
  };

  /**
   * Async function posts a new army list to the backend to add it to the DB. The
   * data is taken from the army list generator or the prompt dependending on wether
   * the user entered data
   * @param {eventObj} event
   */
  const storeList = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const teamName =
      AC.teamName !== "" //
        ? AC.teamName
        : formData.get("teamName");

    const listName =
      formData.get("armyListName") !== "" //
        ? formData.get("armyListName")
        : AC.armyName;

    const eventName =
      selectedEventName !== "" //
        ? selectedEventName
        : "NO_EVENT";

    callAxios.storeData(
      JSON.stringify({
        userName: UC.user.userName,
        teamName: teamName,
        listName: listName,
        faction: AC.selectedFactionName,
        list: SEC.selectedUnits,
        eventName: eventName,
        userWithAccess: selectedUser,
        creationDate: new Date(),
      }),
      STORE_ARMY_LIST_URL,
      null
    );
  };

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
    setSelectedEventName(name);
  };

  const setEventList = () => {
    const NO_EVENT = "NO_EVENT";

    return allEvents //
      .filter((a) => a.eventName !== NO_EVENT && eventNotInThePast(a.eventDate))
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
    setSelectedUser(result);
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
        storeList(event);
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
      open={props.showArmySavePrompt}
    >
      <Grid
        container //
        direction={"row"}
        justifyContent={"space-between"}
      >
        <DialogTitle>{ARMY_LIST.STORE_ARMY_LIST}</DialogTitle>
        <IconButton
          sx={{ marginRight: "1em" }} //
          onClick={() => {
            handleClose();
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
    </Dialog>
  );
};

export default StoreArmyListDialog;
