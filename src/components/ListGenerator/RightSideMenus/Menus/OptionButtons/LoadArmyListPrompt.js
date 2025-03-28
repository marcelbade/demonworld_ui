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
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
// icons
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
// contexts
import { UserContext } from "../../../../../contexts/userContext";
// hooks
import usePushMessages from "../../../../../customHooks/UsePushMessages";
// constants
import { RETREIVE_ARMY_LIST_URL } from "../../../../../constants/URLs";
import { ARMY_LIST, COMPENDIUM } from "../../../../../constants/textsAndMessages";
import { FACTION_COLORS } from "../../../../../constants/factions";

const LoadArmyListPrompt = (props) => {
  const UC = useContext(UserContext);

  const [allLists, setAllLists] = useState([]);
  const factionColors = FACTION_COLORS();

  const pushMessages = usePushMessages();

  useEffect(() => {
    fetchLists();
  }, []);

  //TODO  GET all stored army lists of the user and all army lists with access
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

  const handleClose = () => {
    props.setShowArmyLoadPrompt(false);
  };

  console.log("all lists", allLists);

  const armySize = (list) => {
    let netPoints = 0;

    list.forEach((l) => {
      netPoints += l.points;
    });

    return netPoints;
  };

  const setEvent = (eventName) => {
    return eventName !== "NO_EVENT" ? eventName : ARMY_LIST.NO_EVENT;
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
                  <Typography component="span" variant="body2" sx={{ color: "text.primary", display: "inline" }}>
                    {`${l.faction} - ${armySize(l.list)} ${COMPENDIUM.POINTS} - ${setEvent(l.eventName)} `}
                  </Typography>
                </React.Fragment>
              }
            />
            <IconButton sx={{ marginRight: "3em" }}>
              <DownloadIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default LoadArmyListPrompt;
