// axios
import axios from "axios";
//  react
import React, { useContext, useState, useEffect } from "react";
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
  useTheme,
  Checkbox,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
// contexts
import { UserContext } from "../../../../../contexts/userContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
import { ArmyContext } from "../../../../../contexts/armyContext";
import { ServerErrorContext } from "../../../../../contexts/serverErrorContext";
// hooks
import usePushMessages from "../../../../../customHooks/UsePushMessages";
// constants
import { ALL_USER_NAMES_URL, GET_EVENTS_URL, STORE_ARMY_LIST_URL } from "../../../../../constants/URLs";
import { ARMY_LIST, INPUT_TEXTS, PUSH_MESSAGE_TYPES } from "../../../../../constants/textsAndMessages";
import ContextHelpButton from "../../../../shared/ContextHelpButton";
import SelectionInput from "../../../../shared/selectionInput";

const StoreArmyListPrompt = (props) => {
  const UC = useContext(UserContext);
  const SEC = useContext(SelectionContext);
  const AC = useContext(ArmyContext);
  const SC = useContext(ServerErrorContext);

  const [allEvents, setAllEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isForEvent, setIsForEvent] = useState(false);
  const [isvisibleForOtherUsers, setIsvisibleForOtherUsers] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);

  const theme = useTheme();
  const pushMessages = usePushMessages();

  useEffect(() => {
    fetchEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //TODO  GET
  const fetchEvents = async () => {
    axios
      .get(GET_EVENTS_URL, { headers: { Authorization: `Bearer ${UC.user.token}` } })
      .then((response) => {
        setAllEvents(response.data);
      })
      .catch((error) => console.log("error>>> ", error));
  };

  const fetchAllUsers = async () => {
    axios
      .get(ALL_USER_NAMES_URL, { headers: { Authorization: `Bearer ${UC.user.token}` } })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => console.log("error>>> ", error));
  };

  const handleClose = () => {
    props.setShowArmySavePrompt(false);
  };

  //TODO Change URL in Production!
  const storeList = async (event) => {
    event.preventDefault();

    await axios
      .post(
        STORE_ARMY_LIST_URL,
        JSON.stringify({
          userName: UC.user.userName,
          listName: AC.armyName,
          faction: AC.selectedFactionName,
          list: SEC.selectedUnits,
          eventName: selectedEventName,
          userWithAccess: selectedUser,
        }),
        { headers: { Authorization: `Bearer ${UC.user.token}` } }
      )
      .then((response) => {
        console.log(response);

        // return to the landing page and display push message
        if (response.data.userName === UC.user.userName) {
          pushMessages.showSnackBar(ARMY_LIST.LIST_STORED, PUSH_MESSAGE_TYPES.SUCCESS);
        }
      })
      .catch((error) => {
        if (!error?.response) {
          SC.setServerErrorMessage("no server response");
        }
      });
  };

  const isForEventHandler = () => {
    setIsForEvent((prevState) => !prevState);
  };

  const handleEventSelection = (name) => {
    setSelectedEventName(name);
  };

  const setEventList = () => {
    return allEvents.map((e) => e.eventName);
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
            padding: "5em",
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
            id="playerName" //
            name="playerName"
            variant="outlined"
            label={INPUT_TEXTS.PLAYER_NAME}
            value={UC.user.userName}
          />
          <TextField
            required //
            id="armyListname"
            name="armyListname"
            variant="outlined"
            label={INPUT_TEXTS.ARMY_NAME}
            value={AC.armyName}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isForEvent} //
                onChange={isForEventHandler}
              />
            }
            label={ARMY_LIST.LIST_IS_EVENT_LIST}
          />

          <SelectionInput
            allowsMultiple={false}
            isArmySelector={false}
            filterFunction={handleEventSelection}
            disabled={!isForEvent}
            clearFunction={clearEventSelection}
            alternatives={setEventList()}
            label={ARMY_LIST.SELECT_EVENT}
          />
          <ContextHelpButton
            message={ARMY_LIST.LIST_IS_EVENT_LIST_INFO} //
            type={PUSH_MESSAGE_TYPES.INFO}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isvisibleForOtherUsers} //
                onChange={isVisibleHandler}
              />
            }
            label={ARMY_LIST.LIST_IS_VISIBLE}
          />
          <SelectionInput
            allowsMultiple={true}
            isArmySelector={false}
            filterFunction={handleUserSelection}
            disabled={!isvisibleForOtherUsers}
            clearFunction={clearUserSelection}
            alternatives={allUsers}
            label={ARMY_LIST.SELECT_USERS}
          />

          <ContextHelpButton message={ARMY_LIST.LIST_IS_VISIBLE_INFO} type={PUSH_MESSAGE_TYPES.INFO} />
        </Grid>
        <Button
          variant="outlined" //
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

export default StoreArmyListPrompt;
