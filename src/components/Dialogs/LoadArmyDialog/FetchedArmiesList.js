// react
import React, { useContext } from "react";
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
// context
import { ColorContext } from "../../../contexts/colorContext";
// constants
import { NO_EVENT } from "../../../constants/eventConstants";
import { ARMY_LIST, COMPENDIUM } from "../../../constants/textsAndMessages";
// hooks
import usePointCostCalculator from "../../../customHooks/UsePointCostCalculator";

const FetchedArmiesList = (props) => {
  const COC = useContext(ColorContext);

  const getFactionColor = (factioName) => {
    const factionColor = COC.factionColors.filter((color) => color.faction === factioName)[0];
    
    return `rgb(${factionColor.rgbA},${factionColor.rgbB},${factionColor.rgbC})`;
  };

  const calculator = usePointCostCalculator();

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
        width: "90%", //
        minWidth: "90%",
        bgcolor: "background.paper",
        overflowY: "scroll",
        maxHeight: "50em",
        minHeight: "50em",
        marginBottom: "2em",
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
                  backgroundColor: getFactionColor(l.faction), //
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
                    {`${l.faction} - ${calculator.calculateTotalArmyCost(l.list)} ${COMPENDIUM.POINTS} - ${setEvent(l.eventName)} `}
                  </Typography>
                </React.Fragment>
              }
            />
            <Tooltip title={ARMY_LIST.LOAD_LIST}>
              <IconButton
                sx={{ marginRight: "3em" }} //
                onClick={() => {
                  props.loadListintoTool(l);
                }}
              >
                <FileUploadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={ARMY_LIST.DELETE_LIST}>
              <IconButton
                onClick={() => {
                  props.deleteArmyFromDB(l);
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

export default FetchedArmiesList;
