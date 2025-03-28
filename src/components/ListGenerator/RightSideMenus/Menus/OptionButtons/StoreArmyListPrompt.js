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
  Checkbox,
  MenuItem,
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
            {createNameOptions().map((n) => (
              <MenuItem
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
            id="armyListname"
            name="armyListname"
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
            <Grid item size={10}>
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
            <Grid item size={2}>
              <ContextHelpButton
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
            <Grid item size={10}>
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

            <Grid item size={2}>
              <ContextHelpButton message={ARMY_LIST.LIST_IS_VISIBLE_INFO} type={PUSH_MESSAGE_TYPES.INFO} />
            </Grid>
          </Grid>

          <SelectionInput
            allowsMultiple={true}
            isArmySelector={false}
            filterFunction={handleUserSelection}
            disabled={!isvisibleForOtherUsers}
            clearFunction={clearUserSelection}
            alternatives={allUsers}
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

export default StoreArmyListPrompt;
