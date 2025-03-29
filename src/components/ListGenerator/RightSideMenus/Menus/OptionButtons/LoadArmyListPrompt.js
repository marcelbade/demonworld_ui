// axios
import axios from "axios";
//  react
import React, { useContext, useState, useEffect } from "react";
// material ui
import { Dialog, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, Avatar, Tooltip } from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
// contexts
import { UserContext } from "../../../../../contexts/userContext";
import { ArmyContext } from "../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../contexts/selectionContext";
// hooks
import usePushMessages from "../../../../../customHooks/UsePushMessages";
// constants
import { DELETE_ARMY_LIST_URL, RETREIVE_ARMY_LIST_URL } from "../../../../../constants/URLs";
import { ARMY_LIST, COMPENDIUM } from "../../../../../constants/textsAndMessages";
import { FACTION_COLORS } from "../../../../../constants/factions";
import useUnitEnricher from "../../../../../customHooks/UseUnitEnricher";

const LoadArmyListPrompt = (props) => {
  const UC = useContext(UserContext);
  const AC = useContext(ArmyContext);
  const SC = useContext(SelectionContext);

  const [allLists, setAllLists] = useState([]);

  const enrichUnit = useUnitEnricher();

  const factionColors = FACTION_COLORS();

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

  /**
   * Function calculates the the nest army point cost of the list.
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
    return eventName !== "NO_EVENT" ? eventName : ARMY_LIST.NO_EVENT;
  };

  /**
   * Function loads the list entry into the army tool and closes the
   * prompt. In addtion, the necessary flags are added to the unit
   * and the equipment array.
   * @param {StoredListObj} listObj
   */
  const loadListintoTool = (listObj) => {
    AC.setSelectedFactionName(listObj.faction);
    AC.setPlayerName(listObj.userName);
    // AC.setTeamName(listObj.teamName);

    let result = [];

    listObj.list.forEach((u) => {
      const appendedEquipment = addItemLostFlag(u.equipment);
      u.equipment = appendedEquipment;

      result.push(enrichUnit(u));
    });

    console.log("result >>>", result);

    SC.setSelectedUnits(result);
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

  return (
    <Dialog
      component={"form"}
      onSubmit={(event) => {}}
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
      <IconButton
        sx={{ marginRight: "1em" }} //
        onClick={() => {
          handleClose();
        }}
      >
        <CancelIcon />
      </IconButton>

      {/* try avatar list :D */}

      <List
        sx={{
          width: "100%", //
          minWidth: "100%",
          bgcolor: "background.paper",
        }}
      >
        {allLists.map((l, i) => (
          <ListItem
            key={i} //
            alignItems="flex-start"
            sx={{
              border: "solid 1px black", //
              borderRadius: "8px",
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
                <DownloadIcon />
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
