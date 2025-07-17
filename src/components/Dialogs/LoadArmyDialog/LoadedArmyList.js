// react
import React, { useEffect } from "react";
// material ui
import {
  IconButton, //
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
// icons
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
// constants
import { NO_EVENT } from "../../../constants/eventConstants";
import { ARMY_LIST, COMPENDIUM } from "../../../constants/textsAndMessages";
import { FACTION_COLORS } from "../../../constants/factions";

const LoadedArmyList = (props) => {
  // color the list avatar
  const factionColors = FACTION_COLORS();

  // useEffect( ()=>{},[
  //   props.filteredFaction, props.filteredEvent
  // ] )

  const filterListObjByFaction = (listObj) => {
    if (props.filteredFaction === "") {
      return true;
    }

    return listObj.faction === props.filteredFaction;
  };

  const filterListObjByEvent = (listObj) => {
    if (props.filteredEvent === "") {
      return true;
    }

    return listObj.eventName === props.filteredEvent;
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

  return (
    <List
      sx={{
        width: "100%", //
        minWidth: "100%",
        bgcolor: "background.paper",
      }}
    >
      {props.allLists
        .filter((l) => filterListObjByFaction(l) && filterListObjByEvent(l))
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
                  props.loadListintoTool(l);
                }}
              >
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={<Typography sx={{ fontSize: "20px" }}>{ARMY_LIST.DELETE_LIST}</Typography>}>
              <IconButton
                onClick={() => {
                  props.deleteArmyListButton(l);
                }} //
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
    </List>
  );
};

export default LoadedArmyList;
