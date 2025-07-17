// axios
import axios from "axios";
//  react
import React, { useContext, useState, useEffect } from "react";
// material ui
import {
  Dialog,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Tooltip,
  Grid2 as Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// contexts
import { UserContext } from "../../../../../contexts/userContext";
import { ArmyContext } from "../../../../../contexts/armyContext";
// hooks
import usePushMessages from "../../../../../customHooks/UsePushMessages";
// constants
import { DELETE_ARMY_LIST_URL, RETREIVE_ARMY_LIST_URL } from "../../../../../constants/URLs";
import { ARMY_LIST, COMPENDIUM, LOAD_ARMY_LIST_PROMPT } from "../../../../../constants/textsAndMessages";
import { ALL_FACTIONS_ARRAY, FACTION_COLORS } from "../../../../../constants/factions";
import useUnitEnricher from "../../../../../customHooks/UseUnitEnricher";
import { NO_EVENT } from "../../../../../constants/eventConstants";

const LoadArmyListPrompt = (props) => {
  const UC = useContext(UserContext);
  const AC = useContext(ArmyContext);

  const theme = useTheme();

  const [allLists, setAllLists] = useState([]);
  const [filteredFaction, setFilteredFaction] = useState("");
  const [filteredEvent, setFilteredEvent] = useState("");

  const enrichUnit = useUnitEnricher();

  const createFactionSelectOptions = () => {
    const result = [];
    result.push(LOAD_ARMY_LIST_PROMPT.SHOW_ALL_FACTIONS);
    ALL_FACTIONS_ARRAY.sort((a, b) => a > b).forEach((f) => result.push(f));

    return result;
  };

  const createEventSelectOptions = () => {
    const events = allLists
      .map((l) => l.eventName) //
      .filter((l) => l !== NO_EVENT);

    const onlyDistinctEvents = events.reduce(
      (distinct, e) =>
        distinct.indexOf(e) !== -1 //
          ? distinct
          : [...distinct, e],
      []
    );

    return [LOAD_ARMY_LIST_PROMPT.NOT_PART_OF_EVENT, ...onlyDistinctEvents];
  };

  // color the list avatar
  const factionColors = FACTION_COLORS();

  //TODO: pushmesssage: loading successful
  const pushMessages = usePushMessages();

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
    axios
      .get(
        RETREIVE_ARMY_LIST_URL(UC.user.userName), //
        { headers: { Authorization: `Bearer ${UC.user.token}` } }
      )
      .then((response) => {
        setAllLists(response.data);
      })
      .catch((error) => console.log("error>>> ", error));
  };

  /**
   * Function closes the prompt
   */
  const handleClose = () => {
    props.setShowArmyLoadPrompt(false);
  };

  // TODO you have a file with functions that do this shit! - is this nevessary?
  /**
   * Function calculates the net army point cost of the list.
   * @param {[unitCard]} list
   * @returns the net army point cost for the army
   */
  const armySize = (list) => {
    let netPoints = 0;

    list.forEach((l) => {
      netPoints += l.points;
    });

    return netPoints;
  };

  /**
   * Function sets the event name for the list entry. If the stored
   * list is not linked to an event, a message is displayed.
   * @param {String} eventName
   * @returns the event name or a message, of none was stored.
   */
  const setEvent = (eventName) => {
    return eventName !== NO_EVENT ? eventName : ARMY_LIST.NO_EVENT;
  };

  /**
   * Function loads the list entry into the army tool and closes the
   * prompt. In addtion, the necessary flags are added to the unit
   * and the equipment array.
   * @param {StoredListObj} listObj
   */
  // TODO ok, not working yet.
  const loadListintoTool = (listObj) => {
    AC.setSelectedFactionName(listObj.faction);
    AC.setPlayerName(listObj.userName);
    // TODO;
    // AC.setTeamName(listObj.teamName);

    let result = [];

    listObj.list.forEach((u) => {
      const appendedEquipment = addItemLostFlag(u.equipment);
      u.equipment = appendedEquipment;

      result.push(enrichUnit(u));
    });

    props.listSetter(result);
    props.setShowArmyLoadPrompt((prevState) => !prevState);
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
  const deleteArmyListButton = async (listObj) => {
    axios
      .delete(
        DELETE_ARMY_LIST_URL(listObj.userName, listObj.listName), //
        { headers: { Authorization: `Bearer ${UC.user.token}` } }
      )
      .then((response) => {
        console.log("response list deleted>>", response);
      })
      .catch((error) => console.log("error>>> ", error));
  };

  const handleFilteredFactionInput = (event) => {
    if (event.target.value === LOAD_ARMY_LIST_PROMPT.SHOW_ALL_FACTIONS) {
      setFilteredFaction("");
      return;
    }

    setFilteredFaction(event.target.value);
  };

  const filterListObjByFaction = (listObj) => {
    if (filteredFaction === "") {
      return true;
    }

    return listObj.faction === filteredFaction;
  };

  const filterListByEvent = (listObj) => {
    return listObj.eventName === filteredEvent;
  };

  const accentuateFactionsWithLists = (faction, allListObjects) => {
    const presentFactions = allListObjects.map((l) => l.faction);

    return presentFactions.includes(faction) //
      ? null
      : { color: theme.palette.disabled };
  };

  const handleFilteredEventInput = (event) => {
    setFilteredEvent(event.target.value);
  };

  return (
    <Dialog
      component={"form"}
      onSubmit={() => {}} // TODO needed?
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
        spacing={3}
        direction="row"
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <FormControl variant="standard" sx={{ minWidth: "15em", marginRight: "2em" }}>
          <InputLabel>{LOAD_ARMY_LIST_PROMPT.FILTER_FOR_FACTION}</InputLabel>
          <Select
            value={filteredFaction} //
            onChange={handleFilteredFactionInput}
            label="Faction"
          >
            {createFactionSelectOptions().map((f, i) => (
              <MenuItem
                key={i} //
                value={f}
                sx={accentuateFactionsWithLists(f, allLists)}
              >
                {f}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: "15em" }}>
          <InputLabel>{LOAD_ARMY_LIST_PROMPT.FILTER_FOR_EVENT}</InputLabel>
          <Select
            value={filteredEvent} //
            onChange={handleFilteredEventInput}
            label="Event"
          >
            {createEventSelectOptions().map((e, i) => (
              <MenuItem
                key={i} //
                value={e}
              >
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <List
        sx={{
          width: "100%", //
          minWidth: "100%",
          bgcolor: "background.paper",
        }}
      >
        {allLists
          .filter((l) => filterListObjByFaction(l) && filterListByEvent(l))
          .map((l, i) => (
            <ListItem
              key={i} //
              alignItems="flex-start"
              sx={{
                border: "solid 1px black", //
                borderRadius: "8px",
                marginTop: "0.5em ",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: factionColors.get(l.faction), //
                  }}
                >
                  {l.faction.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={l.listName}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span" //
                      variant="body2"
                      sx={{ color: "text.primary", display: "inline" }}
                    >
                      {`${l.faction} - ${armySize(l.list)} ${COMPENDIUM.POINTS} - ${setEvent(l.eventName)} `}
                    </Typography>
                  </React.Fragment>
                }
              />
              <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{ARMY_LIST.LOAD_LIST}</Typography>}>
                <IconButton
                  sx={{ marginRight: "3em" }} //
                  onClick={() => {
                    loadListintoTool(l);
                  }}
                >
                  <FileUploadIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{ARMY_LIST.DELETE_LIST}</Typography>}>
                <IconButton
                  onClick={() => {
                    deleteArmyListButton(l);
                  }} //
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
};

export default LoadArmyListPrompt;
